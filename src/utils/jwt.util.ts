import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateRefreshToken = (data: any) => {
  const token = jwt.sign(
    data, // Payload
    (process.env.JWT_REFRESH_TOKEN_CODE as string) || 'myjwtrefreshtoken', // Secret Key
    {
      expiresIn: (process.env.JWT_REFRESH_TOKEN_EXPIRY as string) || '7d', // Token will expire in 7 days
    },
  );
  return token;
};

export { generateRefreshToken };
