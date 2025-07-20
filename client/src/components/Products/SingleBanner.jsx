import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import React from 'react';

const SingleBanner = ({ allBanners , allStoryboards , allFrames }) => {
    const params = useParams()
    const id = params.id

    console.log("PARAM:", params.id)
    const banner = allBanners.find((banner) => {
        console.log(banner.width)
        return banner.id === id
    })

    const storyboard = allStoryboards.find((storyboard) => {
        console.log(storyboard.id)
        return storyboard.banner_id === id
    })

    // const frames = allFrames.filter((frame) => {
    //     frame.storyboard_id === storyboard.id 
    //     return (
    //         <li>{frame.link}</li>
    //     )
    // })



    return (

        
        <div className="singleBanner">
            {
                !banner ? (<h2>Loading...</h2>) : (
                    <div>
                        <p>Project: <span className="projectStyle">{banner.org_code}-{banner.job_number}</span></p>
                        <p>Creative: <span className="projectStyle">{banner.creative_name} {banner.width} x {banner.height}</span></p>
                        <iframe src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id}></iframe><br />
                        <a href={banner.link} target={banner.id}>Reload Banner</a>
                        <ul></ul>
                    </div>
                )
            }
        </div>
    )
}

export default SingleBanner;

/*
                            <h3>ID:{banner.id}</h3>
                            <h3>{banner.creative_name} ({banner.creative_id})</h3>

*/ 