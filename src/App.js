import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import Signup from './auth/Signup';

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Signup/>
      </header>
    </div>
  );
}

export default App;
