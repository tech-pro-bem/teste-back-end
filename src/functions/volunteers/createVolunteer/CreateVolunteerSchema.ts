export default {
  type: "object",
  properties: {
    fullName: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" }
  },
  required: ["fullName", "email", "phoneNumber"]
} as const;
