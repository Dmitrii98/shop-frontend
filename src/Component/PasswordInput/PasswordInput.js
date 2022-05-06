import React, { useState } from 'react';
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl
} from '@material-ui/core'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import './PasswordInput.scss'

const InputAdornments = ({checkPassword, repeatPasswordError, passwordError, value, setValue, placeholder}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl className={passwordError || repeatPasswordError ? 'input-password-error' : 'input'}>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        className='input-register-pass'
        onChange={(e) => handleChange(e)}
        onBlur={() => checkPassword()}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default InputAdornments;