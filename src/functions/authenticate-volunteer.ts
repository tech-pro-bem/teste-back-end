import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { authenticateVolunteerUseCase } from 'src/modules/Volunteers/useCases/authenticate-volunteer/authenticate-volunteer-factory'

interface ICreateVolunteerRequest {
  email: string;
  password: string;
}

export const handler:APIGatewayProxyHandler = async (event) => {
  const { email, password } = JSON.parse(event.body) as ICreateVolunteerRequest

  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 201,
    body: '',
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    const token = await authenticateVolunteerUseCase.execute({ email, password })

    response.body = JSON.stringify(token)
  } catch (error) {
    response.statusCode = error.statusCode
    response.body = JSON.stringify({
      message: error.message
    })
  }

  return response
}
