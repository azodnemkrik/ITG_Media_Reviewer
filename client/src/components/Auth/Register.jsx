import axios from "axios";
import itgLogo from '../../assets/ITG_Logo_White-Pink.png'
import { Link , useNavigate } from "react-router-dom"

const Register = () => {

	const navigate = useNavigate()

	const register = async () => {
		const first_name = formData.get("first_name")
		const last_name = formData.get("last_name")
		const username = formData.get("username")
		const password = formData.get("password")
		const user = {
			first_name,
			last_name,
			username,
			password
		}
		try {
			const { data } = await axios.post('/api/users/register', user)
			console.log( data )
			alert('registration successful! thank you')
			navigate('/')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="formContainer">
			<form action={register}>
				<div className="itgForm">
					<div className="formTop">
						<div className="logoAndName">
							<img src={itgLogo} className='formLogo' />
							<h1>Banner Reviewer</h1>
						</div>
					</div>
					<div className="formBottom">
						<h3>Please provide the following information.</h3>
						<div className="one-column-layout">
							<label>
								First:<br /> <input type="text" name="first_name" />
							</label>
							<label>
								Last:<br /> <input type="text" name="last_name" />
							</label>
							<label>
								Username:<br /> <input type="text" name="username" />
							</label>
							<label>
								Password:<br /> <input type="text" name="password" />
							</label>
							<button type="submit">Submit</button>
						</div>
						<p>Already a member? <Link to="/login" className="textLink">Login now.</Link></p>
					</div>
				</div>
			</form>
		</div>
	)





}

export default Register

/*

						<label>
							Organization: <input type="text" name="org_code" />
						</label>
						<label>
							Request Administrator: <input type="checkbox" name="is_admin" />
						</label>
						<label>
							Avatar: <input type="file" name="avatar" />
						</label>

*/