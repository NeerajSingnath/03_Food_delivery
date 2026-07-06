import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, otp) => {
  try {
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
