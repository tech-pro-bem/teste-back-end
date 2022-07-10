import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda'
import { ensureAuthenticated } from 'src/middleware/ensureAuthenticated'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handler = async (
  event: APIGatewayAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  let response: APIGatewayAuthorizerResult
  try {
    response = await ensureAuthenticated(event)
  } catch (error) {
    console.log(error)
  }

  return response
}
