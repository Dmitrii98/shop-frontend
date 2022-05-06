import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import './ModalDeleteStylesProduct.scss';

function ModalDeleteProduct(
  {
    close,
    open,
    product
  }) {
  const history = useHistory();

  const deleteItem = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products`,
        {
          headers: {'Authorization': `Bearer ${admin.token}`},
          data: {productId: product.id}
        }
      ).then(res => {
        close();
        history.push('/admin_page');
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
            product {product ? product.name : ''}
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

export default ModalDeleteProduct;
