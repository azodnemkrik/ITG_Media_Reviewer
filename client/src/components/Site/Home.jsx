import { Link } from "react-router-dom"

const Home = ({ user }) => {
    return (
        <div className="homeContainer">
            <h3>Welcome to the ITG Banner Reviewer</h3>
            {
                user.id ? (
                    <>
                    <h3> Glad you're back, {user.first_name}!</h3>
                    {/* <h4>Don't forget to check & update your,<br/>book */}
                    {/* <Link to="/reservations" className="registerNowLink">reservations</Link> or view your <Link to={`/account/${user.id}`} className="registerNowLink">account</Link>!</h4> */}
                    </>
                ) : (
                    <h3>Log in! </h3>
                    // <h4> See one you're interested in?<br/>
                    // <Link to="/login" className="registerNowLink">Log in</Link> to reserve books!<br/>Not a member? <Link to="/register" className="registerNowLink">Register now</Link>!</h4>
                )
            }
        </div>
    )
}

export default Home

/*
            <h3>Look at all the banners!</h3>
            {
                user.id ? (
                    <>
                    <h3> Glad you're back, {user.firstname}!</h3><h4>Don't forget to check & update your,<br/>book <Link to="/reservations" className="registerNowLink">reservations</Link> or view your <Link to={`/account/${user.id}`} className="registerNowLink">account</Link>!</h4>
                    </>
                ) : (
                    <h4> See one you're interested in?<br/><Link to="/books" className="registerNowLink">Log in</Link> to reserve books!<br/>Not a member? <Link to="/register" className="registerNowLink">Register now</Link>!</h4>
                )
            }

*/