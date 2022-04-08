let User = require('../../mongodbModel/user.model');
const userError = require('../errorController')
const helperTypeCheck = require('../../helpers/typeChecks')
const nodemailer = require("nodemailer");
const moment = require("moment")
var fs = require('fs'); //Filesystem    

class MailController {
    constructor() {
        this.name = process.env.IS_BETA ? "[BETA] - ener.see" : "ener.see"
        this.transporter = nodemailer.createTransport({
            host: process.env.PRIVATE_IP || 'localhost',
            port: 25,
            // options: { priority: "high",path:"s-nail" },
            tls: {
                rejectUnauthorized: false
            },
            secure: false,
        });
    }

    async sendPasswordResetMail(to, userId, token, language, username) {
        const resetPasswordUrl = 'https://enersee.io/app/user/reset-password/token=' + token + '&user=' + userId + '&type=r'
        let info
        if (!language)
            language = 'tr'
        else if (language !== 'tr' || language !== 'en')
            language = 'tr'
        let content = fs.readFileSync(`${__dirname}/templates/password/resetPassword.html`, "utf-8");
        content = content.replace("{{resetPasswordLink}}", resetPasswordUrl);
        content = content.replace("{{username}}", username);
        try {
            if (language === 'tr') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: to, // list of receivers
                    subject: "Parolanızı Sıfırlayın", // Subject line
                    html: content
                });
            } else if (language === 'en') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: to, // list of receivers
                    subject: "Requested password reset", // Subject line
                    html: content
                });
            } else {
                throw new Error(err)
            }
        } catch (err) {
            userError.addError({}, err, 'sendPasswordResetMail(MAILER)', 0)
            throw new Error(err)
        }
        console.log('Email sent: ' + info.response);
        return true
    }

    async sendPasswordChangedInfo(userId, req) {
        if (!userId) throw new Error()
        let language = req.acceptsLanguages('tr', 'en');
        if (!['tr', 'en'].includes(language)) language = 'tr'
        moment.locale(language)
        let info
        const user = await User.findOne({ where: { userId: userId }, attributes: ["firstName", "lastName", "mail", "passwordChangeDate"], raw: true })
        let content = fs.readFileSync(`${__dirname}/templates/password/passwordChanged.html`, "utf-8");
        content = content.replace("{{user.fullname}}", user.firstName + ' ' + user.lastName);
        content = content.replace("{{timestamp}}", moment(user.passwordChangeDate).format('MMMM DD, YYYY, HH:mm'));

        try {
            if (language === 'tr') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: user.mail, // list of receivers
                    subject: "Parolanız değiştirildi", // Subject line
                    html: content
                });
            } else if (language === 'en') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: user.mail, // list of receivers
                    subject: "Requested password reset", // Subject line
                    html: content
                });
            } else {
                throw new Error(err)
            }
        } catch (err) {
            //throw new Error(err)
            userError.addError({}, err, 'sendPasswordChangedInfo(MAILER)', 0)
            return false
        }
        //console.log("Message sent: %s", info.messageId);
        console.log('Email sent: ' + info.response);
        return true
    }

    async sendWelcomeMail(mail, fullName, username, userId, token) {
        //if (!userId) throw new Error()
        let language = 'tr'//req.acceptsLanguages('tr', 'en');
        //if (!['tr', 'en'].includes(language)) language = 'tr'
        let info
        const resetPasswordUrl = 'https://enersee.io/app/user/reset-password/token=' + token + '&user=' + userId + '&type=n'
        let content = fs.readFileSync(`${__dirname}/templates/password/user-welcome.html`, "utf-8");
        content = content.replace("{{fullname}}", fullName);
        content = content.replace("{{username}}", username);
        content = content.replace("{{setPasswordLink}}", resetPasswordUrl);

        try {
            if (language === 'tr') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: mail, // list of receivers
                    subject: "ener.see'ye Hoşgeldiniz!", // Subject line
                    html: content
                });
            } else if (language === 'en') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: mail, // list of receivers
                    subject: "Welcome to ener.see!", // Subject line
                    html: content
                });
            } else {
                throw new Error(err)
            }
        } catch (err) {
            //throw new Error(err)
            userError.addError({}, err, 'sendWelcomeMail(MAILER)', 0)
            return false
        }
        //console.log("Message sent: %s", info.messageId);
        console.log('Email sent: ' + info.response);
        return true

    }
    async reactiveRedAlert(companyId, message) {
        if (!companyId) throw new Error()
        let language = "tr"
        let info
        const users = await User.findAll({ where: { companyId: companyId, status: 1 }, attributes: ["firstName", "lastName", "mail"], raw: true })

        try {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (language === 'tr') {
                    info = await this.transporter.sendMail({
                        from: `"${this.name}" <noreply@enersee.io>`, // sender address
                        to: user.mail, // list of receivers
                        subject: "🚨 [Sistem] Reaktif Alarmı!", // Subject line
                        html: '<img id="enersee-logo" style="margin: 0; padding: 0; border: 0;" src="https://enersee.io/static/logo_rounded.7d0aab14.png" alt="enersee" width="80" height="80" data-imagetype="External"  />' +
                            '<hr />' +
                            '<h4><b>Reaktif limitiniz aştınız! En yakın zamanda cezaya girmemek için düzeltiniz.</b></h4>' +
                            '<p>' + message + '</p>' +
                            '<br><br>' +
                            '<p>enersee</p>'
                    });
                } else if (language === 'en') {
                    info = await this.transporter.sendMail({
                        from: `"${this.name}" <noreply@enersee.io>`, // sender address
                        to: user.mail, // list of receivers
                        subject: "🚨 [Sistem] Reaktif Alarmı!", // Subject line
                        html: '<img id="enersee-logo" style="margin: 0; padding: 0; border: 0;" src="https://enersee.io/static/logo_rounded.7d0aab14.png" alt="enersee" width="80" height="80" data-imagetype="External"  />' +
                            '<hr />' +
                            '<h4><b>Reaktif limitiniz aştınız! En yakın zamanda cezaya girmemek için düzeltiniz.</b></h4>' +
                            '<p>' + message + '</p>' +
                            '<br><br>' +
                            '<p>enersee</p>'
                    });
                } else {
                    throw new Error(err)
                }
            }

        } catch (err) {
            //throw new Error(err)
            userError.addError({}, err, 'reactiveRedAlert(MAILER)', 0)
            return false
        }
        //console.log("Message sent: %s", info.messageId);
        //console.log('Email sent: ' + info.response);
        return true
    }

    async overConsumptionRedAlert(data = { companyId, alertHistoryUsers, description, alertTypeId }) {
        const { companyId, alertHistoryUsers, description, alertTypeId, name, meters, total, baseValue, operand } = data
        if (!companyId) throw new Error()
        let language = "tr"
        let info
        let subject = ""
        const users = await User.findAll({ where: { companyId: companyId, status: 1, userId: { [Op.in]: alertHistoryUsers } }, attributes: ["firstName", "lastName", "mail"], raw: true })

        if (alertTypeId === 1 || alertTypeId === 2)
            subject = "🚨 Günlük Enerji Kullanım Alarmı!"
        if (alertTypeId === 3 || alertTypeId === 4 || alertTypeId === 5)
            subject = "🚨 Aylık Enerji Kullanım Alarmı!"

        let metersTotalText = ""
        for (let l = 0; l < meters.length; l++) {
            const meter = meters[l];
            if (l === meters.length - 1) {
                metersTotalText += meter.name
            } else
                metersTotalText += meter.name + " + ";
        }
        metersTotalText += " (" + total.toFixed(2) + " kWh) " + this.getOperandText(operand) + " " + baseValue + " kWh"

        try {
            if (language === 'tr') {
                info = await this.transporter.sendMail({
                    from: `"${this.name}" <noreply@enersee.io>`, // sender address
                    to: users.map(u => u.mail), // list of receivers
                    subject: subject, // Subject line
                    html: '<hr />' +//'<img id="enersee-logo" style="margin: 0; padding: 0; border: 0;" src="https://enersee.io/static/logo_rounded.7d0aab14.png" alt="enersee" width="80" height="80" data-imagetype="External"  />' +
                        '<h4><b>' + name + '</b></h4>' +
                        '<p>' + metersTotalText + '</p>' +
                        // '<p>' + description + '</p>' +
                        '<br><br>' +
                        '<p>enersee</p>'
                });
            }
        } catch (err) {
            //throw new Error(err)
            userError.addError({}, err, 'overConsumptionRedAlert(MAILER)', 0)
            return false
        }
        //console.log("Message sent: %s", info.messageId);
        //console.log('Email sent: ' + info.response);
        return true
    }

    getOperandText(operandName) {
        if (operandName === "greaterThanEqual") {
            return ">="
        }
        else if (operandName === "greater") {
            return ">"
        }
        else if (operandName === "equal") {
            return "="
        }
        else if (operandName === "notEqual") {
            return "!="
        }
        else if (operandName === "less") {
            return "<"
        }
        else if (operandName === "lessThanEqual") {
            return "<="
        }
    }

    getConditionText(condition, unit, isAutoReset) {
        if (!unit || !unit.short || !unit.long)
            unit = { short: "", long: "" }
        let conditionText = ""
        if (condition.operand === "notbetween")
            conditionText = unit.long + " " + condition.meterValue + " " + unit.short + " ile " + condition.meterMaxValue + " " + unit.short + " dışında kalırsa"
        if (condition.operand === "between")
            conditionText = unit.long + " " + condition.meterValue + " " + unit.short + " ile " + condition.meterMaxValue + " " + unit.short + " arasında kalırsa"
        if (condition.operand === "greater")
            conditionText = unit.long + " " + condition.meterValue + " " + unit.short + " değerinden büyük olursa"
        if (condition.operand === "less")
            conditionText = unit.long + " " + condition.meterValue + " " + unit.short + " değerinden küçük olursa"
        if (isAutoReset)
            conditionText += " " + " (Tetiklendiğinde otomatik sıfırlanır.)"
        return conditionText
    }

    async alertMail(data) {
        //if (!userId) throw new Error()
        let language = 'tr'//req.acceptsLanguages('tr', 'en');
        //if (!['tr', 'en'].includes(language)) language = 'tr'
        let content = fs.readFileSync(`${__dirname}/templates/alert/alert.html`, "utf-8");
        let alertConditionContent = fs.readFileSync(`${__dirname}/templates/alert/alertCondition.html`, "utf-8")
        let passedValueContent = fs.readFileSync(`${__dirname}/templates/alert/passedValue.html`, "utf-8");
        let notifiedUserContent = fs.readFileSync(`${__dirname}/templates/alert/notifiedUser.html`, "utf-8")
        let userIds = []
        for (let u = 0; u < data.length; u++) {
            const element = data[u];
            userIds = [...userIds, ...element.userIds]
        }

        const users = await User.findAll({ where: { status: 1, userId: { [Op.in]: userIds } }, attributes: ["userId", "firstName", "lastName", "mail"], raw: true })

        for (let i = 0; i < data.length; i++) {
            const alert = data[i];

            let tempContent = content
            let tempNotifiedUserContent2 = ""
            tempContent = tempContent.replace("{{alertName}}", alert.data.alert.description);
            tempContent = tempContent.replace("{{alertType}}", alert.data.alert.alerts_alertTypes.name);
            tempContent = tempContent.replace("{{dateTime}}", alert.dateTime.format("DD.MM.YYYY HH:mm"));

            let tempConditionContent = ""
            for (let j = 0; j < alert.data.occuredConditions.length; j++) {
                const condition = alert.data.occuredConditions[j];
                let tempCondition = alertConditionContent
                let conditionText = this.getConditionText(condition.condition, alert.unit, alert.data.alert.isAutoReset)
                tempCondition = tempCondition.replace("{{condition}}", conditionText);
                tempCondition = tempCondition.replace("{{meterName}}", condition.meter.name);

                let tempPassedValueContent = ""
                for (let k = 0; k < condition.passedValues.length; k++) {
                    const passedValue = condition.passedValues[k];
                    let tempPassedValueContent2 = passedValueContent
                    let passedValueText = passedValue.text + ": " + parseFloat(passedValue.value).toFixed(2) + " " + passedValue.unit
                    tempPassedValueContent2 = tempPassedValueContent2.replace("{{phaseValue}}", passedValueText);
                    tempPassedValueContent += tempPassedValueContent2
                }
                tempCondition = tempCondition.replace("{{passedValues}}", tempPassedValueContent);
                tempConditionContent += tempCondition
            }
            let targetMails = []
            for (let d = 0; d < alert.data.alert.alerts_alertUsers.length; d++) {
                const user = alert.data.alert.alerts_alertUsers[d];
                const fetchedUser = users.find(fu => fu.userId === user.userId)
                let tempNotifiedUserContent = notifiedUserContent
                if (fetchedUser && fetchedUser.mail) {
                    targetMails.push(fetchedUser.mail)
                    tempNotifiedUserContent = tempNotifiedUserContent.replace("{{userFullName}}", fetchedUser.firstName + " " + fetchedUser.lastName);
                }
                else if (fetchedUser)
                    tempNotifiedUserContent = tempNotifiedUserContent.replace("{{userFullName}}", fetchedUser.firstName + " " + fetchedUser.lastName + " (NO MAIL)");

                tempNotifiedUserContent2 += tempNotifiedUserContent
            }
            tempContent = tempContent.replace("{{alertConditions}}", tempConditionContent);
            tempContent = tempContent.replace("{{notifiedUsers}}", tempNotifiedUserContent2);
            let info
            try {
                if (language === 'tr') {
                    info = await this.transporter.sendMail({
                        from: `"${this.name}" <noreply@enersee.io>`, // sender address
                        to: targetMails, // list of receivers
                        subject: alert.data.alert.alerts_alertTypes.alertTitle + ' "' + alert.data.alert.description + '"', // Subject line
                        html: tempContent
                    });
                } else if (language === 'en') {
                    info = await this.transporter.sendMail({
                        from: `"${this.name}" <noreply@enersee.io>`, // sender address
                        to: targetMails, // list of receivers
                        subject: alert.data.alert.alerts_alertTypes.alertTitle + ' "' + alert.data.alert.description + '"', // Subject line
                        html: tempContent
                    });
                } else {
                    throw new Error(err)
                }
            } catch (err) {
                //throw new Error(err)
                userError.addError({}, err, 'sendWelcomeMail(MAILER)', 0)
                return false
            }
            console.log('Email sent: ' + info.response);
        }
        return true
    }
}

module.exports = MailController;