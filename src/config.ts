/* eslint-disable no-process-env */

const getEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return value;
};

export const config = {
  PORT: getEnvVariable('PORT'),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  JWT_SECRET: getEnvVariable('JWT_SECRET'),
} as const;
