import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import {
  Button,
  ButtonGroup,
  Container,
  TextField,
  TextareaAutosize
} from '@material-ui/core';
import ModalDeleteProduct from "../../Dashboard/ModalPageDeleteProduct/ModalDeleteProduct";
import BackButton from '../../../../Source/images/return-button.png';
import ProductPicture from '../../../../Source/images/product-picture.png';
import UploadNewPicture from '../../../../Source/images/upload-new-image.svg';
import { ReactComponent as DeleteIcon } from '../../../../Source/images/delete-icon-edit-page.svg';
import './EditProduct.scss';

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const id = window.location.pathname.substr(14);
  const [openDelete, setOpenDelete] = React.useState(false);

  const getAllProducts = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products/${id}`,
        {
          headers: {'Authorization': `Bearer ${admin.token}`},
        }).then(res => {
        setProduct(res.data);
      });
    } catch (e) {
      console.log('Error');
    }
  }

  const saveChanging = async () => {
    const body = new FormData();
    for (let key in product) {
      body.append(key, product[key])
    }
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products`,
        body,
        {
          headers: {
            'Authorization': `Bearer ${admin.token}`,
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
        setProduct(res.data);
      });
    } catch (e) {
      console.log('Error');
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  const changeField = (key, value) => {
    const editField = {...product};
    switch (key) {
      case 'date':
        value = new Date(value);
    }
    editField[key] = value;
    setProduct(editField);
  }

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
    <Container fixed>
      <div className='main-edit-product'>
        <div className='left-side'>
          <Link to='/admin_page'>
            <img
              className='back-to-admin-page-img'
              src={BackButton}
              alt='back-button'
            />
          </Link>
          <img
            className='product-edit-picture'
            src={ProductPicture}
            alt='product-picture'
          />
          <div className='upload-new-image'>
            <Button className='upload-btn'>
              <img src={UploadNewPicture} alt='upload-new-image'/>
              Upload new picture
            </Button>
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Date created:</p>
            <TextField
              type='date'
              className='input-edit description'
              variant='outlined'
              value={moment(product.updatedAt).format('YYYY-MM-DD')}
              onChange={(e) => changeField('updatedAt', e.target.value)}
            />
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Visible product:</p>
            <ButtonGroup disableElevation variant='contained'>
              <Button className={`visible-btn ${product.visibility ? 'off' : 'on'}`}
                      onClick={() => changeField('visibility', !product.visibility)}
              >
                Off
              </Button>
              <Button className={`visible-btn ${product.visibility ? 'on' : 'off'}`}
                      onClick={() => changeField('visibility', !product.visibility)}
              >
                On
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className='right-side'>
          <div className='name-product'>
            <h2 className='header-name-product'>Edit product</h2>
            <Button className='delete-product-btn' onClick={() => handleClickOpenDelete()}>
              <DeleteIcon/>
            </Button>
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Name:</p>
            <TextField
              type='text'
              className='input-edit'
              variant='outlined'
              value={product.name}
              onChange={(e) => changeField('name', e.target.value)}
            />
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Description:</p>
            <TextareaAutosize
              rows={7}
              type='text'
              className='input-edit description'
              variant='outlined'
              value={product.description}
              onChange={(e) => changeField('description', e.target.value)}
            />
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Price:</p>
            <TextField
              type='number'
              className='input-edit'
              variant='outlined'
              value={product.price}
              onChange={(e) => changeField('price', e.target.value)}
            />
          </div>
          <div className='edit-product-field'>
            <p className='edit-product-text'>Number of available products:</p>
            <TextField
              type='number'
              className='input-edit'
              variant='outlined'
              value={product.quantity}
              onChange={(e) => changeField('quantity', e.target.value)}
            />
          </div>
          <div className='block-btns-edit-product'>
            <Link to='/admin_page' class='back-link'>
              <Button className='back-btn' variant='outlined'>
                Cancel
              </Button>
            </Link>
            <Button
              className='save-btn-edit-product'
              variant='outlined'
              onClick={() => saveChanging()}
            >
              Save
            </Button>
          </div>
        </div>
        <ModalDeleteProduct
          close={handleCloseDelete}
          open={openDelete}
          product={product}
        />
      </div>
    </Container>
  );
};

export default EditProduct;