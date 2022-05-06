import React, { 
  useState, 
  useEffect, 
  useRef
} from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import {
  Container,
  FormControl,
  Select,
  Popover,
  Typography
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../Header/Header";
import Search from "./Search/Search";
import basketImg from "../../Source/images/basket_small.svg";
import cardImg from "../../Source/images/card.svg";
import heartNewImg from "../../Source/images/heartNew.svg";
import favoriteImg from "../../Source/images/favoriteImg.svg";
import "./HomePage.scss";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ num: "", name: "" });
  const [limitProducts, setLimitProducts] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let newFavorite = {};
  const user = JSON.parse(localStorage.getItem("user"));
  const authStr = `Bearer ${user.token}`;
  const arrValue = [5, 10, 25, 50, 100, 150];
  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = useRef();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => pagination(5, 1), []);

  const pagination = async (count, page) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?limit=${count}&page=${page}`,
          {
            headers: { Authorization: authStr },
          }
        )
        .then((res) => {
          setProducts(res.data.data);
          setTotalCount(res.data.meta.count);
        });
    } catch (e) {
      console.log("Error");
    }
  };

  const selectCategory = async (category) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?category=${category}`,
          {
            headers: { Authorization: authStr },
          }
        )
        .then((res) => {
          setTotalCount(res.data.meta.count);
          setProducts(res.data.data);
        });
    } catch (e) {
      console.log("Error");
    }
  };

  const selectSearch = async (search) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/products?search=${search}`,
          {
            headers: { Authorization: authStr },
          }
        )
        .then((res) => {
          setProducts(res.data.data);
          setTotalCount(res.data.meta.count);
        });
    } catch (e) {
      console.log("Error");
    }
  };

  const changeFavorite = async (newFavorite) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/favorite`,
        newFavorite,
        {
          headers: { Authorization: authStr },
        }
      );
    } catch (e) {
      console.log("Error");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
    setLimitProducts(event.target.value);
    pagination(event.target.value, currentPage);
  };

  const changeNumberPage = (e, page) => {
    setCurrentPage(page);
    pagination(limitProducts, page);
  };

  const handleClickFavorite = (event, item) => {
    newFavorite.productId = item.id;
    changeFavorite(newFavorite);
    if (item.favorite) {
      setAnchorEl(event.currentTarget);
    }
    pagination(limitProducts, currentPage);
  };

  const handleCloseFavorite = () => {
    setAnchorEl(null);
  };

  return (
    <div className="home">
      <Header />
      <Search selectCategory={selectCategory} selectSearch={selectSearch} />
      <Container fixed>
        <div className="cards">
          {products.map((item, ind) => (
            <div className="card" key={`${ind}`} ref={divRef}>
              {
                <img
                  src={item.favorite ? heartNewImg : favoriteImg}
                  className="heartImg"
                  aria-describedby={id}
                  onClick={(e) => handleClickFavorite(e, item)}
                />
              }
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleCloseFavorite}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <Typography>Product in favorites</Typography>
              </Popover>
              <img src={cardImg} />
              <span className="prod-name">{item.name}</span>
              <div className="block-price">
                <span className="prod-price">{`$ ${item.price}`}</span>
                <img src={basketImg} className="basketImg" />
              </div>
            </div>
          ))}
        </div>

        <div className="footer">
          <span>Products per on page:</span>
          <FormControl variant="outlined" className="selectForm">
            <Select
              native
              value={state.num}
              onChange={(e) => handleChange(e)}
              inputProps={{
                name: "num",
                id: "outlined-age-native-simple",
              }}
            >
              {arrValue.map((val, index) => (
                <option value={val} key={`k${index}`}>
                  {val}
                </option>
              ))}
            </Select>
          </FormControl>

          <div className="pagination">
            <Pagination
              count={Math.ceil(totalCount / limitProducts)}
              onChange={(e, page) => changeNumberPage(e, page)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default withRouter(HomePage);