import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleUser = ({ allUsers , setAllUsers , user}) => {

	const navigate = useNavigate();
    const params = useParams();
    console.log("Params:", params);

    const editUser = allUsers.find(aUser => aUser.id === (params.id));

	// Check user object
	console.log("editUser:", editUser);

	const updateForm = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const first_name = formData.get("first_name")
		const last_name = formData.get("last_name")
		const email = formData.get("email")
		const password = formData.get("password")
		const org_code = formData.get("org_code")
		const is_admin = formData.get("is_admin") === "on" ? true : false;
		const avatar = editUser.avatar; // Assuming you want to keep the existing avatar
		const userData = {
			first_name,
			last_name,
			email,
			password,
			org_code,
			is_admin,
			avatar
		}
			console.log("Submitting userData:", userData);
			try {
			const { data } = await axios.put(`/api/users/${editUser.id}`, userData)
			console.log(data)
			// Update the user state immediately with the returned data
			setAllUsers([...allUsers, data])
			alert('Update successful! Thank you')
			navigate(`/users/${editUser.id}`)
		} catch (error) {
			console.error("Update failed:", error)
			console.error("Error response:", error.response?.data)
			alert(`Update failed: ${error.response?.data?.message || error.message}`)
		}
	}


	return (
		<div className="accountContainer">
			{user.id ? (
				<div className="formContainer">
					<form onSubmit={updateForm}>
						<div className="itgForm">
							<div className="formTop">
								<div className="logoAndName">
									<img className="userAvatarAccount" src={`data:image/png;base64, ${editUser.avatar}`} alt="User Avatar" />
									<h1>Update Account</h1>
								</div>
							</div>
							<div className="formBottom">
								<p>Update and save changes.</p>
								<div className="one-column-layout">
									<div className="two-column-layout">
										<label>
											First:<br /> <input className="two-column-form-left" type="text" name="first_name" defaultValue={editUser.first_name || ''} />
										</label>
										<label>
											<span className="bumpLabel-right">Last:</span><br /> <input className="two-column-form-right" type="text" name="last_name" defaultValue={editUser.last_name || ''} />
										</label>
									</div>
									<div className="two-column-layout">
										<label>
											Email:<br /> <input className="two-column-form-left" type="text" name="email" defaultValue={editUser.email || ''} />
										</label>
										<label>
											<span className="bumpLabel-right">Password:</span><br /> <input className="two-column-form-right " type="password" name="password" placeholder="(leave blank to keep current)" />
										</label>
									</div>
									<label>
										{
											user.org_code == "ITG" ? (
												<>
													<div className="one-column-layout">
														<label>
															Organization Code:<br />
															<input className="two-column-form-left" type="text" name="org_code" defaultValue={editUser.org_code} />
														</label>
														<label>
															Admin:<input className="checkBox" type="checkbox" name="is_admin" defaultChecked={editUser.is_admin}  />
														</label>
													</div>
												</>
											) : (
												<>
													<div className="one-column-layout">
														<label>
															Organization Code:<br />
															<input className="two-column-form-left" type="text" name="org_code" defaultValue={editUser.org_code} readOnly/>
														</label>
														<label>
															Admin:<input className="checkBox" type="checkbox" name="is_admin_display" defaultChecked={editUser.is_admin} disabled/>
															<input type="hidden" name="is_admin" value={editUser.is_admin} />
														</label>
													</div>
												</>
											)
										}
									</label>

									<button type="submit">Update Info</button>
								</div>
							</div>
						</div>
        			<Link to="/organizations" className="backTo"><span className="material-symbols-outlined">arrow_back</span>Back to Organizations</Link>
					</form>
                    
				</div>
			) : (
				<h1>Please log in</h1>
			)}
		</div>
	);
};

export default SingleUser;