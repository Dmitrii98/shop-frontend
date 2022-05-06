import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Container,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import BackButton from '../../../Source/images/return-button.png';
import ProductPicture from '../../../Source/images/product-picture.png';
import { ReactComponent as FavoriteProduct } from '../../../Source/images/favoriteProduct.svg';
import { ReactComponent as FilledFavoriteProduct } from '../../../Source/images/filledFavoriteProduct.svg';
import IncreaseCountProduct from '../../../Source/images/increase-count-product.svg';
import ReduceCountProduct from '../../../Source/images/reduce-count-product.svg';
import './ViewProduct.scss';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const ViewProduct = () => {
  const history = useHistory();
  const [fillFavoriteProduct, setFillFavoriteProduct] = useState(false); //change default value
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(250); // change to dynamic number
  let [countQuantity, setCountQuantity] = useState(0);
  let [totalCountQuantity, setTotalCountQuantity] = useState(299); // change to dynamic number
  const [buyButton, setBuyButton] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const favoriteProduct = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/setFavorite`,
        {
          productId: '22ac36cc-734a-40e4-a7bc-55aeb8143dda' //change to dynamic id
        },
        {
          'headers': {'Authorization': `Bearer ${user.token}`}
        });
      setFillFavoriteProduct(!fillFavoriteProduct)
      if (fillFavoriteProduct) {
        setAlert('success');
        setErrorText('Added to favorites!');
        setError(true);
      } else {
        setAlert('success');
        setErrorText('Removed from favorites!');
        setError(true);
      }
    } catch (e) {
      setAlert('error');
      setErrorText('Server error!');
      setError(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  }

  const reduceCountProduct = () => {
    if (countQuantity >= 1) {
      setCountQuantity(--countQuantity);
    }
    if (totalCountQuantity <= 298) setTotalCountQuantity(++totalCountQuantity); // change to dynamic number
    setTotalPrice(countQuantity * currentPrice);
  }

  const increaseCountProduct = () => {
    if (countQuantity <= 299) {  // change to dynamic number
      setCountQuantity(++countQuantity);
    }
    if (totalCountQuantity >= 1) setTotalCountQuantity(--totalCountQuantity);
    setTotalPrice(countQuantity * currentPrice);
  }

  const buyProduct = () => {
    setAlert('success');
    setErrorText('Products added to the basket!');
    setError(true);
    setBuyButton(true);
    // add products to the basket
  }

  const backButton = () => {
    history.push('/home_page');
  }

  const goToBasket = () => {
    history.push('/basket');
  }

  return (
    <Container fixed>
      <div className='main-view-product'>
        <div className='left-side'>
          <Link to='/home_page'>
            <img
              className='back-to-home-page-img'
              src={BackButton}
              alt='back-button'
            />
          </Link>
          <img
            className='product-picture'
            src={ProductPicture}
            alt='product-picture'
          />
        </div>
        <div className='right-side'>
          <div className='name-product'>
            <h2 className='header-name-product'>NameProduct</h2>
            <Button className='favorite-product-btn' onClick={() => favoriteProduct()}>
              {fillFavoriteProduct
                ? <FilledFavoriteProduct
                  className='filled-favorite-product'
                  src={FilledFavoriteProduct}
                  alt='favorite'
                />
                : <FavoriteProduct
                  className='favorite-product'
                  src={FavoriteProduct}
                  alt='favorite'
                />
              }
            </Button>
          </div>
          <div className='product-content'>
            <p className='product-description-text'>Tackling dirty clothes is a breeze with these naturally derived
              detergent packs on your side. our tough
              stain fighters powerfully lift spills and splatters, all while keeping colors and whites bright. just toss
              a pack in your washer and enjoy the extra time to yourself. maybe do a little shimmy. getting clean
              clothes has never been easier.</p>
          </div>
          <div className='available-quantity'>
            <div className='to-count-quantity'>
              <Button className='reduce-count-product-btn' onClick={() => reduceCountProduct()}>
                <img src={ReduceCountProduct} alt='reduce-count-product'/>
              </Button>
              <div className='count-quantity'>
                {countQuantity}
              </div>
              <Button className='increase-count-product-btn' onClick={() => increaseCountProduct()}>
                <img src={IncreaseCountProduct} alt='increase-count-product-btn'/>
              </Button>
            </div>
            <div className='total'>
              <p className='text-total-count'>
                Available quantity:
              </p>
              <div className='total-count'>{totalCountQuantity}</div>
            </div>
          </div>
          <div className='total-price'>
            <div className='text-total-price'>
              Total price:
            </div>
            <div className='total-count-price'>$ {totalPrice}</div>
          </div>
          <div className='block-btn-view-profile'>
            <Button
              className='back-btn'
              variant='outlined'
              onClick={() => backButton()}
            >
              Back
            </Button>
            <Button
              className='view-product-page-button'
              variant='outlined'
              onClick={() => buyButton ? goToBasket() : buyProduct()}
            >
              {buyButton ? 'Basket' : 'Buy'}
            </Button>
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
    </Container>
  );
};

export default ViewProduct;
