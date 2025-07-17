import { Link } from "react-router-dom"
import itgLogo from '../assets/ITG_Logo_White-Pink.png'

const Navigation = ({ user, pathname }) => {
    return (
        <div>
            <nav>
                <div className="nav navLeft">
                    <Link to="/"><img src={itgLogo} className="itgLogo" alt="Inspired Thinking Group" /></Link>
                    <Link to="/"><p>Banner Reviewer</p></Link>
                </div>
                <div className="nav navRight">
                    {
                        user.id ? (
                            <>
                                <p><Link to="/banners" className={pathname === "/banners" ? "selected" : ""}>Banners I can see</Link></p>
                                <p><Link to="/projects" className={pathname === "/projects" ? "selected" : ""}>My Projects</Link></p>
                                <p>My Account</p>
                            </>
                        ) : (
                                <p>Login</p>
                        )
                    }
                </div>
                {/* <p><Link to={`/account/${user.id}`} className={ pathname === "/account" ? "selected" : ""}>Account</Link></p> */}
            </nav>
        </div>
    )

}

export default Navigation