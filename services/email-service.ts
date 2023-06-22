import nodemailer from 'nodemailer';

export async function sendEmail() {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_MAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Prepare the email message
  const mailOptions = {
    from: 'Brokoly-Shop <' + process.env.EMAIL_MAIL + '>',
    to: 'contact@308er.com',
    subject: 'Test-Mail',
    text: 'Test mail from Next.js LOL!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
