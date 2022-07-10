import { APIGatewayAuthorizerResult } from 'aws-lambda'
import { verify } from 'jsonwebtoken'
import { AppError } from 'src/helpers/errors/AppError'
import auth from 'src/utils/auth'

interface IPayload {
  sub: string;
}

function buildPolicy (effect: string, methodArn: string) {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn
      }
    ]
  }
}
export async function ensureAuthenticated (event: any): Promise<APIGatewayAuthorizerResult> {
  const authHeader = event.authorizationToken || undefined

  if (!authHeader) {
    console.log('aqui')
    throw new AppError('Token missing!', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload

    const result: APIGatewayAuthorizerResult = {
      principalId: user_id,
      policyDocument: buildPolicy('Allow', event.methodArn),
      context: {
        user: 1
      }
    }

    return result
  } catch {
    throw new AppError('Token expired!', 401)
  }
}
