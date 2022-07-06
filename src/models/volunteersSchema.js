const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true,
  },
  cellphoneNumberWithDDD: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
    enum: {
      MEDICO: 'MEDICO(A)',
      ENFERMEIRO: 'ENFERMEIRO(A)',
      FARMACEUTICO: 'FARMACEUTICO(A)',
      ESTUDANTE: 'ESTUDANTE',
    },
  },
  university: String,
  semester: {
    type: String,
    required: true,
    enum: {
      FIRST: '1',
      SECOND: '2',
      THIRD: '3',
      FOURTH: '4',
      FIFTH: '5',
      SIXTH: '6',
      SEVENTH: '7',
      EIGHTH: '8',
      NINTH: '9',
      TENTH: '10',
      MORE: '10+',
    },
  },
  specialty: String,
  listFreeDaysOfWeek: {
    type: [String],
    required: true,
    enum: {
      DOMINGO: 'DOMINGO',
      SEGUNDA: 'SEGUNDA',
      TERCA: 'TERÇA',
      QUARTA: 'QUARTA',
      QUINTA: 'QUINTA',
      SEXTA: 'SEXTA',
      SABADO: 'SÁBADO',
    },
  },
  timeOdExperience: {
    type: String,
    required: true,
  },
  howMuchParticipate: {
    type: String,
    required: true,
    enum: {
      NOT_PARTICIPATED: 'NOT',
      ONE_PARTICIPATION: '1',
      BETWEEN_TWO_AND_FIVE_PARTICIPATION: '2~5',
      MORE_THAN_FIVE_PARTICIPATION: '5+',
    },
  },
  howDidKnowOfSDR: {
    type: [String],
    required: true,
    enum: {
      SITE: 'SITE',
      INSTAGRAM: 'INSTAGRAM',
      POSTS: 'POSTS',
      EDUCATIONAL_INSTITUTIONS: 'INSTITUIÇÕES DE ENSINO',
      ANOTHER: 'OUTRO',
    },
  },
});

module.exports = mongoose.model('volunteer', volunteerSchema);
