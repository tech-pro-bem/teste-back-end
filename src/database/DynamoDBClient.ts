import { DynamoDB } from "aws-sdk";

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

export const dynamo = isOffline()
  ? new DynamoDB.DocumentClient(localParams)
  : new DynamoDB.DocumentClient();
