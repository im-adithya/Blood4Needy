const router = require('express').Router();
let Request = require('../models/requestModel');

router.route('/').get((req, res) => {
    Request.find().sort({$natural:-1})
        .then(requests => res.json(requests))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const user = req.body.user
    const bloodgroup = req.body.bloodgroup
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

    const newRequest = new Request({
        user,
        bloodgroup,
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
    });

    newRequest.save()
        .then(() => res.json('Request added!'))
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
            request.user = req.body.user;
            request.bloodgroup = req.body.bloodgroup;
            request.units = req.body.units;
            request.requireddate = req.body.requireddate;
            request.patientname = req.body.patientname;
            request.patientphone = req.body.patientphone;
            request.doctorname = req.body.doctorname;
            request.reason = req.body.reason;
            request.hospital = req.body.hospital;
            request.pos = req.body.pos;
            request.description = req.body.description;
            /*request.contactname = req.body.contactname;
            request.contactphone = req.body.contactphone;
            request.contactemail = req.body.contactemail;*/
            request.description = req.body.description;
            request.message = req.body.message;

            request.save()
                .then(() => res.json('Request updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;