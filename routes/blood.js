const router = require('express').Router();
var mongoose = require('mongoose');
let BloodPack = require('../models/bloodPackModel');

function genderParams(gender) {
    switch (gender) {
        case 'male':
            return { $in: ['male'] }
        default:
            return { $in: ['male', 'female', 'other'] }
    }
}

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
    BloodPack.find()
        .then(bloodpacks => res.json(bloodpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/total/:bloodgroup').get((req, res) => {
    BloodPack.countDocuments({
        bloodgroup: paramsFinder(req.params.bloodgroup)
    })
        .then(count => res.json(count))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all/:bloodgroup&:userid&:gender').get((req, res) => {
    BloodPack.find({
        "user.gender": genderParams(req.params.gender),
        bloodgroup: paramsFinder(req.params.bloodgroup),
    })
        .then(bloodpacks => res.json(bloodpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:bloodgroup&:userid&:lat&:lng&:gender').get((req, res) => {
    BloodPack.find({
        "user.gender": genderParams(req.params.gender),
        bloodgroup: paramsFinder(req.params.bloodgroup),
        location: { $near: { $maxDistance: 30000, $geometry: { type: "Point", coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] } } }
    })
        .then(bloodpacks => res.json(bloodpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const user = req.body.user;
    const name = req.body.user.name;
    const bloodgroup = req.body.user.bloodgroup;
    const location = {
        type: "Point",
        coordinates: [req.body.user.pos.lng, req.body.user.pos.lat]
    }

    const newBloodPack = new BloodPack({
        user,
        name,
        bloodgroup,
        location
    });

    newBloodPack.save()
        .then(() => res.json('Blood pack added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:phone').delete((req, res) => {
    BloodPack.deleteOne({ "user.phone": req.params.phone })
        .then(() => res.json('Deleted Successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    BloodPack.findById(req.params.id)
        .then(bloodpack => {
            bloodpack.user = req.body.user;
            bloodpack.name = req.body.name;
            bloodpack.bloodgroup = req.body.bloodgroup;
            bloodpack.location = {
                type: "Point",
                coordinates: [req.body.user.pos.location.lng, req.body.user.pos.location.lat]
            }

            bloodpack.save()
                .then(() => res.json('Blood pack updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;