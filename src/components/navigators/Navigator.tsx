import { NavLink, Outlet } from "react-router-dom"
import { RouteType } from "../../model/RouteType";
import './navigators.css'

type Props = {
    linkInfo: RouteType[],
}

export const Navigator: React.FC<Props> = ({ linkInfo }) => {

    function getLinks(linkInfo: RouteType[] ): import("react").ReactNode {
        const res = linkInfo.map((v, i) => <li className="navigator-item paragraph-l" key={i}>
            <NavLink to={v.path}>{v.label}</NavLink>
        </li>);
        return <ul className="navigator-list"> {res} </ul>
    }

    return <div>
        <nav className="container">
            {getLinks(linkInfo)}
        </nav>
        <Outlet />
    </div>
}


