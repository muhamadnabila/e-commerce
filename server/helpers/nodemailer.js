const nodemailer = require("nodemailer");

module.exports = {
    nodeMailer : function() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: `${process.env.NODE_MAILER_USER}`, // generated ethereal user
            pass: `${process.env.NODE_MAILER_PASS}` // generated ethereal password
            }
        });
        let info = {
            from: `"HNDSUPPLYCO." <${process.env.NODE_MAILER_USER}>`, // sender address
            to: `mbilalghz@gmail.com`, // list of receivers
            subject: "NOTIFICATION", // Subject line
            html: `
                <h1> You have new order </h1>
            ` 
        };
        return new Promise(( res, rej )=>{
            transporter.sendMail(info)
            .then(data =>{
                res(data)
            })
            .catch(err =>{
                rej(err)
            })
        }) 
    }

}