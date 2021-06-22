const router = require('express').Router();
let DonationPack = require('../models/donationPackModel');

router.route('/').get((req, res) => {
    DonationPack.find({})
        .then(donationpacks => res.json(donationpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/id/:id').get((req, res) => {
    DonationPack.findById(req.params.id)
        .then(donationpack => res.json(donationpack))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/top').get((req, res) => {
    DonationPack.aggregate([
        {
            $sort: {
                amount: -1
            }
        },
        {
            $limit: 3
        },
        {
            "$project": {
                name: 1,
                amount: 1
            }
        }
    ])
        .then(donationpacks => res.json(donationpacks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const amount = parseInt(req.body.amount);
    const date = req.body.date ? new Date(req.body.date).getTime() : new Date().getTime();

    // Stop the admin from adding a pack if it already exists (PHONE NUMBER)

    const newDonationPack = new DonationPack({
        name,
        phone,
        amount,
        date
    });

    newDonationPack.save()
        .then((pack) => res.json(pack))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    DonationPack.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted Successfully'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    DonationPack.findById(req.params.id)
        .then(donationpack => {
            donationpack.name = req.body.name;
            donationpack.phone = req.body.phone;
            donationpack.amount = parseInt(req.body.amount);
            donationpack.date = req.body.date ? new Date(req.body.date).getTime() : new Date().getTime();

            donationpack.save()
                .then(() => res.json('Donation pack updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;