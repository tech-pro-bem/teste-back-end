import { DynamoDB } from "aws-sdk";
import { Table } from "dynamodb-onetable";

const localParams: DynamoDB.DocumentClient.DocumentClientOptions &
  DynamoDB.Types.ClientConfiguration = {
  region: "localhost",
  endpoint: "http://localhost:8000",
  credentials: {
    secretAccessKey: "local",
    accessKeyId: "local",
  },
};

const isOffline = () => {
  return process.env.IS_OFFLINE;
};

const dynamo = isOffline()
  ? new DynamoDB.DocumentClient(localParams)
  : new DynamoDB.DocumentClient();

export const ONE_TABLE_SCHEMA = {
  format: "onetable:1.1.0",
  version: "0.0.1",
  indexes: {
    primary: { hash: "id" },
    email_index: { hash: "email" },
  },
  models: {
    Volunteer: {
      id: { type: String, required: true },
      email: { type: String, required: true },
      fullName: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      password: { type: String, required: true },
    },
    Admin: {
      id: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    },
  } as const,
};

export const onetable = new Table({
  client: dynamo,
  name: "users",
  schema: ONE_TABLE_SCHEMA,
});
