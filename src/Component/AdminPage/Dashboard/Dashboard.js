import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  InputAdornment,
  MenuItem,
  TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from '@material-ui/lab/Pagination';
import TableDashboard from './TableDashboard/TableDashboard';
import './Dashboard.scss';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchArray, setSearchArray] = useState([]);
  const [limitProducts, setLimitProducts] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const sortBy = [
    {
      name: 'Date',
      value: 'date'
    },
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Popularity',
      value: 'popularity'
    },
    {
      name: 'Price',
      value: 'price'
    },
    {
      name: 'id',
      value: 'id'
    },
  ];
  const productsOnPage = [
    {number: 5},
    {number: 10},
    {number: 25},
    {number: 50},
    {number: 100},
    {number: 150}
  ];

  const getAllProducts = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products`,
        {
          'headers': {'Authorization': `Bearer ${admin.token}`}
        }).then(res => {
        setProducts(res.data.data);
        setTotalCount(res.data.meta.count);
      });
    } catch (e) {
      console.log('Error');
    }
  }

  const pagination = async (count, page) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?limit=${count}&page=${page}`,
        {
          'headers': {'Authorization': `Bearer ${admin.token}`}
        }
      ).then(res => {
        setProducts(res.data.data);
      })
    } catch (e) {
      console.log('Error');
    }
  }

  const search = async (value) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/search?search=${value}`,
        {
          'headers': {'Authorization': `Bearer ${admin.token}`}
        }
      ).then(res => {
        setSearchArray(res.data);
      })
    } catch (e) {
      console.log('Error');
    }
  }

  const sort = async (value) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?sort[type]=${value}&sort[dir]=desc`,
        {
          'headers': {'Authorization': `Bearer ${admin.token}`}
        }
      ).then(res => {
        setProducts(res.data.data);
      })
    } catch (e) {
      console.log('Error');
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  const changeNumberPage = (e, page) => {
    setCurrentPage(page);
    pagination(limitProducts, page);
  }

  const changeCountProduct = (count) => {
    setLimitProducts(count);
    pagination(count, currentPage);
  }

  const searchStringFun = (searchString) => {
    (searchString.length < 3 ? setSearchArray([]) : search(searchString));
  }

  const changeSortBy = (sortValue) => {
    sort(sortValue);
  }

  return (
    <Container fixed>
      <div className='header-dashboard'>
        <div className='search-sort'>
          <div className='search-field'>
            <TextField
              className='search-input'
              variant='outlined'
              placeholder='Search'
              onKeyUp={(e) => searchStringFun(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon className='searchIcon'/>
                  </InputAdornment>
                ),
              }}
            >
            </TextField>
            <div className='search-hint'>
              {searchArray.length > 0 && searchArray.map(item =>
                <MenuItem>
                  {item.name}
                </MenuItem>
              )}
            </div>
          </div>
          <div className='sorting-by'>
            <p className='sorting-text'>Sorting by:</p>
            <TextField
              id='input-sort'
              className='input-sort'
              select
              type='text'
              variant='outlined'
              size='small'
            >
              {sortBy.map(item =>
                <MenuItem value={item.name} onClick={() => changeSortBy(item.value)}>
                  {item.name}
                </MenuItem>
              )}
            </TextField>
          </div>
        </div>
      </div>
      <div className='dashboard-wrapper'>
        <div className='dashboard'>
          <TableDashboard
            products={products}
            limitProducts={limitProducts}
            setProducts={setProducts}
          />
        </div>
        <div className='page-navigation'>
          <p className='page-navigation-text'>Products per on page:</p>
          <TextField
            className='page-navigation-input'
            select
            type='text'
            variant='outlined'
            size='small'
            value={limitProducts}
          >
            {productsOnPage.map(item =>
              <MenuItem value={item.number} onClick={() => changeCountProduct(item.number)}>
                {item.number}
              </MenuItem>
            )}
          </TextField>
          <div className='pagination'>
            <Pagination
              count={Math.ceil(totalCount / limitProducts)}
              onChange={(e, page) => changeNumberPage(e, page)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
export default Dashboard;