import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../RegisterPage/SignUp/SignUp';
import SignIn from '../LoginPage/SignIn/SignIn';
import EmailPage from '../ForgotPassword/EmailPage/EmailPage';
import ChangePasswordPage from '../ForgotPassword/ChangePasswordPage/ChangePasswordPage';
import WrapperImg from '../../Source/images/wrapper-img.png';
import './Wrapper.scss';

const Wrapper = () => {
  const [checkEmail, setCheckEmail] = useState(false);

  return (
    <div className='wrapper'>
      <header className='header-wrapper'>
        <h1 className='header-text'>Welcome to <span>E’Shop!</span></h1>
      </header>
      <div className='container'>
        <img src={WrapperImg} alt='wrapper-img'/>
        <div className='innerWrapper'>
          <Switch>
            <Route path='/registration'>
              <SignUp/>
            </Route>
            <Route path='/login'>
              <SignIn/>
            </Route>
            <Route path='/forgot_password'>
              {checkEmail
                ? <ChangePasswordPage/>
                : <EmailPage setCheckEmail={setCheckEmail}/>
              }
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Wrapper;
