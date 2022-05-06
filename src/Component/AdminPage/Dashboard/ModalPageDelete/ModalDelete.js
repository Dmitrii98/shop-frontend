import React from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import './ModalDeleteStyles.scss';

function ModalDelete(
  {
    close,
    open,
    indexEdit,
    setIndexEdit,
    products,
    setProducts
  }) {
  const deleteItem = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products`,
        {
          headers: {'Authorization': `Bearer ${admin.token}`},
          data: {productId: products[indexEdit].id}
        }
      ).then(res => {
        const cloneProducts = [...products];
        cloneProducts.splice(indexEdit, 1);
        setProducts(cloneProducts);
        setIndexEdit(-1);
        close();
      })
    } catch (e) {
      console.log('Error');
    }
  }

  return (
    <div className='Modal'>
      <Dialog
        open={open}
        onClose={() => close()}
        aria-labelledby='form-dialog-title'
        className='dialog'
      >
        <DialogTitle id='form-dialog-title'>Delete product</DialogTitle>
        <DialogContent className='dialog-content'>
          <p className='text'>
            Are you sure you want to remove this
            product {products[indexEdit] ? products[indexEdit].name : ''}
          </p>
        </DialogContent>
        <DialogActions className='btns'>
          <Button
            onClick={() => close()}
            variant='outlined'
            className='cancel-btn'
          >
            Cancel
          </Button>
          <Button
            className='delete-btn'
            variant='outlined'
            onClick={() => deleteItem()}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDelete;
