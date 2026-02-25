const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { bookingData } = JSON.parse(event.body);

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter
    await transporter.verify();

    // Email content for completion
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Thank You - Vidyaranyapura Mutt</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .thank-you { font-size: 28px; font-weight: bold; margin-bottom: 20px; color: #ff6b35; }
        .seva-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35; }
        .rating-section { text-align: center; margin: 30px 0; }
        .stars { display: flex; justify-content: center; gap: 15px; margin: 20px 0; }
        .star-link { text-decoration: none; font-size: 30px; transition: transform 0.2s; }
        .star-link:hover { transform: scale(1.2); }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        .blessing { font-style: italic; color: #ff6b35; font-size: 18px; text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🙏 श्री विद्यारण्यपुर मठ 🙏</h1>
            <h2>Vidyaranyapura Mutt</h2>
        </div>

        <div class="content">
            <div class="thank-you">
                Thank You for Your Visit! 🌟
            </div>

            <p>Dear ${bookingData.devoteeName || 'Devotee'},</p>

            <p>We hope you had a blessed experience at our mutt. Your presence made the occasion more special, and we're grateful for your participation in the divine service.</p>

            <div class="seva-info">
                <h3>📿 Your Seva Details</h3>
                <p><strong>Seva:</strong> ${bookingData.sevaName}</p>
                <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
                <p><strong>Checked In:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>

            <div class="rating-section">
                <h3>🌟 How was your experience?</h3>
                <p>Please rate your visit and leave us feedback:</p>
                <div class="stars">
                    <a href="#" class="star-link">⭐</a>
                    <a href="#" class="star-link">⭐</a>
                    <a href="#" class="star-link">⭐</a>
                    <a href="#" class="star-link">⭐</a>
                    <a href="#" class="star-link">⭐</a>
                </div>
                <p><small>Your feedback helps us serve you better</small></p>
            </div>

            <div class="blessing">
                May Lord Raghavendra continue to shower his blessings upon you and your family.
            </div>

            <div class="footer">
                <p>📞 Contact: +91-XXXXXXXXXX | 📧 info@vidyaranyapuramutt.org</p>
                <p>🏛️ Sri Vidyaranyapura Mutt, Bangalore</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    // Send email
    console.log('Attempting to send completion email to:', bookingData.email);
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: bookingData.email,
      subject: 'Thank You for Your Visit - Vidyaranyapura Mutt',
      html: emailContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Completion email sent successfully:', result.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Completion email sent successfully',
        messageId: result.messageId
      }),
    };

  } catch (error) {
    console.error('Error sending completion email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send completion email',
        details: error.message
      }),
    };
  }
};
