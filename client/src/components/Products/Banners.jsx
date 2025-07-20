import { Link } from "react-router-dom"

const Banners = ({ allBanners }) => {

    return (
        <div>
            {
                allBanners.map((banner) => {
                    return (
                        <div>
                            <h3>ID:{banner.id}</h3>
                            <p>{banner.creative_name} ({banner.creative_id})</p>
                            <p>Dimensions: {banner.width} x {banner.height}</p>
                            <iframe src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id}></iframe><br />
                            <input type="range" className="slider" name="maintl" min="0" max="1" defaultValue="0" step="0.01" /><br />
                            <a href={banner.link} target={banner.id}>Reload Banner</a>
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