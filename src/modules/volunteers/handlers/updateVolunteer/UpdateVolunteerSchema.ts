export default {
  type: "object",
  properties: {
    fullName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    password: { type: "string" },
  },
  required: [],
} as const;
