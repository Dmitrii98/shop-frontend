import React from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import RegisterPage from './Component/RegisterPage/RegisterPage';
import LoginPage from './Component/LoginPage/LoginPage';
import ForgotPassword from './Component/ForgotPassword/ForgotPassword';
import HomePage from './Component/HomePage/HomePage';
import Profile from './Component/Profile/Profile';
import ProductPage from './Component/ProductPage/ProductPage';
import AdminPage from './Component/AdminPage/AdminPage';
import EditPage from "./Component/AdminPage/EditPage/EditPage";
import './App.scss';

const App = () => {
  const checkUserRoute = () => {
    return !localStorage.getItem('user');
  }

  const checkAdminRoute = () => {
    return !localStorage.getItem('admin');
  }

  return (
    <div className='App'>
      <Switch>
        <Route path='/login'>
          <LoginPage/>
        </Route>
        <Route path='/registration'>
          <RegisterPage/>
        </Route>
        <Route path='/forgot_password'>
          <ForgotPassword/>
        </Route>
        <Route
          path='/home_page'
          render={() => checkUserRoute() ? <Redirect to='/login'/> : <HomePage/>}
        />
        <Route
          path='/product/:id'
          render={() => checkUserRoute() ? <Redirect to='/login'/> : <ProductPage/>}
        />
        <Route path='/basket'>
          {/*<Template/>*/}
        </Route>
        <Route
          path='/profile'
          render={() => checkUserRoute() ? <Redirect to='/login'/> : <Profile/>}
        />
        <Route
          path='/admin_page'
          render={() => checkAdminRoute() ? <Redirect to='/login'/> : <AdminPage/>}
        />
        <Route path='/create_product'>
          {/*<Template/>*/}
        </Route>
        <Route
          path='/edit_product/:id'
          render={() => checkAdminRoute() ? <Redirect to='/login'/> : <EditPage/>}
        />
        {(!localStorage.getItem('admin') || !localStorage.getItem('user')) && <Redirect from='' to='/login'/>}
      </Switch>
    </div>
  );
}

export default App;