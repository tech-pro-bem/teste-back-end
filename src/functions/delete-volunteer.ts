import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { deleteVolunteerUseCase } from 'src/modules/Volunteers/useCases/delete-volunteer/delete-volunteer-factory'

interface IDeleteRequest {
  email: string
}
export const handler:APIGatewayProxyHandler = async (event) => {
  const { email } = JSON.parse(event.body) as IDeleteRequest

  const response: APIGatewayProxyResult = {
    isBase64Encoded: false,
    statusCode: 204,
    body: '',
    headers: {
      'content-type': 'application/json'
    }
  }

  try {
    await deleteVolunteerUseCase.execute(email)

    response.body = JSON.stringify({
      message: 'Successfully Deleted Volunteer!'
    })
  } catch (error) {
    response.statusCode = error.statusCode
    response.body = JSON.stringify({
      message: error.message
    })
  }
  return response
}
