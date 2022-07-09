export const generatePolicy = (principalId, effect, resource) => {
  let authResponse;
  if (effect && resource) {
    const policyDocument = {
      Version: "2012-10-17",
      Statement: [],
    };
    const statementOne = {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    };
    policyDocument.Statement.push(statementOne);
    authResponse = {
      principalId,
      policyDocument,
    };
  }
  return authResponse;
};
