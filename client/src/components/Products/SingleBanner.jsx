import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import React from 'react';

const SingleBanner = ({ allBanners }) => {
    const params = useParams()
    const id = params.id
    const sliderRef = useRef(null);
    const iframeRef = useRef(null);

    console.log("PARAM:", params.id)
    const banner = allBanners.find((banner) => {
        console.log(banner.width)
        return banner.id === id
    })

    // Set up the slider event listener
    useEffect(() => {
    if (!banner || !sliderRef.current || !iframeRef.current) return;

    const slider = sliderRef.current;
    const iframe = iframeRef.current;

    const handleSliderChange = (e) => {
        const sliderValue = e.target.value;
        // Send message to iframe
        iframe.contentWindow.postMessage(
            { type: 'GSAP_PROGRESS', value: sliderValue },
            '*' // Use specific origin in production
        );
    };

    slider.addEventListener('input', handleSliderChange);

    return () => {
        slider.removeEventListener('input', handleSliderChange);
    };
}, [banner]);


    return (
        /*
    CREATE TABLE banners (
      id UUID PRIMARY KEY,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      job_number VARCHAR(100) REFERENCES projects(job_number),
      creative_id UUID REFERENCES creatives(id),
      creative_name VARCHAR(100) REFERENCES creatives(creative_name),
      is_mobile BOOLEAN DEFAULT false NOT NULL,
      link TEXT NOT NULL,
      CONSTRAINT creative_and_banner UNIQUE(creative_id, id)
    );
        */
        <div className="singleBanner">
            {
                !banner ? (<h2>Loading...</h2>) : (
                    <div>
                        <p>Project: <span className="projectStyle">{banner.org_code}-{banner.job_number}</span></p>
                        <p>Creative: <span className="projectStyle">{banner.creative_name} {banner.width} x {banner.height}</span></p>
                        <iframe ref={iframeRef} src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id}></iframe><br />
                        <input type="range" ref={sliderRef} className="slider" name="maintl" min="0" max="1" defaultValue="0" step="0.01" /><br />
                        <a href={banner.link} target={banner.id}>Reload Banner</a>
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