import AWS from "aws-sdk";
import CONFIG from "../config";
import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";

AWS.config.update({
  region: "ap-northeast-2",
  accessKeyId: CONFIG.AWS.ACCESS_KEY,
  secretAccessKey: CONFIG.AWS.SECRET_KEY,
});

const SES = new AWS.SES();
const EMAIL_SOURCE = "no-reply@labnote.co";
const transporter = nodemailer.createTransport({
  SES,
});

export const sendEmail = async (
  title: string,
  addresses: Array<string>,
  attachments: Array<any>,
): Promise<void> => {
  try {
    const options: Mail.Options = {
      from: EMAIL_SOURCE,
      subject: title,
      // html,
      to: addresses,
      attachments,
    };

    await transporter.sendMail(options);
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(error);
  }
};
