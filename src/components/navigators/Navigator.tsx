import { NavLink, Outlet } from "react-router-dom"
import './navigators.css'

type Props = {
    linkInfo: Array<{ itemLink: string, itemText: string }>,
}

export const Navigator: React.FC<Props> = ({ linkInfo }) => {

    function getLinks(linkInfo: { itemLink: string; itemText: string }[]): import("react").ReactNode {
        const res = linkInfo.map((v, i) => <li className="navigator-item paragraph-l" key={i}>
            <NavLink to={v.itemLink}>{v.itemText}</NavLink>
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


