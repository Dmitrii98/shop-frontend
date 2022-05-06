import React from 'react';
import Header from '../Header/Header';
import EditProfile from './EditProfile/EditProfile';
import './Profile.scss';

const Profile = () => {
  return (
    <div className='home'>
      <Header />
      <EditProfile />
    </div>
  );
}

export default Profile;