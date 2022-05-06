import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import ModalDelete from "../ModalPageDelete/ModalDelete";
import SortArrows from "../../../../Source/images/swap-vert.png";
import SortArrowDown from "../../../../Source/images/sort-arrow-down.png";
import SortArrowUp from "../../../../Source/images/sort-arrow-up.png";
import EditIcon from "../../../../Source/images/edit-icon.svg";
import DeleteIcon from "../../../../Source/images/delete-icon.svg";
import './TableDashboard.scss';

const TableDashboard = ({products, setProducts}) => {
  const history = useHistory();
  const [sortArrow, setSortArrow] = useState('none');
  const [currentSortValue, setCurrentSortValue] = useState('');
  const [openDelete, setOpenDelete] = React.useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const headerTable = [
    {
      name: 'id',
      value: 'id'
    },
    {
      name: 'Name',
      value: 'name'
    },
    {
      name: 'Price',
      value: 'price'
    },
    {
      name: 'Popularity',
      value: 'popularity'
    },
    {
      name: 'Date',
      value: 'date'
    },
    {name: ''},
    {name: ''}
  ];
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const handleClickOpenDelete = (index) => {
    setIndexEdit(index);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const sortItemsByArrow = async (value) => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?sort[type]=${value}&sort[dir]=${sortArrow}`,
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

  const changeArrow = (value) => {
    setCurrentSortValue(value);
    switch (sortArrow) {
      case 'none':
        setSortArrow('desc');
        break;
      case 'desc':
        setSortArrow('asc');
        break;
      case 'asc':
        setSortArrow('none');
        break;
    }
    sortItemsByArrow(value);
  }

  const iconFun = (col) => {
    if (currentSortValue === col) {
      return sortArrow === 'none' ? SortArrows : sortArrow === 'desc' ? SortArrowDown : SortArrowUp;
    } else {
      return SortArrows;
    }
  }

  const openEditPage = (id) => {
    history.push(`/edit_product/${id}`);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table" className='table'>
        <TableHead>
          <TableRow>
            {headerTable.map((item, index) =>
              <TableCell className='table-cell-head'>
                {item.name}
                <Button className='sort-arrows-btn' onClick={() => changeArrow(item.value)}>
                  {item.value && <img
                    className='sort-arrows'
                    src={iconFun(item.value)}
                    alt="sort-arrows"
                  />}
                </Button>
              </TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item, index) => (
            <TableRow className='table-cell-row' key={`key-${index}`}>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                {item.id}
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                {item.name}
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                $ {item.price}
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                {item.popularity}
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                {new Date(item.createdAt).toLocaleString("en-GB", options)}
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="center"
              >
                <Button onClick={() => openEditPage(item.id, index)}>
                  <img
                    src={EditIcon} alt="edit-icon"/>
                </Button>
              </TableCell>
              <TableCell
                className='table-cell-body'
                align="left"
              >
                <Button onClick={() => handleClickOpenDelete(index)}>
                  <img src={DeleteIcon} alt="delete-icon"/>
                </Button>
              </TableCell>
              <ModalDelete
                close={handleCloseDelete}
                open={openDelete}
                indexEdit={indexEdit}
                setIndexEdit={setIndexEdit}
                products={products}
                setProducts={setProducts}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TableDashboard;