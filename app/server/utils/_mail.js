var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://js.logger.service@gmail.com:92197196Marius@smtp.gmail.com');

var sendHtml = '<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <title>Error handling</title></head><body style="box-sizing: border-box; margin: 0; padding: 40px; max-width: 100%; background-color: #f1f1f1; font-family: monospace; font-size: 15px;"><div style="max-width: 900px; margin: 0 auto; padding: 10px; background: #fff;"> <h1 style="color: #cc181e; font-size: 25px; margin: 0;">Uncaught TypeError: Cannot read property loginFormId of undefined</h1> <div style="margin: 10px 0 5px 0; font-size: 18px;"> <span style="font-size: 18px">Error line: </span> <b>992</b> </div> <div style="margin-bottom: 5px;"> <span style="font-size: 18px">Page: </span> <b>http://gluedmanpower.com/list</b> </div> <div style="margin-bottom: 5px;"> <span style="font-size: 18px">Browser: </span> <b>Chrome(<i>49</i>)</b> </div> <div style="margin-bottom: 5px;"> <span style="font-size: 18px">Stack trace: </span> <div style="margin-top: 2px;"> TypeError: Cannot read property loginFormId of undefined at http://gluedmanpower.com/Themes/Glued/Content/Scripts/src/plugin/core/logInForm.js?v=2016-03-18:6:39 at Object.context.execCb (http://gluedmanpower.com/Themes/Glued/Content/Scripts/src/lib/require.js:1678:33) at Object.Module.check (http://gluedmanpower.com/Themes/Glued/Content/Scripts/src/lib/require.js:878:51) at Object (http://gluedmanpower.com/Themes/Glued/Content/Scripts/src/lib/require.js:1128:34) </div> </div></div></body></html>';

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"JS Logger"<js.logger.service@gmail.com>',
    to: 'misterhomer1992@gmail.com',
    subject: 'Logs',
    text: '',
    html: sendHtml
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});