import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PasswordInput from '../../PasswordInput/PasswordInput';
import './SignIn.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignIn = () => {
  const history = useHistory();
  const regexpPassword = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/login`, {
        email,
        password
      });
      if (res.data.isAdmin) {
        localStorage.setItem('admin', JSON.stringify(res.data));
        history.push('/admin_page');
      } else {
        localStorage.setItem('user', JSON.stringify(res.data));
        history.push('/home_page');
      }
    } catch (e) {
      setAlert('error');
      setErrorText('E-mail or password is wrong');
      setError(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
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
      setPasswordError(false);
    }
  }

  let checkDisabled = !password.match(regexpPassword)
    || !email.match(regexpEmail);

  return (
    <div className='main'>
      <div className='sign-in'>
        <h2 className='header-text'>Sign In</h2>
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
        <div className='input-fields'>
          <p className='input-text'>Password:</p>
          <PasswordInput
            checkPassword={checkPassword}
            passwordError={passwordError}
            placeholder='Password'
            value={password}
            setValue={setPassword}
          />
          {passwordError && <p className='input-text-error'>Password is not valid</p>}
        </div>
        <div className='login'>
          <Button
            className='login-btn'
            variant='outlined'
            disabled={checkDisabled}
            onClick={() => loginUser()}
          >
            Login
          </Button>
        </div>
        <div className='buttons'>
          <Link to='/registration'>
            <Button className='create-acc-btn'>
              Create Account
            </Button>
          </Link>
          <p className='text-between-btn'>Or</p>
          <Link to='/forgot_password'>
            <Button
              className='forgot-password-btn'
            >
              Forgot Password?
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

export default SignIn;
