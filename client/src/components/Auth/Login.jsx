import axios from "axios";
import itgLogo from '../../assets/ITG_Logo_White-Pink.png'
import { Link, useNavigate } from "react-router-dom"

const Login = ({ attemptLoginWithToken }) => {

	const navigate = useNavigate()

	const login = async (formData) => {
		const email = formData.get("email")
		const password = formData.get("password")
		const user = { email, password }
		try {
			const { data } = await axios.post('/api/auth/login', user)
			const { token } = data
			window.localStorage.setItem("token" , token)
			attemptLoginWithToken()
			navigate("/projects")
			// authenticate(window.localStorage.getItem("token"))
			
		} catch (error) {
			console.error(error.status)
			if (error.status == 401) {
				alert("Your login combination was not found in our database. \n Please re-check your credentials or create a new account.")
			} else if (error.status == 400) {
				alert("Please login using a registered email address and password combination.")
			}
		}
	}

	return (
		<div className="formContainer">
			<form action={login}>
				<div className="itgForm">
					<div className="formTop">
						<div className="logoAndName">
							<img src={itgLogo} className='formLogo' />
							<h1>Banner Reviewer</h1>
						</div>
					</div>
					<div className="formBottom">
						<div className="one-column-layout">
							<label>
								Email:<br /><input type="text" name="email" />
							</label>
							<label>
								Password:<br /><input type="password" name="password" />
							</label><br />
							<button type="submit">Login</button><br />
						</div>
						<p>Not a member? <Link to="/register" className="textLink">Signup now.</Link></p>
					</div>
				</div>
			</form>
		</div>
	)





}

export default Login