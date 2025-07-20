import { Link } from "react-router-dom"
import itgLogo from '../../assets/ITG_Logo_White-Pink.png'

const Footer = ({ pathname }) => {
    return (
        <div>
            <footer className="footer">
            {/* <img src={itgLogo} className="float itgLogo" alt="Inspired Thinking Group" /> */}
            © 2025 Inspired Thinking Group (ITG) Limited. All Rights Reserved.
                {/* <p><Link to="/banners" className={pathname === "/banners" ? "selected" : ""}>Banners I can see</Link></p> */}
                {/* <p><Link to="/projects" className={pathname === "/projects" ? "selected" : ""}>My Projects</Link></p> */}
                {/* <p>My Account</p> */}
                {/* <p><Link to={`/account/${user.id}`} className={ pathname === "/account" ? "selected" : ""}>Account</Link></p> */}
            </footer>
        </div>
    )

}

export default Footer