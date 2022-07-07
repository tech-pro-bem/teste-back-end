const express = require('express');

const router = express.Router();

const controller = require('../controllers/adminController');

const authController = require('../controllers/authController');

router.post('/new', controller.createNewAdmin);
router.post('/login', authController.login);
router.put('/update/:id', controller.updateAdmin);
router.delete('/delete/:id', controller.deleteAdmin);
router.get('/find-admin-by-email', controller.getOneAdminByEmail);
router.get('/find-all-admins', controller.getAllAdmins);
router.get('/find-admin/:id', controller.getOneAdminById);

module.exports = router;
