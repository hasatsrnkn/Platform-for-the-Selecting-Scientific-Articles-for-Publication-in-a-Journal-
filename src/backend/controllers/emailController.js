const nodemailer = require('nodemailer');

exports.sendEmail = function(req, res){
    // define the transporter
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'admreviewplatform@gmail.com',
        pass: 'jntrenqiiloxsiqa',
    },
    from:'admreviewplatform@gmail.com',
    });


    // define the email
    const mailOptions = {
        from: 'Review Platform',
        to: 'admreviewplatform@gmail.com',  // needed to change to variable 
        subject: 'Invitation to Review Platform',
        text: 'Hello! Please sign up to the Review Platform following *link*'
    };

    // send the email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.send(500, err.message);
        } else {
            console.log("Email sent");
            res.status(200).jsonp(req.body);
        }
    });
};