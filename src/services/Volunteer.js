const VolunteerRepository = require('../repositories/Volunteer');

const signUp = async (body) => {
    const {name, email, password} = body;

    try {
        if(!name || !email || !password){
            return {
                statusCode: 400,
                data:  "Não foi possível criar o usuário. Os parâmetros não foram inseridos corretamente"
            }
        }

        let volunteer = await VolunteerRepository.signUp(body);
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

module.exports = {
    signUp
}