import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './EmailPage.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const EmailPage = (props) => {
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [mailError, setMailError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  }

  const emailRequest = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/forgotPassword`, {
        email
      });
      localStorage.setItem('token', res.data.token);
      props.setCheckEmail(true);
    } catch (e) {
      setAlert('error');
      setErrorText('Email is wrong!');
      setError(true);
    }
  }

  const checkEmail = (e) => {
    if (!email.match(regexpEmail)) {
      setAlert('error');
      setErrorText(`Example: jsmith@example.com`);
      setError(true);
      setMailError(true);
    } else {
      setMailError(false);
      setAlert('success');
      setErrorText(`The E-mail is OK`);
      setError(true);
    }
  }

  let checkDisabled = !email.match(regexpEmail);

  return (
    <div className='main'>
      <div className='email-page'>
        <h2 className='header-text'>Forgot Password</h2>
        <div className='input-fields'>
          <p className='forgot-password-text'>
            Enter the email address associated with your account and follow
            the following instructions to reset your password
          </p>
        </div>
        <div className='input-fields'>
          <p className='input-text'>Email:</p>
          <TextField
            type='email'
            className={mailError ? 'input-error' : 'input'}
            placeholder='Email'
            variant='outlined'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
          />
          {mailError && <p className='input-text-error'>Email is not correct</p>}
        </div>
        <div className='next'>
          <Button
            className='next-btn'
            variant='outlined'
            disabled={checkDisabled}
            onClick={() => emailRequest()}
          >
            Next
          </Button>
        </div>
        <div className='buttons'>
          <Link to='/login'>
            <Button className='sign-in-forgot-page-btn'>
              Sign In
            </Button>
          </Link>
          <Link to='/registration'>
            <Button className='sign-up-forgot-page-btn'>
              Sign Up
            </Button>
          </Link>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity={alert}>{errorText}</Alert>
        </Snackbar>
      </div>
    </div>
  );
}
export default EmailPage;