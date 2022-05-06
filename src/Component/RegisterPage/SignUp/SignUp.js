import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Button,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import PasswordInput from '../../PasswordInput/PasswordInput';
import './SignUp.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const SignUp = () => {
  const history = useHistory();
  const regexpName = /^[A-zА]+$/;
  const regexpUser = /^[a-zA-Z0-9_]+$/;
  const regexpPassword = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);

  const registerUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/registration`, {
        firstName,
        lastName,
        userName,
        email,
        password
      });
      setAlert('success');
      setErrorText('The user is successfully created!');
      setError(true);
      localStorage.setItem('user', JSON.stringify(res.data));
      history.push('/home_page');
    } catch (e) {
      setAlert('error');
      setErrorText('Such user already exists!');
      setError(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  }

  const checkFirstName = (e) => {
    if (!firstName.match(regexpName)) {
      setAlert('error');
      setErrorText('The First Name must consist only of Latin letters');
      setError(true);
      setFirstNameError(true)
    } else {
      setAlert('success');
      setErrorText('The First Name is OK!');
      setError(true);
      setFirstNameError(false);
    }
  }

  const checkLastName = (e) => {
    if (!lastName.match(regexpName)) {
      setAlert('error');
      setErrorText('The Last Name must consist only of Latin letters');
      setError(true);
      setLastNameError(true)
    } else {
      setAlert('success');
      setErrorText('The Last Name is OK!');
      setError(true);
      setLastNameError(false);
    }
  }

  const checkUserName = (e) => {
    if (!userName.match(regexpUser)) {
      setAlert('error');
      setErrorText('The User Name must consist only of one string');
      setError(true);
      setUserNameError(true);
    } else {
      setAlert('success');
      setErrorText('The User Name is OK!');
      setError(true);
      setUserNameError(false);
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
    || password !== repeatPassword
    || !email.match(regexpEmail)
    || !userName.match(regexpUser)
    || !lastName.match(regexpName)
    || !firstName.match(regexpName);

  return (
    <div className='main'>
      <div className='sign-up'>
        <h2 className='header-text'>Create Account</h2>
        <div className='input-fields'>
          <p className='input-text'>First Name:</p>
          <TextField
            className={firstNameError ? 'input-error' : 'input'}
            placeholder='First Name'
            variant='outlined'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={() => checkFirstName()}
          />
          {firstNameError && <p className='input-text-error'>First name is not correct</p>}
        </div>
        <div className='input-fields'>
          <p className='input-text'>Last Name:</p>
          <TextField
            className={lastNameError ? 'input-error' : 'input'}
            placeholder='Last Name'
            variant='outlined'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={() => checkLastName()}
          />
          {lastNameError && <p className='input-text-error'>Last name is not correct</p>}
        </div>
        <div className='input-fields'>
          <p className='input-text'>User Name:</p>
          <TextField
            className={userNameError ? 'input-error' : 'input'}
            placeholder='User Name'
            variant='outlined'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onBlur={() => checkUserName()}
          />
          {userNameError && <p className='input-text-error'>User name is not correct</p>}
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
        <div className='input-fields'>
          <p className='input-text'>Repeat Password:</p>
          <PasswordInput
            checkPassword={checkRepeatPassword}
            repeatPasswordError={repeatPasswordError}
            placeholder='Repeat Password'
            value={repeatPassword}
            setValue={setRepeatPassword}
          />
          {repeatPasswordError && <p className='input-text-error'>Repeat password is not the same</p>}
        </div>
        <div className='buttons'>
          <Link to='/login'>
            <Button className='sign-in-btn'>
              Sign In
            </Button>
          </Link>
          <Button
            className='sign-up-btn'
            variant='outlined'
            disabled={checkDisabled}
            onClick={() => registerUser()}
          >
            Sign Up
          </Button>
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

export default SignUp;
