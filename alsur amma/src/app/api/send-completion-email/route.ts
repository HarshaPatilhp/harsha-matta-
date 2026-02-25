import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate review links
    const reviewLinks = {
      excellent: `https://your-temple-website.com/review?rating=5&booking=${bookingData.id}`,
      good: `https://your-temple-website.com/review?rating=4&booking=${bookingData.id}`,
      average: `https://your-temple-website.com/review?rating=3&booking=${bookingData.id}`,
      poor: `https://your-temple-website.com/review?rating=2&booking=${bookingData.id}`,
    };

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: bookingData.email,
      subject: '🙏 Thank You for Visiting Vidyaranyapura Mutt - Share Your Experience',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                ${bookingData.lunchRequired ? `<p><strong>Lunch:</strong> ${bookingData.lunchCount} people</p>` : ''}
              </div>
              
              <div class="blessing">
                "May the divine blessings of the Almighty be with you and your family always."
              </div>
              
              <div class="rating-section">
                <h3>⭐ How Was Your Experience?</h3>
                <p>Your feedback helps us serve better. Please rate your visit:</p>
                
                <div class="stars">
                  <a href="${reviewLinks.excellent}" class="star-link" title="Excellent">⭐⭐⭐⭐⭐</a>
                  <a href="${reviewLinks.good}" class="star-link" title="Good">⭐⭐⭐⭐</a>
                  <a href="${reviewLinks.average}" class="star-link" title="Average">⭐⭐⭐</a>
                  <a href="${reviewLinks.poor}" class="star-link" title="Poor">⭐⭐</a>
                </div>
                
                <p><small>Click on the stars to submit your review</small></p>
              </div>
              
              <p>We look forward to welcoming you back to the mutt for more divine experiences and blessings.</p>
              
              <div class="footer">
                <p><strong>With Divine Blessings,</strong></p>
                <p>Shri Vidyaranyapura Mutt</p>
                <p>📞 +91-XXXXXXXXXX | 📧 info@vidyaranyapuramutt.com</p>
                <p>📍 Vidyaranyapura, Bangalore</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Completion email sent successfully' });
  } catch (error) {
    console.error('Error sending completion email:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
