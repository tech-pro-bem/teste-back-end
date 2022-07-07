const bcrypt = require('bcrypt');
const AdminSchema = require('../models/adminSchema');

const createNewAdmin = async (req, res) => {
  const { email, name } = req.body;

  if (req.body.password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,20}$/;
    if (!req.body.password.match(passwordRegex)) {
      return res.status(406).json({
        message: 'The registration of a new admin have failed',
        details:
          'Passwords must be a minimum of seven characters long and contain at least one uppercase and one lowercase letter (A, z), one numeric character (0-9), and one special character (such as !, %, @, or #).',
      });
    }
  }

  const findAdminByEmail = await AdminSchema.exists({
    email: req.body.email,
  });

  if (findAdminByEmail) {
    return res.status(406).json({
      message: 'The registration of a new admin have failed',
      details: `There is a register already assigned to the email: ${email}.`,
    });
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  try {
    const newAdmin = new AdminSchema({
      password: req.body.password,
      email,
      name,
    });

    await newAdmin.save();

    return res.status(201).json({
      message: 'New admin register successfully created',
      newAdmin,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAdmin = async (req, res) => {
  const {
    email, name,
  } = req.body;
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'The admin update have failed',
        details: `There isn't a admin with the id: ${req.params.id}, in the database.`,
      });
    }

    if (email) {
      const findAdminByEmail = await AdminSchema.exists({
        email: req.body.email,
      });
      if (findAdminByEmail) {
        return res.status(406).json({
          message: 'The admin update have failed',
          details: `There is a register already assigned to the email: ${email}.`,
        });
      }
    }

    if (req.body.password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,20}$/;

      if (!req.body.password.match(passwordRegex)) {
        return res.status(406).json({
          message: 'The registration of a new admin have failed',
          details:
            'Passwords must be a minimum of seven characters long and contain at least one uppercase and one lowercase letter (A, z), one numeric character (0-9), and one special character (such as !, %, @, or #).',
        });
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
    }

    adminFound.email = email || adminFound.email;
    adminFound.name = name || adminFound.name;
    adminFound.password = req.body.password || adminFound.password;

    const savedAdmin = await adminFound.save();

    return res.status(200).json({
      message: 'Admin register successfully updated',
      savedAdmin,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the admin register',
        details: `There isn't a admin with the id: ${req.params.id}, in the database.`,
      });
    }

    await adminFound.delete();

    return res.status(200).json({
      message: `admin: ${adminFound.email}, successfully deleted`,
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAdminById = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findById(req.params.id);

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the admin register',
        details: `There isn't a admin with the id: ${req.params.id}, in the database.`,
      });
    }

    return res.status(200).json({
      message: `admin: -${adminFound.name}- successfully located.`,
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneAdminByEmail = async (req, res) => {
  try {
    const adminFound = await AdminSchema.findOne({
      email: req.query.email,
    });

    if (adminFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the admin register',
        details: `There isn't a admin with the e-mail: ${req.query.email}, in the database.`,
      });
    }

    return res.status(200).json({
      message: `admin: -${adminFound.name}- successfully located.`,
      adminFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllAdmins = async (req, res) => {
  AdminSchema.find((error, admins) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    return res.status(200).json(admins);
  });
};

module.exports = {
  createNewAdmin,
  updateAdmin,
  deleteAdmin,
  getOneAdminById,
  getOneAdminByEmail,
  getAllAdmins,
};
