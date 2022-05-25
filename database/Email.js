import BaseModel from './BaseModel.js'
import User from './User.js'


export default class Email extends BaseModel {
    constructor(fields) {
        if (!('title' in fields)) fields.title = '<No title>'
        fields.checked = false
        fields.sending_time = new Date()
        super(fields)
    }

    static get filename() {
        return 'emails.json'
    }

    async save(callback) {
        await super.save(Email.filename, callback)
    }

    static async check_consistency() {
        const emails = Email.find({})
        emails.forEach(
            async email => {
                const [sender, recipient] = [
                    await User.findById(email.sender),
                    await User.findById(email.recipient)
                ]
                if (!(sender.emails.includes(email.id)) &&
                    !(recipient.emails.includes(email.id))) {
                    await Email.findByIdAndRemove(email.id)
                }
            }
        )
    }
}