import React from "react";
import { useDispatch } from "react-redux";
import {authActions} from "../../redux/authSlice"
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from "@mui/material";

export const Logout: React.FC = () => {
    const dispatch = useDispatch();
    return <div  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',    
      }} className="logout" >

          
        <Button variant="contained" startIcon={<LogoutIcon/>}  onClick= {() => dispatch(authActions.logout())} >Logout</Button>        
    </div>
}