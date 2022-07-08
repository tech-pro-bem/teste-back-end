const VolunteerRepository = require('../repositories/Volunteer');
const security = require('../utils/security');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const signUp = async (name, email, password) => {

    try {

        const volunteerExists = await VolunteerRepository.findVolunteerByEmail(email);

        if (volunteerExists) {
            return {
                statusCode: 409,
                data: "Voluntário já cadastrado"
            }
        }

        if (!name || !email || !password) {
            return {
                statusCode: 400,
                data: "Não foi possível criar o cadastro de voluntário. Os parâmetros não foram inseridos corretamente"
            }
        }
        const encryptedPassword = security.encrypt(password);
        const volunteer = await VolunteerRepository.signUp(name, email, encryptedPassword);

        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: 3000 });

        const data = { auth: true, token: token, user: volunteer };
        return {
            statusCode: 200,
            data: data
        }

    } catch (error) {
        console.error(error)
        return {
            statusCode: 500,
            data: error
        }
    }
}

const authenticate = async (email, password) => {
    try {
        const volunteer = await VolunteerRepository.findVolunteerByEmail(email);
        console.log(volunteer)

        if (volunteer) {
            const hash = volunteer.password;
            const verifyPassword = security.verifyPassword(password, hash);
            if (!verifyPassword) {
                return {
                    statusCode: 500,
                    data: "senha inválida"
                }
            }
        } else {
            return {
                statusCode: 400,
                data: "Voluntário não encontrado"
            }
        }

        if (!(email && password)) {
            return {
                statusCode: 400,
                data: "Email ou Senha não informado"
            }
        }

        const token = jwt.sign({ email: email }, process.env.SECRET_KEY, { expiresIn: 3000 });

        const data = { auth: true, token: token, user: volunteer };
        return {
            statusCode: 200,
            data: data
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            data: error
        }
    }
}

const findVolunteers = async () => {
    try {

        let volunteers = await VolunteerRepository.findVolunteers();

        if (!volunteers) {
            return {
                statusCode: 404,
                data: 'Nenhum usuário encontrado!'
            }
        }
        return {
            statusCode: 200,
            data: volunteers
        }

    } catch (error) {
        return {
            statusCode: 500,
            data: error
        }
    }
}

const findVolunteerByEmail = async (email) => {
    try {
        const volunteer = await VolunteerRepository.findVolunteerByEmail(email);
        return {
            statusCode: 200,
            data: volunteer
        }

    } catch (error) {
        return {
            statusCode: 500,
            data: error
        }
    }
}

const deleteVolunteer = async (email) => {
    const userExists = await VolunteerRepository.findVolunteerByEmail(email);

    try {
        if (!userExists) {
            return {
                statusCode: 409,
                data: "Voluntário não encontrado"
            }
        }

        const volunteer = await VolunteerRepository.deleteVolunteer(email)
        return {
            statusCode: 200,
            data: "Voluntário deletado com sucesso"
        }
    } catch (error) {
        return {
            statusCode: 500,
            data: error
        }
    }
}

const updatePassword = async (email, password) => {
    const userExists = await VolunteerRepository.findVolunteerByEmail(email);

    try {
        if (!userExists) {
            return {
                statusCode: 409,
                data: "Voluntário não encontrado"
            }
        }

        const encryptedPassword = security.encrypt(password);
        const updatedPassword = await VolunteerRepository.updatePassword(email, encryptedPassword)
        return {
            statusCode: 200,
            data: updatedPassword
        }

    } catch (error) {
        return {
            statusCode: 500,
            data: error
        }
    }
}

module.exports = {
    signUp,
    findVolunteers,
    findVolunteerByEmail,
    deleteVolunteer,
    updatePassword, 
    authenticate
}