const express = require('express');

const router = express.Router();

const controller = require('../controllers/volunteersController');

const { checkAuth } = require('../middlewares/auth');

router.post('/new', checkAuth, controller.createNewVolunteer);
router.put('/update/:id', checkAuth, controller.updateVolunteer);
router.delete('/delete/:id', checkAuth, controller.deleteVolunteer);
router.get('/find-volunteer-by-email', checkAuth, controller.getOneVolunteerByEmail);
router.get('/find-all-volunteers', checkAuth, controller.getAllVolunteers);
router.get('/find-volunteer/:id', checkAuth, controller.getOneVolunteerById);

module.exports = router;
