import { Link } from "react-router-dom"
import itgLogo from '../assets/ITG_Logo_White-Pink.png'

const Navigation = ({ pathname }) => {
    return (
        <div>
            <nav>
            <img src={itgLogo} className="float itgLogo" alt="Inspired Thinking Group" />
                <p><Link to="/banners" className={pathname === "/banners" ? "selected" : ""}>Banners</Link></p>
                <p><Link to="/projects" className={pathname === "/projects" ? "selected" : ""}>Projects</Link></p>
                {/* <p><Link to={`/account/${user.id}`} className={ pathname === "/account" ? "selected" : ""}>Account</Link></p> */}
            </nav>
        </div>
    )

}

export default Navigation