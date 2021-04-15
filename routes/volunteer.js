const router = require('express').Router();
let Volunteer = require('../models/volunteerModel');

router.route('/').get((req, res) => {
    Volunteer.find()
        .then(volunteers => res.json(volunteers))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/total').get((req, res) => {
    Volunteer.count()
        .then(count => res.json(count))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const city = req.body.city;
    const interest = req.body.interest;
    const experience = req.body.experience;
    const reached = req.body.reached;
    const additionalinfo = req.body.additionalinfo;

    const newVolunteer = new Volunteer({
        name,
        phone,
        email,
        occupation,
        city,
        interest,
        experience,
        reached,
        additionalinfo
    });

    newVolunteer.save()
        .then((savedvolunteer) => res.json(savedvolunteer))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Volunteer.findById(req.params.id)
        .then(volunteer => {
            volunteer.name = req.body.name;
            volunteer.phone = req.body.phone;
            volunteer.email = req.body.email;
            volunteer.occupation = req.body.occupation;
            volunteer.city = req.body.city;
            volunteer.interest = req.body.interest;
            volunteer.experience = req.body.experience;
            volunteer.reached = req.body.reached;
            volunteer.additionalinfo = req.body.additionalinfo;

            volunteer.save()
                .then((updatedVolunteer) => res.json(updatedVolunteer))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Volunteer.findByIdAndDelete(req.params.id)
        .then(() => res.json('Volunteer deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;