import React from 'react';
import AdminHeader from './AdminHeader/AdminHeader';
import Dashboard from './Dashboard/Dashboard';
import './AdminPage.scss';

const AdminPage = () => {
  return (
    <div className='view-product'>
      <AdminHeader/>
      <Dashboard/>
    </div>
  );
}

export default AdminPage;
