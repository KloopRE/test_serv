import BaseModel from './BaseModel.js'
import Email from './Email.js'


export default class User extends BaseModel {
    constructor(fields) {
        if (!('emails' in fields)) fields.emails = []
        super(fields)
    }

    static get filename() {
        return 'users.json'
    }

    async save(callback) {
        this.emails = this.emails.map(email => email.id)
        await super.save(User.filename, callback)
    }

    get_emails(filter='all') {
        let emails = this.emails.map(
            email_id => {
                let email = Email.findById(email_id)
                email.sender = User.findById(email.sender)
                email.recipient = User.findById(email.recipient)
                return email
            }
        )
        switch (filter) {
            case 'received':
                emails = emails.filter(email => email.recipient.equals(this.id))
                break
            case 'sent':
                emails = emails.filter(email => email.sender.equals(this.id))
                break
        }
        return emails.sort((a, b) => {
            return new Date(a.sending_time) < new Date(b.sending_time) ?
                1 : new Date(a.sending_time) > new Date(b.sending_time) ? -1 : 0
        })
    }
}
