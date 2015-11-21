import { readFile } from 'fs';
import { join } from 'path';
import { defaults } from 'lodash';
import promisify from 'es6-promisify';
import nodemailer from 'nodemailer';
import sendGridTransport from 'nodemailer-sendgrid-transport';
import Handlebars from 'handlebars';
import config from '../config';
import Internationalization from './Internationalization';

let readFileAsync = promisify(readFile);


if (!config.mail.key) {
  throw new Error('MAIL_SERVICE_KEY is not set!');
}

if (!config.mail.from_address) {
  throw new Error('MAIL_FROM_ADDRESS is not set!');
}

const options = {
    auth: {
        api_key: config.mail.key
    }
};

const fallbackTransporter = nodemailer.createTransport(sendGridTransport(options), {
    // default values for sendMail method
    from: config.mail.from_address
});

/**
 * This class is handling all email transports
 */
class MailService {

  constructor() {
    this.transporter = fallbackTransporter;
    this.isEnabled = config.mail.is_enabled;
  }

  /**
   * function to send an email. Its workflow is the following
   * 1. check if sending emails is enabled
   * 2. check given options obejct
   * 3. set default options
   * 4. load template file
   * 5. compile template file with the given data
   * 6. send email
   *
   * @param options - an object that looks like
   * {
   *   template: 'base.html',
   *   data: {  },
   *   to: 'test@mail.com',
   *   subject: 'Test Email'
   * }
   */
  send(_options) {
    if (!this.isEnabled) {
      return Promise.resolve('Sending emails is disabled');
    }
    if (!_options.to || !_options.subject) {
      throw new Error('Invalid Parameters for sending Emails [missing options.to or options.subject]');
    }
    let options = defaults(_options, {
      template: 'base.html',
      data: { }
    });
    let templateFile = join(config.mail.template_path, options.template);
    return readFileAsync(templateFile, 'utf8')
      .then((content) => {
        let template = Handlebars.compile(content);
        return template(options.data);
      })
      .then((htmlContent) => {
        return this.transporter.sendMail({
          to: options.to,
          subject: options.subject,
          html: htmlContent
        });
      });
  }

  sendPasswordForgot(userInstance) {
    let intl = new Internationalization(userInstance.language);
    return this.send({
        to: userInstance.email,
        subject: 'Password Forgotten Email',
        data: {
          resetToken: userInstance.resetToken,
          resetTokenValidity: userInstance.resetTokenValidity,
          hiUser: intl.get('email/hi-user', { username: userInstance.username }),
          forgotEmailFooter: intl.get('email/forgot-email-footer'),
          forgotEmailMessage: intl.get('email/forgot-email-message')
        }
    });
  }

}


export default MailService;
