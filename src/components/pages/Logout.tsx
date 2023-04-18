import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/authSlice"
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button } from "@mui/material";
import { AUTH_USER_ITEM, authService } from "../../config/auth-service-config";

export const Logout: React.FC = () => {
  const dispatch = useDispatch();
  async function logoutFn() {
    await authService.logout();
    localStorage.setItem(AUTH_USER_ITEM, '');
    dispatch(authActions.logout());
  }
  return <Box style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }} className="logout" >


    <Button variant="contained" startIcon={<LogoutIcon />} onClick={logoutFn} >Logout</Button>
  </Box>
}

