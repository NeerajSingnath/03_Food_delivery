import nodemailer from 'nodemailer';

const sendMail = async (to, otp) => {
  try {
    // Create the transporter inside the function so it reads env variables dynamically
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'OTP For Verification',
      text: `Your OTP is ${otp}, Expires in 5 min`,
    });

    console.log('Mail sent successfully');
  } catch (error) {
    console.log('Error while sending mail', error);
  }
};

export default sendMail;
