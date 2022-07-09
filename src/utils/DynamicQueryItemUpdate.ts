export const dynamicQueryItemUpdate = (fields) => {
  const exp = {
    UpdateExpression: "set",
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {},
  };

  Object.entries(fields).forEach(([key, item]) => {
    exp.UpdateExpression += ` #${key} = :${key},`;
    exp.ExpressionAttributeNames[`#${key}`] = key;
    exp.ExpressionAttributeValues[`:${key}`] = item;
  });

  exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);
  return exp;
};
