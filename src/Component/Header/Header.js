import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  Container,
  withStyles,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import Logo from "../../Source/images/logo-img.svg";
import Basket from "../../Source/images/basket.svg";
import UpArrow from "../../Source/images/up-arrow.svg";
import DownArrow from "../../Source/images/down-arrow.svg";
import Icon1 from "../../Source/images/drop-icon1.svg";
import Icon2 from "../../Source/images/drop-icon2.svg";
import Icon3 from "../../Source/images/drop-icon3.svg";
import "./Header.scss";

const Header = () => {
  let history = useHistory();
  const userName = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState(
    `${userName.lastName} ${userName.firstName}`
  );
  const [arrow, setArrow] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.grey,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.black,
        },
      },
    },
  }))(MenuItem);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setArrow(!arrow);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setArrow(!arrow);
  };

  const logOut = () => {
    localStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <Container fixed>
      <div className="header">
        <div className="header-logo">
          <div className="header-img">
            <img src={Logo} alt="logo" />
          </div>
          <div className="header-logo_text">E’Shop</div>
        </div>

        <div className="header-info">
          <div className="header-info_img">
            <img src={Basket} alt="basket" />
          </div>

          <div className="main-drop">
            <div class="dropdown" onClick={(e) => handleClick(e)}>
              <span>{fullName}</span>
              <img src={arrow ? DownArrow : UpArrow} />
            </div>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <ListItemIcon>
                  <img src={Icon1} alt="icon1" />
                </ListItemIcon>
                <Link to="/profile" className="profile-link">
                  Profile
                </Link>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <img src={Icon2} alt="icon2" />
                </ListItemIcon>
                <Link to="/" className="profile-link">
                  Favorite product
                </Link>
              </StyledMenuItem>
              <StyledMenuItem>
                <ListItemIcon>
                  <img src={Icon3} alt="icon3" />
                </ListItemIcon>
                <ListItemText primary="Log Out" onClick={() => logOut()} />
              </StyledMenuItem>
            </StyledMenu>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Header;