import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Logo from '../../../Source/images/logo-img.svg';
import UpArrow from '../../../Source/images/up-arrow.svg';
import DownArrow from '../../../Source/images/down-arrow.svg';
import Icon1 from '../../../Source/images/drop-icon1.svg';
import Icon3 from '../../../Source/images/drop-icon3.svg';
import './AdminHeader.scss';

const AdminHeader = () => {
  const history = useHistory();
  const userName = JSON.parse(localStorage.getItem('admin'));

  const [fullName, setFullName] = useState(`${userName.lastName} ${userName.firstName}`);
  const [arrow, setArrow] = useState(true);

  function dropDownFunc() {
    setArrow(!arrow);
  }

  const logOut = () => {
    localStorage.removeItem('admin');
    history.push('/login');
  }

  return (
    <Container fixed>
      <div className='header'>
        <div className='header-logo'>
          <div className='header-img'>
            <img src={Logo} alt='logo' />
          </div>
          <div className='header-logo_text'>E’Shop</div>
        </div>

        <div className='header-info'>

          <div class='dropdown' onClick={() => dropDownFunc()}>
            <span>{fullName}</span>
            <img src={arrow ? DownArrow : UpArrow} />

            <div id='myDropdown' class={arrow ? 'dropdown-content' : 'dropdown-content show'}>
              <div className='drop-block'>
                <img src={Icon1} alt='icon1'/>
                <Link to='/profile' >Profile</Link>
              </div>

              <div className='drop-block'>
                <img src={Icon3} alt='icon3'/>
                <div className='logOut' onClick={() => logOut()}>Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AdminHeader;
