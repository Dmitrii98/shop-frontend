import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Snackbar, Container } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import './EditProfile.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const {
    id,
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    userName: userUserName,
    token,
  } = user;

  const regexpName = /^[A-zА]+$/;
  const regexpUser = /^[a-zA-Z0-9_]+$/;
  const regexpPassword = /^(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [firstName, setFirstName] = useState(userFirstName);
  const [lastName, setLastName] = useState(userLastName);
  const [email, setEmail] = useState(userEmail);
  const [userName, setUserName] = useState(userUserName);
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const editUser = async (newData) => {
    const authStr = `Bearer ${user.token}`;
    await axios
      .patch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/changeInformationAboutUser`,
        newData,
        {
          headers: { Authorization: authStr },
        }
      )
      .then((res) => {
        setAlert('success');
        setErrorText('The user is successfully created!');
        setError(true);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(res.data));
      });
  };

  const editUserFunc = () => {
    let userVal = false;
    let newData = {
      id: id
    };

    if (firstName !== userFirstName) {
      if (firstName.match(regexpName)) {
        newData.firstName = firstName;
        userVal = true;
      } else {
        userVal = false;
      }
    }

    if (lastName !== userLastName) {
      if (lastName.match(regexpName)) {
        newData.lastName = lastName;
        userVal = true;
      } else {
        userVal = false;
      }
    }

    if (email !== userEmail) {
      if (email.match(regexpEmail)) {
        newData.email = email;
        userVal = true;
      } else {
        userVal = false;
      }
    }

    if (userName !== userUserName) {
      if (userName.match(regexpUser)) {
        newData.userName = userName;
        userVal = true;
      } else {
        userVal = false;
      }
    }

    if (newPassword) {
      if (newPassword.match(regexpPassword) && newPassword === repeatPassword) {
        newData.password = newPassword;
        userVal = true;
      } else {
        userVal = false;
      }
    }

    if (userVal) {
      editUser(newData);
    } else {
      setAlert('error');
      setErrorText('Проверьте правильность введёных данных');
      setError(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const checkFirstName = (e) => {
    if (!firstName.match(regexpName)) {
      setAlert('error');
      setErrorText('The First Name must consist only of Latin letters');
      setError(true);
    } else {
      setAlert('success');
      setErrorText('The First Name is OK!');
      setError(true);
    }
  };

  const checkLastName = (e) => {
    if (!lastName.match(regexpName)) {
      setAlert('error');
      setErrorText('The Last Name must consist only of Latin letters');
      setError(true);
    } else {
      setAlert('success');
      setErrorText('The Last Name is OK!');
      setError(true);
    }
  };

  const checkEmail = (e) => {
    if (!email.match(regexpEmail)) {
      setAlert('error');
      setErrorText('E-mail is wrong!');
      setError(true);
    } else {
      setAlert('success');
      setErrorText('E-mail is OK!');
      setError(true);
    }
  };

  const checkUserName = (e) => {
    if (!userName.match(regexpUser)) {
      setAlert('error');
      setErrorText('The User Name must consist only of one string');
      setError(true);
    } else {
      setAlert('success');
      setErrorText('The User Name is OK!');
      setError(true);
    }
  };

  const checkPassword = (e) => {
    if (!newPassword.match(regexpPassword)) {
      setAlert('error');
      setErrorText(`
                The Password must contain:
                - at least 6 characters; 
                - only Latin characters; 
                - at least one digit;
                - at least one lowercase letter;
                - at least one capital letter.`);
      setError(true);
    } else {
      setAlert('success');
      setErrorText('The Password is OK!');
      setError(true);
    }
  };

  return (
    <Container fixed>
      <div className="edit">
        <div className="profil">
          <h2 className="profil-text">My profile</h2>
          <div className="input-fields">
            <p className="input-text">First name</p>
            <TextField
              className='edit-input'
              variant='outlined'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => checkFirstName()}
            />
          </div>

          <div className="input-fields">
            <p className="input-text">Last name</p>
            <TextField
              className='edit-input'
              variant='outlined'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => checkLastName()}
            />
          </div>

          <div className="input-fields">
            <p className="input-text">Email</p>
            <TextField
              type='email'
              className='edit-input'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => checkEmail()}
            />
          </div>

          <div className="input-fields">
            <p className="input-text">Username</p>
            <TextField
              className='edit-input'
              variant='outlined'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => checkUserName()}
            />
          </div>
        </div>

        <div className='change-pass'>
          <h3 className='profil-text'>Change password</h3>

          <div className='input-fields'>
            <p className='input-text'>New password</p>
            <TextField
              type='password'
              autoComplete='current-password'
              className='edit-input'
              variant='outlined'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onBlur={() => checkPassword()}
            />
          </div>

          <div className='input-fields'>
            <p className='input-text'>Repeat new password</p>
            <TextField
              type='password'
              autoComplete='current-password'
              className='edit-input'
              variant='outlined'
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              onBlur={() => checkPassword()}
            />
          </div>
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

      <div className="block-btns">
        <Link to="/home_page" class="cancel-link">
          <Button className="cancel-btn" variant="outlined">
            Cancel
          </Button>
        </Link>
        <Button
          className='save-btn'
          variant='outlined'
          onClick={() => editUserFunc()}
        >
          Save changes
        </Button>
      </div>
    </Container>
  );
};

export default EditProfile;