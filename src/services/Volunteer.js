const VolunteerRepository = require('../repositories/Volunteer');

const signUp = async (body) => {
    const { name, email, password } = body;

    const volunteerExists = await VolunteerRepository.findVolunteerByEmail(email)

    try {

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

        const volunteer = await VolunteerRepository.signUp(body);
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

        const updatedPassword = await VolunteerRepository.updatePassword(email, password)
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
    updatePassword
}