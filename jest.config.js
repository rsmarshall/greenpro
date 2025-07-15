module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
};
