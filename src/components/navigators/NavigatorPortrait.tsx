import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from '@mui/icons-material'
import { AppBar, IconButton, ListItem, Toolbar, Typography, Drawer, List, Box } from '@mui/material';
import { RouteType } from '../../model/RouteType';
type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorPortrait: React.FC<Props> = ({ routes }) => {
    const [flOpen, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (routes.length > 0) {
            let routeIndex = routes.findIndex(r => r.path == location.pathname);
            if(routeIndex < 0) {
                routeIndex = 0;
            }
            navigate(routes[routeIndex].path);
        }

    }, [routes]);

    function getTitle(): string {
        const route = routes.find(r => r.path === location.pathname)
        return route ? route.label : '';
    }

    function toggleOpen() {
        setOpen(!flOpen);
    }

    function getListItems(): React.ReactNode {
        return routes.map(route => <ListItem onClick={toggleOpen} 
            component={Link} to={route.path} key={route.path}>{route.label}</ListItem>)
    }

    return <Box sx={{ marginTop: { xs: "15vh", sm: "20vh" } }}>
        <AppBar position="fixed">
            <Toolbar><IconButton onClick={toggleOpen} sx={{ color: 'white' }}>
                <Menu />
            </IconButton>
                <Typography sx={{ width: "100%", textAlign: "center", fontSize: "1.5em" }}>
                    {getTitle()}
                </Typography>
                <Drawer open={flOpen} onClose={toggleOpen} anchor="left">
                    <List>
                        {getListItems()}
                    </List>
                </Drawer></Toolbar>

        </AppBar>
        <Outlet></Outlet>
    </Box>
}