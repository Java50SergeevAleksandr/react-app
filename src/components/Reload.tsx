import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Reload: React.FC = () => {

    function closeIt() {
        return "";
    }
    window.onbeforeunload = closeIt;

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }
        , []);
    return <></>
}

