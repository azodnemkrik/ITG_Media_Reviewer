import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const login = async() => {

    }

    return (
		<div className="loginContainer">
			<form action={login}>
				<div className="loginBox loginPrompt">
				<h3>Login to access your account.</h3>
					<label>
						Email: <input type="text" name="email" />
					</label><br />
					<label>
						Password: <input type="password" name="password" />
					</label><br />
					<button>Login</button>
				</div>
			</form>
			<h4> or </h4>
			<div className="loginBox createAccountStyle">
				<h3>Create an account.</h3>
				<button onClick={()=>navigate("/register")}>Register Now</button>
			</div>
		</div>
    )
}