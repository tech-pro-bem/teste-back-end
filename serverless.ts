import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'test-back-end',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dynamodb-local',
    'serverless-middleware',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    httpApi: {
      cors: true,
      authorizers: {
        jwtAuthenticateLambda: {
          type: 'request',
          functionName: 'authenticateProxy'
        }
      }
    }
  },
  // import the function via paths
  functions: {
    authenticateProxy: {
      name: 'lambda-authenticate',
      handler: "src/functions/authenticate-volunteer-proxy.handler"
    },
    createVolunteer: {
      handler: "src/functions/create-volunteer.handler",
      events: [
        {
          http: {
            path: "/create/volunteer",
            method: "post",

            cors: true
          }
        }
      ]
    },
    showOneVolunteer: {
      handler: "src/functions/show-one-volunteer.handler",
      events: [
        {
          http: {
            path: "/show/volunteer/{email}",
            method: "get",

            cors: true,
            authorizer: {
              name: "authenticateProxy"
            }
          }
        }
      ]
    },
    updateVolunteer: {
      handler: "src/functions/update-volunteer.handler",
      events: [
        {
          http: {
            path: "/update/volunteer",
            method: "put",

            cors: true,
          }
        }
      ]
    },
    deleteVolunteer: {
      handler: "src/functions/delete-volunteer.handler",
      events: [
        {
          http: {
            path: "/delete/volunteer",
            method: "delete",

            cors: true,
          }
        }
      ]
    },
    authenticateVolunteer: {
      handler: "src/functions/authenticate-volunteer.handler",
      events: [
        {
          http: {
            path: "/authenticate/volunteer",
            method: "post",

            cors: true,
          }
        }
      ]
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      }
    }
  },
  resources: {
    Resources: {
      dbVolunteersTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "volunteers",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH"
            }
          ]
        }
      },
      dbVolunteersTokenTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "volunteers_token",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S"
            },
            {
              AttributeName: "volunteer_id",
              AttributeType: "S"
            },
            {
              AttributeName: "refresh_token",
              AttributeType: "S"
            }
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH"
            }
          ],
          GlobalSecondaryIndexes: [
            {
              IndexName: "VolunteerId",
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              },
              KeySchema: [
                {
                  AttributeName: "volunteer_id",
                  KeyType: "HASH"
                }
              ],
              Projection: {
                ProjectionType: "ALL"
              }
            },
            {
              IndexName: "RefreshToken",
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
              },
              KeySchema: [
                {
                  AttributeName: "refresh_token",
                  KeyType: "HASH"
                }
              ],
              Projection: {
                ProjectionType: "ALL"
              }
            }
          ]
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
