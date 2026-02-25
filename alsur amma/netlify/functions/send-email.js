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

    // Generate QR code as base64 data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrCode);

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

    // Email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: #d97706; text-align: center; margin-bottom: 30px;">Sri Raghavendra Swamy Temple</h1>
          <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Seva Booking Confirmation</h2>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #92400e; margin-top: 0;">Booking Details:</h3>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Devotee Name:</strong> ${booking.devoteeName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Seva:</strong> ${booking.sevaName}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Number of People:</strong> ${booking.numberOfPeople}</p>
            <p><strong>Gotra:</strong> ${booking.gotra || 'Not specified'}</p>
            <p><strong>Nakshatra:</strong> ${booking.nakshatra || 'Not specified'}</p>
            ${booking.hall ? `<p><strong>Hall:</strong> ${booking.hall}</p>` : ''}
            <p><strong>Tirtha Prasada Required:</strong> ${booking.tirthaPrasadaRequired ? 'Yes' : 'No'}</p>
            ${booking.tirthaPrasadaRequired ? `<p><strong>Tirtha Prasada Count:</strong> ${booking.tirthaPrasadaCount}</p>` : ''}
            ${booking.lunchRequired ? `<p><strong>Lunch Required:</strong> Yes</p>` : ''}
            ${booking.lunchRequired ? `<p><strong>Lunch Count:</strong> ${booking.lunchCount}</p>` : ''}
            ${booking.lunchHall ? `<p><strong>Lunch Hall:</strong> ${booking.lunchHall}</p>` : ''}
            ${booking.sevaCost ? `<p><strong>Seva Cost:</strong> ₹${booking.sevaCost}</p>` : ''}
            ${booking.lunchCost ? `<p><strong>Tirtha Prasada Cost:</strong> ₹${booking.lunchCost}</p>` : ''}
            ${booking.totalCost ? `<p><strong>Total Cost:</strong> ₹${booking.totalCost}</p>` : ''}
            ${booking.specialRequests ? `<p><strong>Special Requests:</strong> ${booking.specialRequests}</p>` : ''}
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Your QR Code for Check-in:</h3>
            <img src="${qrCodeDataURL}" alt="Booking QR Code" style="max-width: 200px; height: auto; border: 2px solid #d97706; border-radius: 8px;" />
            <p style="color: #666; font-size: 14px; margin-top: 10px;">Please show this QR code at the temple entrance for check-in</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #065f46; margin-top: 0;">Important Instructions:</h3>
            <ul style="color: #065f46;">
              <li>Please arrive 15 minutes before your scheduled time</li>
              <li>Bring a valid ID proof for verification</li>
              <li>Show this email and QR code at the temple office</li>
              <li>Follow all temple guidelines and maintain decorum</li>
            </ul>
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
      to: booking.email,
      subject: `Seva Booking Confirmation - ${booking.sevaName} - ID: ${booking.id}`,
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};
