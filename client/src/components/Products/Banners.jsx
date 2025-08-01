import { Link } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const Banners = ({ allBanners , allUsers , user , allOrganizations}) => {

    useGSAP(() => {
		if (allBanners.length !== 0) {
			gsap.from(".bannerCard", .75 , { autoAlpha: 0, rotation: 45 , x: -200 , y: 100 , ease: 'power4.inOut', stagger: 0.05 });
		}
	}, [allBanners, allOrganizations])

    return (
        <div className="allBannersContainer">
            {
                allBanners.filter(banner => banner.org_code === user.org_code || user.org_code === "ITG")
                .map((banner) => {
                    return (
                        <Link to={`/banners/${banner.id}`} state={{ from: 'banners' }} className="bannerLink" key={banner.id}>
                        <div className="bannerCard" key={banner.id}>
                            <img className="orgLogo" src={allOrganizations.find(org => org.org_code === banner.org_code)?.logo} alt={banner.org_code} />
                            <p>
                                {banner.creative_name}<br />
                                {banner.org_code}-{banner.job_number}<br />
                                {banner.width} x {banner.height}<br />
                            </p>
                        </div>
                    </Link>
                    )
                })
            }
        </div>
    )
}

export default Banners

/*
<iframe src='https://www.w3schools.com' title='banner'></iframe>

*/