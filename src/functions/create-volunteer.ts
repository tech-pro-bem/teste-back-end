import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { ICreateVolunteerRequestDTO } from 'src/modules/Volunteers/dtos/ICreateVolunteerRequestDTO'
import { createVolunteerUseCase } from 'src/modules/Volunteers/useCases/create-volunteer/create-volunteer-factory'

export const handler:APIGatewayProxyHandler = async (event) => {
  const { name, email, password } = JSON.parse(event.body) as ICreateVolunteerRequestDTO

  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 201,
    body: '',
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    await createVolunteerUseCase.execute({ name, email, password })

    response.body = JSON.stringify({
      message: 'Successfully Created Volunteer!'
    })
  } catch (error) {
    response.statusCode = error.statusCode
    response.body = JSON.stringify({
      message: error.message
    })
  }

  return response
}
