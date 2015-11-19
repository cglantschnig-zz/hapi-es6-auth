import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport'
import config from '../config';


if (!config.mail.key) {
  throw new Exception('MAIL_SERVICE_KEY is not set!');
}

if (!config.mail.from_address) {
  throw new Exception('MAIL_FROM_ADDRESS is not set!');
}

const options = {
    auth: {
        api_key: config.mail.key
    }
};

const transporter = nodemailer.createTransport(sendGridTransport(options), {
    // default values for sendMail method
    from: config.mail.from_address
});

/**
 * This class is handling all email transports
 */
class MailService {

  constructor() {
    this.transporter = transporter;
  }

  /**
   * checks the config if sending an email is enabled,
   * if everything is working we send an email.
   */
  send(options) {
    if (!config.mail.is_enabled) {
      return Promise.resolve('Sending emails is disabled');
    }
    return this.transporter.sendMail(options);
  }

  sendPasswordForgot(userInstance) {
    return this.transporter.sendMail({
        to: userInstance.email,
        subject: 'Password Forgotten Email',
        text: `Your password reset link (${userInstance.resetToken}) which is valid till ${userInstance.resetTokenValidity}`
    });
  }

}


export default MailService;
