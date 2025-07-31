import { useState, useEffect, use } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Banners from './components/Products/Banners';
import Home from './components/Site/Home';
import SingleBanner from './components/Products/SingleBanner';
import Navigation from './components/Site/Navigation';
import Footer from './components/Site/Footer';
import Register from './components/Auth/Register';
import pinkWaves from './assets/pink-waves-background.png'
import Login from './components/Auth/Login';
import Projects from './components/Products/Projects';
import Organizations from './components/Products/Organizations';


function App() {
	const [allBanners, setAllBanners] = useState([])
	const [allStoryboards, setAllStoryboards] = useState([])
	const [allFrames, setAllFrames] = useState([])
	const [allProjects, setAllProjects] = useState([])
	const [allCreatives, setAllCreatives] = useState([])
	const [user, setUser] = useState({})
	const [allOrganizations, setAllOrganizations] = useState([])
	const [allUsers, setAllUsers] = useState([])

	const navigate = useNavigate()
	const location = useLocation()
	const { pathname } = location



	// Fetch All Banners
	useEffect(() => {
		const fetchBanners = async () => {
			try {
				const { data } = await axios.get('/api/banners')
				// console.log("BANNERS:", data)
				setAllBanners(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchBanners()
		// navigate('/banners')
		const body = document.querySelector('body');
		body.style.backgroundImage = `url(${pinkWaves})`;
		body.style.backgroundPosition = 'center center';
		body.style.backgroundSize = 'cover';
		body.style.backgroundRepeat = 'no-repeat';
		body.style.backgroundAttachment = 'fixed';
	}, [])

	// Fetch All Frames
	useEffect(() => {
		const fetchFrames = async () => {
			try {
				const { data } = await axios.get('/api/frames')
				// console.log('FRAMES:', data)
				setAllFrames(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchFrames()
	}, [])

	// Fetch All Storyboards
	// useEffect(() => {
	// 	const fetchStoryboards = async () => {
	// 		try {
	// 			const { data } = await axios.get('/api/banners/storyboards')
	// 			// console.log('STORYBOARDS:', data)
	// 			setAllStoryboards(data)
	// 		} catch (error) {
	// 			console.error(error)
	// 		}
	// 	}
	// 	fetchStoryboards()
	// }, [])

	// Fetch All Projects
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const { data } = await axios.get('/api/projects')
				// console.log('PROJECTS:', data)
				setAllProjects(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchProjects()
	}, [user.id])

	useEffect(() => {
		const fetchOrganizations = async () => {
			try {
				const { data } = await axios.get('/api/organizations')
				// console.log('ORGANIZATIONS:', data)
				setAllOrganizations(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchOrganizations()
	}, [])

	// Fetch All Users
	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const { data } = await axios.get('/api/users')
				console.log('USERS:', data)
				setAllUsers(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchAllUsers()
	}, [])

	// allCreatives

	useEffect(() => {
		const fetchCreatives = async () => {
			try {
				const { data } = await axios.get('/api/creatives')
				console.log('CREATIVES:', data)
				setAllCreatives(data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchCreatives()
	}, [])


	const getHeaders = () => {
		return {
			headers: {
				authorization: window.localStorage.getItem('token')
			}
		}
	}

	const attemptLoginWithToken = async () => {
		const token = window.localStorage.getItem('token')
		if (token) {
			try {
				const { data } = await axios.get('/api/auth/me', getHeaders())
				console.log("attemptLoginWithToken:", { data })
				setUser(data)
			} catch (error) {
				console.log(error)
				window.localStorage.removeItem('token')
			}
		}
	}

	const logout = () => {
		window.localStorage.removeItem('token')
		setUser({})
		navigate('/')
	}


	useEffect(() => {
		attemptLoginWithToken()
	}, [])

	// Displayed Items
	return (
		<div className='stage' style={{
			backgroundImage: "url(" + pinkWaves + ")",
			backgroundPosition: 'center center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat',
			backgroundAttachment: 'fixed',
		}}>
			<Navigation user={user} pathname={pathname} logout={logout} />

			<Routes>
				<Route path="/" element={<Home user={user} attemptLoginWithToken={attemptLoginWithToken} />} />
				<Route path="/projects" element={<Projects allProjects={allProjects.sort((a, b) => a.org_code.localeCompare(b.org_code))} allBanners={allBanners} allCreatives={allCreatives} allOrganizations={allOrganizations} user={user} />} />
				<Route path="/banners" element={<Banners allBanners={allBanners} allFrames={allFrames} user={user} />} />
				<Route path="/banners/:id" element={<SingleBanner allBanners={allBanners} allStoryboards={allStoryboards} allFrames={allFrames} user={user} />} />
				<Route path="/register" element={<Register />} />
				<Route path="/organizations" element={<Organizations allOrganizations={allOrganizations} allUsers={allUsers.sort((a, b) => a.last_name.localeCompare(b.last_name))} user={user} />} />
				<Route path="/login" element={<Login attemptLoginWithToken={attemptLoginWithToken} />} />

			</Routes>
			<Footer pathname={pathname} />
		</div>
	)
}

export default App

/*
	// Authentication
	// const authenticate = async (token) => {
	// 	try {
	// 		if (!token) {
	// 			throw Error("No token was found!")
	// 		}
	// 		const response = await axios.get('/api/users/me' , {
	// 			headers: {
	// 				"Authorization": token
	// 			}
	// 		})
	// 		setUser(response.data)
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }

	// useEffect(() => {
	// 	const loggedInToken = window.localStorage.getItem("token")
	// 	if(loggedInToken) {
	// 		authenticate(loggedInToken)
	// 	}
	// }, [user.id])

*/