import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ClickAwayListener } from "@material-ui/core";
import searchImg from "../../../Source/images/search.svg";
import hamImg from "../../../Source/images/hamburger.svg";
import hamCloseImg from "../../../Source/images/hamClose.svg";
import "./Search.scss";

const Search = ({ selectCategory, selectSearch }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({});
  const [search, setSearch] = useState("");
  const [names, setNames] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const authStr = `Bearer ${user.token}`;

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickTrue = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    setSearch(value);
    value.length < 3 ? setNames([]) : getSearch(value) && setOpenSearch(true);
  };

  const handleClickEnter = (e) => {
    if (e.key === "Enter") {
      selectSearch(search);
      setOpenSearch(false);
      setSearch("");
    }
  };

  const onClickSearchImg = () => {
    setOpenSearch(false);
    setSearch("");
  };

  useEffect(() => getAllCategory(), []);

  const getAllCategory = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_SERVER_ENDPOINT}/shop/category`, {
          headers: { Authorization: authStr },
        })
        .then((res) => {
          setCategory(res.data);
        });
    } catch (e) {}
  };

  const getSearch = async (str) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/shop/search?search=${str}`,
          {
            headers: { Authorization: authStr },
          }
        )
        .then((res) => {
          setNames(res.data);
        });
    } catch (e) {}
  };

  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <div className="menu-search">
        <Container fixed>
          <div className="search">
            {!open && (
              <div className="ham">
                <img src={hamImg} onClick={() => handleClickTrue()} />
              </div>
            )}

            <div className="search-main">
              <img
                src={searchImg}
                className="search-main_img"
                onClick={() => onClickSearchImg()}
              />
              <input
                className="search-main_inp"
                placeholder="Search"
                value={search}
                onKeyUp={(e) => handleChange(e.target.value)}
                onKeyDown={(e) => handleClickEnter(e)}
                onChange={(e) => setSearch(e.target.value)}
              />
              {openSearch && <div className="search-panel">
                  {names.length > 0 &&
                    names.map((item) => (
                      <div className="search-panel_item">{item.name}</div>
                    ))}
                </div>
              }
            </div>
          </div>
        </Container>

        {open && <div className="sidebar" onClickAway={() => handleClickAway()}>
            <div className="search-closeImg">
              <img
                src={hamCloseImg}
                className="search-main_img"
                onClick={() => handleClickAway()}
              />
            </div>
            <span className="list-header">Category</span>

            <ul>
              {Object.keys(category).map((item, index) => (
                <li
                  className="list-heading"
                  key={`name cat-${index}`}
                  onClick={() => selectCategory(item)}
                >
                  <span
                    className="category-header"
                    onClick={() => handleClickAway()}
                  >
                    {item}
                  </span>
                  <ul>
                    {Object.keys(category[item]).map((itemNew, index) => (
                      <li
                        onClick={() => handleClickAway()}
                        key={`cat-${index}`}
                        onClick={() => selectCategory(item)}
                      >
                        {category[item][itemNew]["name"]}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        }
      </div>
    </ClickAwayListener>
  );
};

export default Search;