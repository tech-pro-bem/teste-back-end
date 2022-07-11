const VolunteerSchema = require('../models/volunteersSchema');

const createNewVolunteer = async (req, res) => {
  const {
    email,
    fullName,
    birthdate,
    cellphoneNumberWithDDD,
    occupation,
    university,
    semester,
    specialty,
    listFreeDaysOfWeek,
    timeOfExperience,
    howMuchParticipate,
    howDidKnowOfSDR,
  } = req.body;

  try {
    const newVolunteer = new VolunteerSchema({
      email,
      fullName,
      birthdate,
      cellphoneNumberWithDDD,
      occupation,
      university,
      semester,
      specialty,
      listFreeDaysOfWeek,
      timeOfExperience,
      howMuchParticipate,
      howDidKnowOfSDR,
    });

    const findVolunteersByEmail = await VolunteerSchema.exists({
      email: req.body.email,
    });

    if (findVolunteersByEmail) {
      return res.status(406).json({
        message: 'The registration of a new volunteer have failed',
        details: `There is a register already assigned to the email: ${email}.`,
      });
    }
    await newVolunteer.save();

    return res.status(201).json({
      message: 'New volunteer register successfully created',
      newVolunteer,

    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateVolunteer = async (req, res) => {
  const {
    email,
    fullName,
    birthdate,
    cellphoneNumberWithDDD,
    occupation,
    university,
    semester,
    specialty,
    listFreeDaysOfWeek,
    timeOfExperience,
    howMuchParticipate,
    howDidKnowOfSDR,
  } = req.body;
  try {
    const volunteerFound = await VolunteerSchema.findById(req.params.id);

    if (volunteerFound === null) {
      return res.status(404).json({
        message: 'The volunteer update have failed',
        details: `There isn't a volunteer with the id: ${req.params.id}, in the database.`,
      });
    }

    if (email) {
      const findVolunteersByEmail = await VolunteerSchema.exists({
        email: req.body.email,
      });
      if (findVolunteersByEmail) {
        return res.status(406).json({
          message: 'The volunteer update have failed',
          details: `There is a register already assigned to the email: ${email}.`,
        });
      }
    }

    volunteerFound.email = email
      || volunteerFound.email;
    volunteerFound.fullName = fullName
      || volunteerFound.fullName;
    volunteerFound.birthdate = birthdate
      || volunteerFound.birthdate;
    volunteerFound.cellphoneNumberWithDDD = cellphoneNumberWithDDD
      || volunteerFound.cellphoneNumberWithDDD;
    volunteerFound.occupation = occupation
      || volunteerFound.occupation;
    volunteerFound.university = university
      || volunteerFound.university;
    volunteerFound.semester = semester
      || volunteerFound.semester;
    volunteerFound.specialty = specialty
      || volunteerFound.specialty;
    volunteerFound.listFreeDaysOfWeek = listFreeDaysOfWeek
      || volunteerFound.listFreeDaysOfWeek;
    volunteerFound.timeOfExperience = timeOfExperience
      || volunteerFound.timeOfExperience;
    volunteerFound.howMuchParticipate = howMuchParticipate
      || volunteerFound.howMuchParticipate;
    volunteerFound.howDidKnowOfSDR = howDidKnowOfSDR
      || volunteerFound.howDidKnowOfSDR;

    const savedVolunteer = await volunteerFound.save();

    return res.status(200).json({
      message: 'Volunteer register successfully updated',
      savedVolunteer,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteVolunteer = async (req, res) => {
  try {
    const volunteerFound = await VolunteerSchema.findById(req.params.id);

    if (volunteerFound === null) {
      return res.status(404).json({
        message: 'It was not possible to delete the volunteer register',
        details: `There isn't a volunteer with the id: ${req.params.id}, in the database.`,
      });
    }

    await volunteerFound.delete();

    return res.status(200).json({
      message: `Volunteer: ${volunteerFound.email}, successfully deleted`,
      volunteerFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneVolunteerById = async (req, res) => {
  try {
    const volunteerFound = await VolunteerSchema.findById(req.params.id);

    if (volunteerFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the volunteer register',
        details: `There isn't a volunteer with the id: ${req.params.id}, in the database.`,
      });
    }

    return res.status(200).json({
      message: `Volunteer: -${volunteerFound.fullName}- successfully located.`,
      volunteerFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOneVolunteerByEmail = async (req, res) => {
  try {
    const volunteerFound = await VolunteerSchema.findOne({
      email: req.query.email,
    });

    if (volunteerFound === null) {
      return res.status(404).json({
        message: 'It was not possible to find the volunteer register',
        details: `There isn't a volunteer with the e-mail: ${req.query.email}, in the database.`,
      });
    }

    return res.status(200).json({
      message: `Volunteer: -${volunteerFound.fullName}- successfully located.`,
      volunteerFound,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllVolunteers = async (req, res) => {
  VolunteerSchema.find((error, volunteers) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
    return res.status(200).json(volunteers);
  });
};

module.exports = {
  createNewVolunteer,
  updateVolunteer,
  deleteVolunteer,
  getOneVolunteerById,
  getOneVolunteerByEmail,
  getAllVolunteers,
};
