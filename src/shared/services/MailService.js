import nodemailer from 'nodemailer';
import config from '../config';


/**
 * This class is handling all email transports
 */
class MailService {

  constructor() {
    this.transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.username,
            pass: config.mail.password
        }
    }, {
        // default values for sendMail method
        from: config.mail.from_address
    });
  }

  sendPasswordForgot(userInstance) {
    return this.transporter.sendMail({
        to: userInstance.email,
        subject: 'Password Forgotten Email',
        text: `Your password reset link (${userInstance.resetToken}) which is valid till ${userInstance.resetTokenValidity}`
    });
  }

}

/**
 * This class is handling all email transports (in our test environment)
 */
class MailServiceTest {

  constructor() { }

  sendPasswordForgot(userInstance) {
    return Promise.resolve({
        to: userInstance.email,
        subject: 'Password Forgotten Email',
        text: `Your password reset link (${userInstance.resetToken}) which is valid till ${userInstance.resetTokenValidity}`
    });
  }

}

let Service = (config.environment !== 'test') ? MailService : MailServiceTest;

export default Service;
