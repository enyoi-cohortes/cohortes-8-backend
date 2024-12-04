import { createTransport, } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: +(process.env.SMTP_PORT),
  secure: true,
  requireTLS: false,
  auth: {
    type: 'LOGIN',
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function sendMail(email) {
  try {
    const isIdle = transporter.isIdle();
    if (isIdle) {
      return null;
    }

    const isVerified = await transporter.verify();
    if (!isVerified) {
      return null;
    }

    const message = {
      ...email,
      from: process.env.SMTP_USERNAME,
      html: email.body,
    }

    await transporter.sendMail(message);
  } catch (err) {
    return null;
  } finally {
    transporter.close();
  }
}

export {
  sendMail,
}