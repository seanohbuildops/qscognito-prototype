import { Auth } from 'aws-amplify';

export const signup = async (username, password, email) => {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email
    }
  });
};

export const confirmSignup = async (username, code) => {
  return Auth.confirmSignUp(username, code);
};
