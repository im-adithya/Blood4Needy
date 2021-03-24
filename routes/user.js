const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/feed').get((req, res) => {
  User.find().sort({ $natural: -1 }).limit(5)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/total').get((req, res) => {
  User.count()
    .then(count => res.json(count))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const age = req.body.age;
  const gender = req.body.gender;
  const bloodgroup = req.body.bloodgroup;
  const address = req.body.address;
  const pos = req.body.pos;
  const feedback = req.body.feedback;

  const newUser = new User({
    name,
    phone,
    email,
    age,
    gender,
    bloodgroup,
    address,
    pos,
    feedback
  });

  newUser.save()
    .then((saveduser) => res.json(saveduser))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/testimonials').get((req, res) => {
  User.find( { feedback: { $ne: '' } } )
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:phone').get((req, res) => {
  User.findOne({
      phone: req.params.phone
    })
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name;
      user.phone = req.body.phone;
      user.email = req.body.email;
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.bloodgroup = req.body.bloodgroup;
      user.address = req.body.address;
      user.pos = req.body.pos.location;
      user.feedback = req.body.feedback;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;