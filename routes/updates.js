const router = require('express').Router();
let Update = require('../models/updatesModel');

router.route('/').get((req, res) => {
  Update.find().sort({ $natural: -1 })
    .then(updates => res.json(updates))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const newUpdate = new Update({
    title,
    content
  });

  newUpdate.save()
    .then(() => res.json('Update added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Update.findById(req.params.id)
    .then(update => {
      update.title = req.body.title;
      update.content = req.body.content;

      update.save()
        .then(() => res.json('Update updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Update.findByIdAndDelete(req.params.id)
    .then(() => res.json('Update deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;