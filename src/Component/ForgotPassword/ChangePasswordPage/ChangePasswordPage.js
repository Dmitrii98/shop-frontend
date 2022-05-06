import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PasswordInput from '../../PasswordInput/PasswordInput';
import './ChangePasswordPage.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const ChangePasswordPage = () => {
  const history = useHistory();
  const regexpPassword = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  }

  const resetPassword = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/forgotPassword`, {password}, {
        'headers': {'Authorization': `Bearer ${token}`}
      });
      localStorage.removeItem('token');
      localStorage.setItem('user', JSON.stringify(res.data));
      history.push('/home_page');
    } catch (e) {
      setAlert('error');
      setErrorText('Password is wrong!');
      setError(true);
    }
  }

  const checkPassword = (e) => {
    if (!password.match(regexpPassword)) {
      setAlert('error');
      setErrorText(`
                Password must contain:
                - at least 6 characters; 
                - only Latin characters; 
                - at least one digit;
                - at least one lowercase letter;
                - at least one capital letter.`);
      setError(true);
      setPasswordError(true);
    } else {
      setAlert('success');
      setErrorText(`The Password is OK`);
      setError(true);
      setPasswordError(false);
    }
  }

  const checkRepeatPassword = (e) => {
    if (password !== repeatPassword) {
      setAlert('error');
      setErrorText('The Passwords are no the same!');
      setError(true);
      setRepeatPasswordError(true);
    } else {
      setAlert('success');
      setErrorText('The Passwords are the same!');
      setError(true);
      setRepeatPasswordError(false);
    }
  }

  let checkDisabled = !password.match(regexpPassword)
    || password !== repeatPassword;

  return (
    <div className='main'>
      <div className='change-password-page'>
        <h2 className='header-text'>Forgot Password</h2>
        <div className='input-fields'>
          <p className='forgot-password-text'>Enter your new password</p>
        </div>
        <div className='input-fields'>
          <p className='input-text-forgot-page'>New Password:</p>
          <PasswordInput
            checkPassword={checkPassword}
            passwordError={passwordError}
            placeholder='Password'
            value={password}
            setValue={setPassword}
          />
          {passwordError && <p className='input-text-error'>Password is not valid</p>}
        </div>
        <div className='input-fields'>
          <p className='input-text-forgot-page'>Repeat New Password:</p>
          <PasswordInput
            checkPassword={checkRepeatPassword}
            repeatPasswordError={repeatPasswordError}
            placeholder='Repeat Password'
            value={repeatPassword}
            setValue={setRepeatPassword}
          />
          {repeatPasswordError && <p className='input-text-error'>Repeat password is not the same</p>}
        </div>
        <div className='login'>
          <Button
            className='reset-btn'
            variant='outlined'
            disabled={checkDisabled}
            onClick={() => resetPassword()}
          >
            Reset password
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
export default ChangePasswordPage;