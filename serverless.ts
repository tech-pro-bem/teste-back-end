import type { AWS } from "@serverless/typescript";

import createVolunteer from "@volunteers/handlers/createVolunteer";
import findVolunteer from "@volunteers/handlers/findVolunteer";
import deleteVolunteer from "@volunteers/handlers/deleteVolunteer";
import updateVolunteer from "@volunteers/handlers/updateVolunteer";
import loginAdmin from "@auth/handlers/loginAdmin";

export const region = "sa-east-1";

const serverlessConfiguration: AWS = {
  service: "teste-back-end",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:Query", "dynamodb:PutItem"],
            Resource: `arn:aws:dynamodb:${region}:*:table/users`,
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    createVolunteer,
    findVolunteer,
    deleteVolunteer,
    updateVolunteer,
    loginAdmin,
  },
  package: { individually: true },
  custom: {
    dynamodb: {
      stages: ["dev"],
      start: {
        inMemory: true,
        migrate: true,
        seed: true,
      },
      seed: {
        admins: {
          sources: [
            {
              table: "users",
              sources: ["./src/shared/dynamodb/seeders/AdminSeeder.json"],
            },
          ],
        },
      },
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      volunteersChallenge: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "users",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
          GlobalSecondaryIndexes: [
            {
              IndexName: "email_index",
              Projection: {
                ProjectionType: "ALL",
              },
              ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
              },
              KeySchema: [
                {
                  AttributeName: "email",
                  KeyType: "HASH",
                },
              ],
            },
          ],
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
