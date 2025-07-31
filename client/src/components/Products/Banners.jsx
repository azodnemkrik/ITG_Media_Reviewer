import { Link } from "react-router-dom"

const Banners = ({ allBanners , allUsers , user }) => {

    return (
        <div className="allBannersContainer">
            {
                allBanners.filter(banner => banner.org_code === user.org_code || user.org_code === "ITG")
                .map((banner) => {
                    return (
                        <div className="bannerCard" key={banner.id}>
                            <p>
                            {banner.creative_name}<br />
                            {banner.org_code}-{banner.job_number}<br />
                            {banner.width} x {banner.height}<br />
                            <iframe className='hidden' src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id}></iframe><br />
                            <a href={banner.link} target={banner.id}>Reload Banner</a></p>
                            <hr />
                        </div>
                        // <div key={banner.id}>
                        //     <a href={`${banner.link}`} target="_blank">
                        //         <h4>{banner.name} - {banner.width} x {banner.height}</h4>
                        //     </a>
                        // </div>
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