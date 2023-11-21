export const jwtServiceMock = {
  verifyAsync: jest.fn(),
};

export const authGuardMockFactory = () => {
  return {
    canActivate: jest.fn(),
    jwtService: jwtServiceMock,
  };
};
