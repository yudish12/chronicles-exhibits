import nodemailer from "nodemailer";
import path from "path";
export class EmailService {
  constructor(page_source, template) {
    console.log(
      process.env.EMAIL_HOST,
      process.env.EMAIL_USERNAME,
      process.env.EMAIL_PASSWORD
    );
    this.to = process.env.EMAIL_TO;
    this.page_source = page_source;
    this.template = template;
    this.from = `Chronicle Exhibits LLC <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    //sendgrid

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(fields, subject) {
    const templateModule = await import(`./templates/${this.template}.js`);
    const templateFunc = templateModule.default; // Access the default export

    // Await the result of templateFunc since it is likely async
    const html = await templateFunc(fields, this.page_source);
    let logoPath = path.join(process.cwd(), "public/chronicle-logo.svg");
    console.log(logoPath);
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      attachments: [
        {
          filename: "logo.svg",
          path: logoPath,
          cid: "logo",
        },
      ],
      html: html, // Ensure this is a resolved string
    };

    return this.newTransport().sendMail(mailOptions);
  }
}
