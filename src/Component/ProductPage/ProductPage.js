import React from 'react';
import Header from '../Header/Header';
import ViewProduct from './ViewProduct/ViewProduct';
import './ProductPage.scss';

const ProductPage = () => {
  return (
    <div className='view-product'>
      <Header/>
      <ViewProduct/>
    </div>
  );
}

export default ProductPage;
