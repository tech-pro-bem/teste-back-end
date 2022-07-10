interface ICreateVolunteerTokenResponseDTO {
  volunteer: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

export { ICreateVolunteerTokenResponseDTO }
