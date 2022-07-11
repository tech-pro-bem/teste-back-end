import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { showOneVolunteerUseCase } from 'src/modules/Volunteers/useCases/show-one-volunteer/show-one-volunteer-factory'

export const handler:APIGatewayProxyHandler = async (event) => {
  const email = event.pathParameters.email

  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 200,
    body: '',
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    const showOneVolunteerResponse = await showOneVolunteerUseCase.execute(email)

    response.body = JSON.stringify(showOneVolunteerResponse)
  } catch (error) {
    response.statusCode = error.statusCode
    response.body = JSON.stringify({
      message: error.message
    })
  }

  return response
}
