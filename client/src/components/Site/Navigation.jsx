import { Link } from "react-router-dom"
import itgLogo from '../../assets/ITG_Logo_White-Pink.png'

const Navigation = ({ user, pathname, logout }) => {
    return (
        <div>
            {
                user.id ? (
                    <nav>
                        <div className="nav navLeft">
                            <Link to="/"><img src={itgLogo} className="itgLogo" alt="Inspired Thinking Group" /></Link>
                            <Link to="/"><p>Banner Reviewer</p></Link>
                        </div>
                        <div className="nav navRight">
                            {
                                user.id ? (
                                    <>
                                        <p><Link to="/banners" className={pathname === "/banners" ? "selected" : ""}>My Banners</Link></p>
                                        <p><Link to="/projects" className={pathname === "/projects" ? "selected" : ""}>My Projects</Link></p>
                                        <p><Link to="/organizations" className={pathname === "/organizations" ? "selected" : ""}>My Organizations</Link></p>
                                        <p>My Account</p>
                                        <div className="userAvatarContainer">
                                            <button className="float logoutButton" onClick={logout}>Logout</button>
                                            <img className="float userAvatar" src={`data:image/png;base64, ${user.avatar}`} alt="User Avatar" />
                                        </div>
                                    </>
                                ) : (
                                    <p><Link to="/login">Login</Link></p>
                                )
                            }
                        </div>
                    </nav>
                ) : (null)
            }
        </div>
    )

}

export default Navigation
/*

       <div>
            {
                pathname != "/login" ? 
                ( pathname != "/register" ? 
                    (
                    <nav>
                        <div className="nav navLeft">
                            <Link to="/"><img src={itgLogo} className="itgLogo" alt="Inspired Thinking Group" /></Link>
                            <Link to="/"><p>Banner Reviewer</p></Link>
                        </div>
                        <div className="nav navRight">
                            {
                                user.id ? (
                                    <>
                                        <p><Link to="/banners" className={pathname === "/banners" ? "selected" : ""}>My Banners</Link></p>
                                        <p><Link to="/projects" className={pathname === "/projects" ? "selected" : ""}>My Projects</Link></p>
                                        <p><Link to="/organizations" className={pathname === "/organizations" ? "selected" : ""}>My Organizations</Link></p>
                                        <p>My Account</p>
                                        <div className="userAvatarContainer">
                                            <button className="float logoutButton" onClick={logout}>Logout</button>
                                            <img className="float userAvatar" src={`data:image/png;base64, ${user.avatar}`} alt="User Avatar" />
                                        </div>
                                    </>
                                ) : (
                                    <p><Link to="/login">Login</Link></p>
                                )
                            }
                        </div>
                         { <p><Link to={`/account/${user.id}`} className={ pathname === "/account" ? "selected" : ""}>Account</Link></p>  }
                    </nav>
                    ) : (null)
                ) : (null)
            }
        </div>
*/