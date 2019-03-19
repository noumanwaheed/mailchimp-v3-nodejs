let ChimpMailer = require('./chimpmailer');
require('dotenv').config();

try {
    (async () => {
        let mailer = new ChimpMailer(process.env.API_KEY,process.env.LIST_ID,process.env.MAIL_FROM,process.env.REPLY_TO);
        let response = await mailer.sendExampleCompaign(process.env.TEST_EMAIL,process.env.COMPAIGN_SUBJECT,parseInt(process.env.COMPAIGN_TEMPLATE_ID),process.env.COMPAIGN_CONTENT00,process.env.COMPAIGN_CONTENT01);
        console.log(response);
    })();
}
catch(err){
    console.log(err);
}