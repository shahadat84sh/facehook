import { useNavigate } from "react-router-dom";
import logOut from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

const LogOut = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth();
    const handleLogOut = () => {
        setAuth({})
        navigate('/login');
    }
    return (
        <button className="icon-btn"
            onClick={handleLogOut}
        >
            <img src={logOut}
                alt="Logout" />
        </button>
    );
};

export default LogOut;