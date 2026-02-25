const nodemailer = require("nodemailer");
const QRCode = require("qrcode");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { booking } = JSON.parse(event.body);

    // 🔹 Generate QR Code using Booking ID
    const qrCodeDataURL = await QRCode.toDataURL(booking.id.toString(), {
      width: 200,
      margin: 1,
    });

    // 🔹 Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔹 Email HTML content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

          <h1 style="color: #d97706; text-align: center;">Sri Raghavendra Swamy Temple</h1>
          <h2 style="text-align: center; color: #333;">Seva Booking Confirmation</h2>

          <p>Dear <strong>${booking.devoteeName}</strong>,</p>
          <p>Your seva booking has been <strong style="color: green;">successfully confirmed</strong>.</p>

          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">📋 Booking Details</h3>

            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Devotee Name:</strong> ${booking.devoteeName}</p>
            <p><strong>Email:</strong> ${booking.email}</p>
            <p><strong>Phone:</strong> ${booking.phone}</p>
            <p><strong>Seva:</strong> ${booking.sevaName}</p>
            <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${booking.time}</p>
            <p><strong>Number of People:</strong> ${booking.numberOfPeople}</p>
            <p><strong>Gotra:</strong> ${booking.gotra || "Not specified"}</p>
            <p><strong>Nakshatra:</strong> ${booking.nakshatra || "Not specified"}</p>
            <p><strong>Hall:</strong> ${booking.hall || "—"}</p>
            <p><strong>Tirtha Prasada Required:</strong> ${booking.tirthaPrasadaRequired ? "Yes" : "No"}</p>
            <p><strong>Tirtha Prasada Count:</strong> ${booking.tirthaPrasadaCount || "—"}</p>
            <p><strong>Lunch Required:</strong> ${booking.lunchRequired ? "Yes" : "No"}</p>
            <p><strong>Lunch Count:</strong> ${booking.lunchCount || "—"}</p>
            <p><strong>Lunch Hall:</strong> ${booking.lunchHall || "—"}</p>
            <p><strong>Seva Cost:</strong> ₹${booking.sevaCost || "0"}</p>
            <p><strong>Tirtha Prasada Cost:</strong> ₹${booking.lunchCost || "0"}</p>
            <p><strong>Total Cost:</strong> <strong>₹${booking.totalCost || "0"}</strong></p>
            <p><strong>Special Requests:</strong> ${booking.specialRequests || "None"}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <h3>Your QR Code for Check-in</h3>
            <img src="${qrCodeDataURL}" alt="QR Code" style="max-width: 200px; border: 2px solid #d97706; border-radius: 8px;" />
            <p><strong>Booking / QR ID:</strong> ${booking.id}</p>
            <p style="font-size: 13px; color: #555;">Please show this QR code or Booking ID at the temple entrance.</p>
          </div>

          <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px;">
            <h3 style="color: #065f46; margin-top: 0;">🛕 Important Instructions</h3>
            <ul style="color: #065f46;">
              <li>Please arrive 15 minutes before your scheduled time</li>
              <li>Carry a valid ID proof</li>
              <li>Show this email or QR code at the counter</li>
              <li>Maintain silence and decorum inside the temple</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
            <p style="font-size: 13px; color: #666;">
              Sri Raghavendra Swamy Temple<br/>
              Vidyaranyapura, Bangalore
            </p>
          </div>

        </div>
      </div>
    `;

    // 🔹 Mail options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: booking.email,
      subject: `Seva Booking Confirmation - ${booking.sevaName} (ID: ${booking.id})`,
      html: emailContent,
    };

    // 🔹 Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email" }),
    };
  }
};