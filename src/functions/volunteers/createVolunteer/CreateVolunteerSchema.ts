export default {
  type: "object",
  properties: {
    fullName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    phoneNumber: { type: "string" },
  },
  required: ["fullName", "email", "phoneNumber", "password"],
} as const;
