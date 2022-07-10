import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { IUpdateVolunteerRequestDTO } from 'src/modules/Volunteers/dtos/IUpdateVolunteerRequestDTO'
import { updateVolunteerUseCase } from 'src/modules/Volunteers/useCases/update-volunteer/update-volunteer-factory'

export const handler:APIGatewayProxyHandler = async (event) => {
  const { email, newName, newPassword } = JSON.parse(event.body) as IUpdateVolunteerRequestDTO

  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 204,
    body: '',
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    await updateVolunteerUseCase.execute({ email, newName, newPassword })

    response.body = JSON.stringify({
      message: 'Successfully Updated Volunteer!'
    })
  } catch (error) {
    response.statusCode = error.statusCode
    response.body = JSON.stringify({
      message: error.message
    })
  }

  return response
}
