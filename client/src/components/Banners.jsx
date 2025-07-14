import { Link } from "react-router-dom"

const Banners = ({ allBanners, setAllBanners }) => {
    return (
        <div>
            {
                allBanners.map((banner) => {
                    return (
                        <div key={banner.id}>
                            <a href={`${banner.link}`} target="_blank">
                                <h4>{banner.name} - {banner.width} x {banner.height}</h4>
                            </a>
                        </div>
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