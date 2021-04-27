const mailer = require("@sendgrid/mail");
mailer.setApiKey("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");

const router = require('express').Router();
let User = require('../models/userModel');
let Request = require('../models/requestModel');
let BloodPack = require('../models/bloodPackModel');

function paramsFinder(bg) {
    switch (bg) {
        case "O+":
            return { $in: ['O+', 'O-'] }
        case "O-":
            return { $in: ['O-'] }
        case "A+":
            return { $in: ['A+', 'A-', 'O+', 'O-'] }
        case "A-":
            return { $in: ['A-', 'O-'] }
        case "B+":
            return { $in: ['B+', 'B-', 'O+', 'O-'] }
        case "B-":
            return { $in: ['B-', 'O-'] }
        case "AB-":
            return { $in: ['AB-', 'A-', 'B-', 'O-'] }
        case "AB+":
            return { $in: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }
        default:
            return { $in: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] }
    }
}

router.route('/').get((req, res) => {
    Request.find({ show: true }).sort({ $natural: -1 })
        .then(requests => res.json(requests))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').get((req, res) => {
    Request.find().sort({ $natural: -1 })
        .then(requests => res.json(requests))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const user = req.body.user
    const bloodgroup = req.body.bloodgroup
    const type = req.body.type
    const units = req.body.units
    const requireddate = req.body.requireddate
    const patientname = req.body.patientname
    const patientphone = req.body.patientphone
    const doctorname = req.body.doctorname
    const reason = req.body.reason
    const hospital = req.body.hospital
    const pos = req.body.pos
    const description = req.body.description
    /*const contactname = req.body.contactname
    const contactphone = req.body.contactphone
    const contactemail = req.body.contactemail*/
    const message = req.body.message
    const show = true

    const latlng = pos.lat + "," + pos.lng
    const maplink = "https://maps.googleapis.com/maps/api/staticmap?center=" + latlng + "&zoom=12&size=400x200&sensor=false&key=AIzaSyANuhJR4VpJDXayqxOSKwx8GjaSoaLu7Us&maptype=roadmap&markers=icon|" + latlng
    const calllink = "tel:" + patientphone

    const newRequest = new Request({
        user,
        bloodgroup,
        type,
        units,
        requireddate,
        patientname,
        patientphone,
        doctorname,
        reason,
        hospital,
        pos,
        description,
        /*contactname,
        contactphone,
        contactemail,*/
        message,
        show
    });
    newRequest.save()
        .then(() => {
            res.json('Request added!')
            BloodPack.find(
                {
                    "user.type": type,
                    "bloodgroup": paramsFinder(bloodgroup),
                    location: { $near: { $maxDistance: 30000, $geometry: { type: "Point", coordinates: [parseFloat(pos.lng), parseFloat(pos.lat)] } } }
                },
                { "user.email": 1, "_id": 0 })
                .then(res => {
                    const mailingList = res.map(obj => obj.user.email)
                    const msg = {
                        to: ["imadith7@gmail.com", "lakshyamadhavgoyal@gmail.com", "harshitmoolchandani01@gmail.com"]/*mailingList*/,
                        from: "BloodRequests@blood4needy.com",
                        subject: "New " + type.charAt(0).toUpperCase() + type.slice(1) + " Request in Your Area: " + patientname,
                        text: 'Donate Blood, Save Lives!',
                        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml"> <head> <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--> <meta content="text/html; charset=utf-8" http-equiv="Content-Type" /> <meta content="width=device-width" name="viewport" /> <!--[if !mso]><!--> <meta content="IE=edge" http-equiv="X-UA-Compatible" /> <!--<![endif]--> <title></title> <!--[if !mso]><!--> <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet" /> <!--<![endif]--> <style type="text/css"> body { margin: 0; padding: 0; } table, td, tr { vertical-align: top; border-collapse: collapse; } * { line-height: inherit; } a[x-apple-data-detectors=true] { color: inherit !important; text-decoration: none !important; } </style> <style id="media-query" type="text/css"> @media (max-width: 660px) { .block-grid, .col { min-width: 320px !important; max-width: 100% !important; display: block !important; } .block-grid { width: 100% !important; } .col { width: 100% !important; } .col_cont { margin: 0 auto; } img.fullwidth, img.fullwidthOnMobile { max-width: 100% !important; } .no-stack .col { min-width: 0 !important; display: table-cell; } .no-stack.two-up .col { width: 50% !important; } .no-stack .col.num2 { width: 16.6% !important; } .no-stack .col.num3 { width: 25% !important; } .no-stack .col.num4 { width: 33% !important; } .no-stack .col.num5 { width: 41.6% !important; } .no-stack .col.num6 { width: 100% !important; } .no-stack .col.num7 { width: 58.3% !important; } .no-stack .col.num8 { width: 66.6% !important; } .no-stack .col.num9 { width: 75% !important; } .no-stack .col.num10 { width: 83.3% !important; } .video-block { max-width: none !important; } .mobile_hide { min-height: 0px; max-height: 0px; max-width: 0px; display: none !important; overflow: hidden; font-size: 0px; } .desktop_hide { display: block !important; max-height: none !important; } .mainlogo { margin: 0 auto; } .img-cont { padding: 0 !important } .bloodrequest { width: 98% !important; } } </style> <style id="menu-media-query" type="text/css"> @media (max-width: 660px) { .menu-checkbox[type="checkbox"]~.menu-links { display: none !important; padding: 5px 0; } .menu-checkbox[type="checkbox"]~.menu-links span.sep { display: none; } .menu-checkbox[type="checkbox"]:checked~.menu-links, .menu-checkbox[type="checkbox"]~.menu-trigger { display: block !important; max-width: none !important; max-height: none !important; font-size: inherit !important; } .menu-checkbox[type="checkbox"]~.menu-links>a, .menu-checkbox[type="checkbox"]~.menu-links>span.label { display: block !important; text-align: center; } .menu-checkbox[type="checkbox"]:checked~.menu-trigger .menu-close { display: block !important; } .menu-checkbox[type="checkbox"]:checked~.menu-trigger .menu-open { display: none !important; } #menu3vl2qi~div label { border-radius: 0% !important; } #menu3vl2qi:checked~.menu-links { background-color: #e30226 !important; } #menu3vl2qi:checked~.menu-links a { color: #ffffff !important; } #menu3vl2qi:checked~.menu-links span { color: #ffffff !important; } } </style> <style id="icon-media-query" type="text/css"> @media (max-width: 660px) { .icons-inner { text-align: center; } .icons-inner td { margin: 0 auto; } } </style> <style> .heart { animation: .8s infinite beatHeart; } @keyframes beatHeart { 0% { transform: scale(1); } 25% { transform: scale(1.1); } 40% { transform: scale(1); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } } </style> </head> <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #ffffff;"> <!--[if IE]><div class="ie-browser"><![endif]--> <table bgcolor="#ffffff" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; width: 100%;" valign="top" width="100%"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top;" valign="top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#ffffff"><![endif]--> <div style="background-color:transparent;"> <div class="block-grid two-up no-stack" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="320" style="background-color:transparent;width:320px; border-top: 2px solid #EFEFEF; border-left: 2px solid #EFEFEF; border-bottom: 0px solid transparent; border-right: 1px solid #EFEFEF;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--> <div class="col num6" style="display: table-cell; vertical-align: top; max-width: 300px; min-width: 200px; width: 200px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:2px solid #EFEFEF; border-left:2px solid #EFEFEF; border-bottom:0px solid transparent; border-right:1px solid #FFFFFF; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <div align="left" class="img-container left fixedwidth img-cont" style="padding-right: 0px;padding-left: 40px;"> <a href="https://www.blood4needy.com" style="outline:none" tabindex="-1" target="_blank"><img alt="Blood4Needy" border="0" class="left fixedwidth mainlogo" src="https://i.ibb.co/SyD0PB8/logodark.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block; margin-top: 10px; margin-bottom: 10px;" title="Blood4Needy" width="100" /></a> </div> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td><td align="center" width="320" style="background-color:transparent;width:320px; border-top: 2px solid #EFEFEF; border-left: 1px solid #EFEFEF; border-bottom: 0px solid transparent; border-right: 2px solid #EFEFEF;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]--> <div class="col num6 mobile_hide" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 318px; width: 317px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:2px solid #EFEFEF; border-left:1px solid #FFFFFF; border-bottom:0px solid transparent; border-right:2px solid #EFEFEF; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%"> <tr style="vertical-align: top;" valign="top"> <td align="right" style="word-break: break-word; vertical-align: top; padding-top: 30px; padding-bottom: 25px; padding-left: 0px; padding-right: 15px; text-align: right; font-size: 0px;" valign="top"> <div class="menu-links"> <!--[if mso]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"> <tr> <td style="padding-top:5px;padding-right:15px;padding-bottom:5px;padding-left:15px"> <![endif]--><a href="https://blood4needy.com/request" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline;color:#000000;font-family:'DM Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:15px;text-decoration:none;letter-spacing:undefined;">Raise A Request</a> <!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:19px;font-family:'DM Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif;color:#e30226;">|</span> <!--[if mso]></td><![endif]--> <!--[if mso]></td><td style="padding-top:5px;padding-right:15px;padding-bottom:5px;padding-left:15px"><![endif]--><a href="https://blood4needy.com/blood" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline;color:#000000;font-family:'DM Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:15px;text-decoration:none;letter-spacing:undefined;">Donors</a> <!--[if mso]></td><td><![endif]--><span class="sep" style="font-size:19px;font-family:'DM Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif;color:#e30226;">|</span> <!--[if mso]></td><![endif]--> <!--[if mso]></td><td style="padding-top:5px;padding-right:15px;padding-bottom:5px;padding-left:15px"><![endif]--><a href="https://blog.blood4needy.com/" style="padding-top:5px;padding-bottom:5px;padding-left:15px;padding-right:15px;display:inline;color:#000000;font-family:'DM Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:15px;text-decoration:none;letter-spacing:undefined;">Blog</a> <!--[if mso]></td></tr></table><![endif]--> </div> </td> </tr> </table> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #e30226;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#e30226;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#e30226"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#e30226;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <table cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%"> <tr style="vertical-align: top;" valign="top"> <td align="center" style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center; width: 100%;" valign="top" width="100%"> <h1 style="color:#ffffff;direction:ltr;font-family:DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:25px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"> <strong>${patientname} needs your help!</strong> </h1> </td> </tr> </table> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #e30226;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#e30226;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#e30226"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#e30226;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <table cellpadding="0" cellspacing="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%"> <tr style="vertical-align: top;" valign="top"> <td align="center" style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 0px; padding-right: 0px; padding-top: 0px; text-align: center; width: 100%;" valign="top" width="100%"> <h1 style="color:#ffffff;direction:ltr;font-family:DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif;font-size:25px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;"> <strong>Live Activity Log</strong> </h1> </td> </tr> </table> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #e30226;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#F42929;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#e30226"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#e30226;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:25px; padding-bottom:25px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:25px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 15px; padding-left: 15px; padding-top: 0px; padding-bottom: 20px; font-family: Arial, sans-serif"><![endif]--> <div style="color:#555555;font-family:DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:15px;padding-right:15px;padding-bottom:20px;padding-left:15px;"> <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; color: #555555; font-family: DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;"> <div class="bloodrequest" style="margin: 0 auto; padding: 20px;width: 70%; background-color: #FFFFFF; min-width: 320px; box-sizing: border-box; border-radius: 10px;"> <div> <h2 style="font-size: 40px; color: black;margin: 0 0 10px;"> ${patientname}</h2> <p style="font-size:16px; line-height: 1.4;">looking for <span style="font-weight: bold;">${bloodgroup} (${type.charAt(0).toUpperCase() + type.slice(1)})</span> in <span style="font-weight: bold;">${hospital}</span> </p> </div> <div>Just Now</div> <p style="font-size:16px; line-height: 25px;">${message}</p> <img alt="map" style="width: 100%; margin-bottom: 20px;" src=${maplink} /> <div class="helperbtns"> <button class="contactpatient" style="width: 48%;margin-right: 1% ; height: 40px; border-radius: 5px; font-size: 16px; outline: none; border: none; background-color: #f42929;"> <a href=${calllink} style="text-decoration: none; color: #fff; font-family: 'DM Sans'; font-size: 14px; font-weight: bold;"> <div class="contactpatient-1">Contact Patient</div> </a> </button> <button class="share" style="width: 48%; margin-left: 1%; height: 40px; border-radius: 5px; font-size: 16px; outline: none; border: none; background-color: #6dc370;"> <a href="https://blood4needy.com/feed" style="text-decoration: none; color: #fff; font-family: 'DM Sans'; font-size: 14px; font-weight: bold;"> <div class=" contactpatient-1">Visit Requests</div> </a> </button> </div> </div> </div> </div> </div> <!--[if mso]></td></tr></table><![endif]--> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top: 15px; padding-bottom: 15px; font-family: Arial, sans-serif"><![endif]--> <!--[if mso]></td></tr></table><![endif]--> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <div style="background-color:transparent;"> <div class="block-grid" style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #000000;"> <div style="border-collapse: collapse;display: table;width: 100%;background-color:#efefef;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#000000"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#000000;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]--> <div class="col num12" style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;"> <div class="col_cont" style="width:100% !important;"> <!--[if (!mso)&(!IE)]><!--> <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;"> <!--<![endif]--> <div align="center" class="img-container center fixedwidth" style="padding-right: 30px;padding-left: 30px;"> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 30px;padding-left: 30px;" align="center"><![endif]--> <!--https://i.ibb.co/GxFpYmx/logowhite.png"--> <div style="font-size:1px;line-height:30px"> </div><a href="https://blood4needy.com/" style="outline:none" tabindex="-1" target="_blank"><img align="center" alt="Blood4Needy" border="0" class="center fixedwidth" src="https://i.ibb.co/SyD0PB8/logodark.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 100px; display: block;" title="Blood4Needy" width="170" /></a> <div style="font-size:1px;line-height:15px"> </div> <!--[if mso]></td></tr></table><![endif]--> </div> <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%"> <tbody> <tr style="vertical-align: top;" valign="top"> <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top"> <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top"> <tbody> <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top"> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;" valign="top"><a href="http://www.example.com" target="_blank"><img alt="Facebook" height="32" src="https://i.ibb.co/xzd4yfQ/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="facebook" width="32" /></a> </td> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;" valign="top"><a href="http://www.example.com" target="_blank"><img alt="Instagram" height="32" src="https://i.ibb.co/9b8LpLr/instagram2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="instagram" width="32" /></a> </td> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;" valign="top"><a href="http://www.example.com" target="_blank"><img alt="Twitter" height="32" src="https://i.ibb.co/pddbLkT/twitter2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Twitter" width="32" /></a> </td> <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;" valign="top"><a href="https://www.linkedin.com/" target="_blank"><img alt="LinkedIn" height="32" src="https://i.ibb.co/GQ85LQC/linkedin2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="LinkedIn" width="32" /></a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 60px; padding-left: 60px; padding-top: 10px; padding-bottom: 45px; font-family: Arial, sans-serif"><![endif]--> <div style="color:#000000;font-family:DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:60px;padding-bottom:45px;padding-left:60px;"> <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; color: #000000; font-family: DM Sans, Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;"> <p style="font-size: 9px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 11px; margin: 0;"> <span style="font-size: 12px;">©2020-2021 Blood4Needy</span> </p> </div> </div> <!--[if mso]></td></tr></table><![endif]--> <!--[if (!mso)&(!IE)]><!--> </div> <!--<![endif]--> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if (IE)]></div><![endif]--> </body> </html>`
                    };

                    mailer.sendMultiple(msg).then(() => {
                        console.log('Emails sent successfully!');
                    }).catch(error => {
                        console.log(error);
                    });

                })
                .catch(err => console.log(err))

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Request.findById(req.params.id)
        .then(request => res.json(request))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Request.findByIdAndDelete(req.params.id)
        .then(() => res.json('Request deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Request.findById(req.params.id)
        .then(request => {
            request.bloodgroup = req.body.bloodgroup;
            //request.units = req.body.units;
            request.requireddate = req.body.requireddate;
            request.patientphone = req.body.patientphone;
            request.message = req.body.message;

            request.save()
                .then(() => res.json('Request updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/show/:id').post((req, res) => {
    Request.findById(req.params.id)
        .then(request => {
            request.show = req.body.show;
            request.save()
                .then(() => res.json('Request updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;