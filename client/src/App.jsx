import { useState, useEffect } from 'react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Banners from './components/banners';
import Home from './components/Home';
import SingleBanner from './components/SingleBanner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';


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
        const { data } = await axios.get('/api/banners')
        console.log("data:", data)
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
      const response = await axios.get('/api/users/me')
    } catch (error) {
      console.error(error)
    }
  }

  // Displayed Items
  return (
    <div>
      <Navigation user={user} pathname={ pathname }/>

			<Routes>
				<Route path="/" element={<Home user={user}/>} />
				<Route path="/projects" element={<Banners allBanners={allBanners} setAllBanners={setAllBanners} />} />
				<Route path="/banners" element={<Banners allBanners={allBanners} />} />
				<Route path="/banners/:id" element={<SingleBanner allBanners={allBanners}  />} />

      </Routes>    
      <Footer pathname={ pathname } />
    </div>
  )
}

export default App
