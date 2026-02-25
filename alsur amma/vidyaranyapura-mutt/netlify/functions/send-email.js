const nodemailer = require('nodemailer');
const QRCode = require('qrcode');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { booking, qrCode } = JSON.parse(event.body);

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(qrCode, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });

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

    // Email content (simplified version)
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Seva Booking Confirmation</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .seva-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35; }
        .qr-code { text-align: center; margin: 20px 0; }
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
            <div class="blessing">May Lord Raghavendra bless you with peace and prosperity</div>

            <h3>Booking Confirmation</h3>

            <div class="seva-info">
                <h4>📋 Booking Details:</h4>
                <ul>
                    <li><strong>Seva:</strong> ${booking.sevaName}</li>
                    <li><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${booking.time}</li>
                    <li><strong>Number of People:</strong> ${booking.numberOfPeople}</li>
                    <li><strong>Gotra:</strong> ${booking.gotra}</li>
                    <li><strong>Nakshatra:</strong> ${booking.nakshatra}</li>
                    <li><strong>Hall Location:</strong> ${booking.hall}</li>
                    <li><strong>Cost:</strong> ${booking.sevaCost}</li>
                    <li><strong>Booking ID:</strong> ${booking.id}</li>
                </ul>
            </div>

            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0;">
                <h4>⏰ Important Instructions:</h4>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Seva Cost:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${booking.sevaCost}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Tirtha Prasada Required:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${booking.lunchRequired ? `Yes (${booking.lunchCount} people)` : 'No'}</td>
                  </tr>
                  ${booking.lunchRequired ? `
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Tirtha Prasada Cost:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${booking.lunchCost} (${booking.lunchCount} × ₹250)</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #ea580c; font-size: 16px;">Total Cost:</td>
                    <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #ea580c; font-size: 16px;">${booking.totalCost}</td>
                  </tr>
                </table>
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 10px; margin-top: 10px; border-radius: 3px;">
                    <strong style="color: #92400e;">💰 Important Information:</strong> Please be at the temple at the mentioned time.
                </div>
                <ul>
                  <li>Arrive at the temple 15 minutes before your scheduled time</li>
                  <li>Bring this email or show the QR code for verification at the time of Tirtha Prasada</li>
                  <li>Please maintain silence and sanctity in the temple premises</li>
                  <li>Please find the QR code attached at the end of this email</li>
                </ul>
            </div>

            <div class="qr-code">
                <h3>📱 Your QR Code</h3>
                <p>Please show this QR code at the temple entrance for verification.</p>
                ${qrCodeDataURL ?
                  `<img src="${qrCodeDataURL}" alt="Booking QR Code" style="max-width: 200px; border: 2px solid #333; border-radius: 5px; display: block; margin: 10px auto;" />` :
                  `<div style="background: #f0f0f0; padding: 20px; text-align: center; border: 2px dashed #ccc; border-radius: 5px;">
                    <p style="color: #666; font-size: 14px;">QR Code: ${qrCode}</p>
                    <p style="color: #999; font-size: 12px;">Please show this code at the temple</p>
                  </div>`
                }
                <p><strong>QR Code:</strong> ${qrCode}</p>
            </div>

            <p>We look forward to your divine service and spiritual journey.</p>

            <p>With blessings,<br>
            <strong>Sri Vidyaranyapura Mutt Management</strong></p>

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
    console.log('Attempting to send email to:', booking.email);
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: booking.email,
      subject: `Seva Booking Confirmation - ${booking.sevaName}`,
      html: emailContent
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId
      }),
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      }),
    };
  }
};
