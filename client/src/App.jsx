import { useState, useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Banners from './components/banners';
import Home from './components/Home';
import SingleBanner from './components/SingleBanner';
import Navigation from './components/Navigation';


function App() {
  const [ allBanners , setAllBanners] = useState([])
  const [user , setUser] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  // Fetch All Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/banners')
        console.log(data)
        setAllBanners(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchBanners()
  }, [])

  // Authentication
  const authenticate = async (token) => {
    try {
      if(!token){
        throw Error("No token was found!")
      }
      const response = await axios.get('http://localhost:3000/api/users/me')
    } catch (error) {
      console.error(error)
    }
  }

  // Displayed Items
  return (
    <div>
      <h3>template</h3>
      <Navigation pathname={ pathname }/>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/projects" element={<Banners allBanners={allBanners} setAllBanners={setAllBanners} />} />
				<Route path="/banners" element={<Banners allBanners={allBanners} setAllBanners={setAllBanners} />} />
				<Route path="/banners/:id" element={<SingleBanner allBanners={allBanners}  />} />

      </Routes>    
    </div>
  )
}

export default App
