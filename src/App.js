import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import Button from '@material-ui/core/button';

Amplify.configure(awsconfig);

function App() {

  const [signingOut, setSigningOut] = React.useState(false);

  const logout = (e) => {
    setSigningOut(true);
    Auth.signOut()
      .catch(err => {
        console.log(err);
        setSigningOut(false);
      });
  }

  if (signingOut) return <p>Signing out...</p>;
  return (
    <Button variant='contained' onClick={logout}>
      Log Out
    </Button>
  );
}

export default withAuthenticator(App);
