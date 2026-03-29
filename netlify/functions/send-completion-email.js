const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const bookingData = JSON.parse(event.body);

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for completion
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #d97706; text-align: center; margin-bottom: 30px;">Sri Raghavendra Swamy Temple</h1>
          <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Seva Completion Thank You</h2>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin-top: 0;">Seva Completed Successfully!</h3>
            <p>Dear ${bookingData.devoteeName || bookingData.fullName},</p>
            <p>Thank you for participating in the seva at Sri Raghavendra Swamy Temple. Your devotion and service have been noted and appreciated.</p>

            <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
              <h4 style="color: #065f46; margin-top: 0;">Completed Seva Details:</h4>
              <p><strong>Seva:</strong> ${bookingData.sevaName}</p>
              <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
              <p><strong>Booking ID:</strong> ${bookingData.id}</p>
              <p><strong>Number of People:</strong> ${bookingData.numberOfPeople}</p>
            </div>
          </div>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">Your Feedback Matters!</h3>
            <p>Please take a moment to share your experience by rating our services:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://forms.gle/your-feedback-form" style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Rate Your Experience</a>
            </div>
            <p style="font-size: 14px; color: #92400e;">Your feedback helps us improve our services for all devotees.</p>
          </div>

          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0c4a6e; margin-top: 0;">Blessings & Well Wishes</h3>
            <p>May Lord Raghavendra Swamy bless you and your family with peace, prosperity, and spiritual growth.</p>
            <p>We look forward to welcoming you back for more divine service opportunities.</p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 14px;">Sri Raghavendra Swamy Temple<br>Vidyaranyapura, Bangalore</p>
            <p style="color: #666; font-size: 12px; margin-top: 10px;">For any queries, please contact the temple office</p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: bookingData.email,
      subject: `Seva Completion - Thank You - ${bookingData.sevaName}`,
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Completion email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending completion email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send completion email', details: error.message }),
    };
  }
};
