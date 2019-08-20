import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { signup, confirmSignup } from './auth-service';

export default function Signup() {

  const [values, setValues] = React.useState({
    username: '',
    password: '',
    email: '',
    confirmationCode: '',
  })
  const [verified, setVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value
    });
  }

  const handleSubmit = e => {

    e.preventDefault();

    if(verified) {
      setLoading(true);
      confirmSignup(values.username, values.confirmationCode)
      .then(() => setLoading(false))
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
      setValues({
        ...values,
        confirmationCode: '',
        username: ''
      });
    } else {
      setLoading(true);
      signup(values.username, values.password, values.email)
      .then(data => {
        setLoading(false);
        setVerified(true);
      })
      .catch(err => {
        console.error(err);
        if(err.code === 'UsernameExistsException') setVerified(true);
        setLoading(false);
      });
      setValues({
        ...values,
        password: '',
        email: '',
      });
    }
    e.target.reset();
  }


  if (loading) return <p>Loading...</p>;
  if (verified) {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' onChange={ handleChange('name') }/>
        <label>Confirmation Code</label>
        <input type='text' onChange={ handleChange('confirmationCode') }/>
        <button>Confirm</button>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' onChange={ handleChange('username') }/>
        <label>Password</label>
        <input type='password' name='password' onChange={ handleChange('password') }/>
        <label>Email</label>
        <input type='text' name='email' onChange={ handleChange('email') }/>
        <button>Sign Up</button>
      </form>
    );
  }
}
