const router = require('express').Router();
let BloodPack = require('../models/bloodPackModel');

router.route('/').get((req, res) => {
    BloodPack.find()
        .then(bloodpacks => res.json(bloodpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/total/:bloodgroup').get((req, res) => {
    BloodPack.countDocuments({
        bloodgroup: req.params.bloodgroup
    })
        .then(count => res.json(count))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:bloodgroup&:userid&:gender').get((req, res) => {
    if (req.params.gender === "male") {
        BloodPack.find({
            bloodgroup: req.params.bloodgroup,
            "user._id": { $ne: req.params.userid },
            "user.gender": "male",
        })
            .then(bloodpacks => res.json(bloodpacks))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        BloodPack.find({
            bloodgroup: req.params.bloodgroup,
            "user._id": { $ne: req.params.userid },
        })
            .then(bloodpacks => res.json(bloodpacks))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

router.route('/:bloodgroup&:userid&:lat&:lng&:gender').get((req, res) => {
    if (req.params.gender === "male") {
        BloodPack.find({
            bloodgroup: req.params.bloodgroup,
            "user._id": { $ne: req.params.userid },
            "user.gender": "male",
            location: { $near: { $maxDistance: 10000, $geometry: { type: "Point", coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] } } }
        })
            .then(bloodpacks => res.json(bloodpacks))
            .catch(err => res.status(400).json('Error: ' + err));
    } else {
        BloodPack.find({
            bloodgroup: req.params.bloodgroup,
            "user._id": { $ne: req.params.userid },
            location: { $near: { $maxDistance: 10000, $geometry: { type: "Point", coordinates: [parseFloat(req.params.lng), parseFloat(req.params.lat)] } } }
        })
            .then(bloodpacks => res.json(bloodpacks))
            .catch(err => res.status(400).json('Error: ' + err));
    }
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

router.route('/:id').delete((req, res) => {
    BloodPack.findByIdAndDelete(req.params.id)
        .then(() => res.json('Blood pack deleted.'))
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