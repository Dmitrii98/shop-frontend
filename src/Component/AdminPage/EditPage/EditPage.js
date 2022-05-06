import React from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import EditProduct from './EditProduct/EditProduct';

const EditPage = () => {
  return (
    <div className='view-product'>
      <AdminHeader/>
      <EditProduct/>
    </div>
  );
}

export default EditPage;
