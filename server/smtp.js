import { config } from '/imports/helpers'

export default () => {
  process.env.MAIL_URL = config.mail.url
}
