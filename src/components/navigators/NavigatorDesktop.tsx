import { AppBar, Box, Tabs, Tab } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { ReactNode, useEffect } from "react";
import { RouteType } from "../../model/RouteType";
import { useSelector } from "react-redux";

export type Props = {
    subnav?: boolean,
    routes: RouteType[]
}
export const NavigatorDesktop: React.FC<Props> = ({ subnav, routes }) => {
    const authState = useSelector<any, string>(state => state.auth.authUser);
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!subnav) {
            navigate(routes[0].path)
        }
        setValue(0);
    }, [routes, authState])

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    function getTabs(): ReactNode {
        return routes.map((route, index) => <Tab key={index} component={Link}
            to={route.path} label={route.label} />

        )
    }

    return <Box sx={{ marginTop: "10vh" }}>
        <AppBar sx={{ backgroundColor: "lightgray" }}>
            <Tabs value={value} onChange={handleChange}>
                {getTabs()}
            </Tabs>
        </AppBar>
        <Outlet></Outlet>
    </Box>
}


