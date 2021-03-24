const router = require('express').Router();
const SendOtp = require('sendotp');

const sendOtp = new SendOtp(process.env.OTP_AUTH_KEY);

router.route('/').get((req, res) => {
    if (req.body.phonenumber) {
        sendOtp.send(req.query.phonenumber, "TESTIN", function (error, data) {
            console.log(data);
        });
    }
});

router.route('/verify').get((req, res) => {
    if (req.query.phonenumber) {
        sendOtp.verify(req.query.phonenumber, req.query.otp, function (error, data) {
            console.log(data);
            if (data.type == 'success') console.log('OTP verified successfully')
            if (data.type == 'error') console.log('OTP verification failed')
        });
    }
});

router.route('/retry').get((req, res) => {
    if (req.query.phonenumber) {
        sendOtp.retry(req.query.phonenumber, false, function (error, data) {
            console.log(data);
        });
    }
});

module.exports = router;