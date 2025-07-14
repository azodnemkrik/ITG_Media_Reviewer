import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import React from 'react';

const SingleBanner = ({ allBanners }) => {
    const params = useParams()
    const id = params.id
    const sliderRef = useRef(null);
    const iframeRef = useRef(null);
    
    console.log("PARAM", params.id)
    const banner = allBanners.find((banner) => {
        return banner.id === id
    })

    // Set up the slider event listener
    useEffect(() => {
        if (!banner || !sliderRef.current) return;

        const slider = sliderRef.current;
        const iframe = iframeRef.current;
        
        const handleSliderChange = (e) => {
            const sliderValue = e.target.value;
            console.log("Slider value:", sliderValue);
            
            try {
                // Access the iframe's content window
                const iframeWindow = iframe.contentWindow;
                
                // Check if the maintl timeline exists in the iframe
                if (iframeWindow && iframeWindow.maintl) {
                    iframeWindow.maintl.progress(sliderValue);
                } else {
                    console.log("Timeline not found in iframe");
                }
            } catch (error) {
                console.error("Error accessing iframe content:", error);
            }
        };

        slider.addEventListener('input', handleSliderChange);

        // Cleanup event listener on unmount
        return () => {
            slider.removeEventListener('input', handleSliderChange);
        };
    }, [banner]);


    return (
        <div>
            <h3>Single Banner</h3>
            {
                !banner ? (<h2>Loading...</h2>) : (
                    <div>
                        <h3>Project: {banner.name}</h3>
                        <iframe 
                            ref={iframeRef}
                            name="iFrame" 
                            src={banner.link} 
                            width={banner.width} 
                            height={banner.height} 
                            title={banner.name}
                        ></iframe>
                        <br />
                        <a href={banner.link} target="iFrame">Reload Banner</a>

                    </div>
                )
            }
            <input 
                ref={sliderRef}
                type="range" 
                className="slider" 
                name="maintl" 
                min="0" 
                max="1" 
                defaultValue="0" 
                step="0.01"
            />
            <br />
        </div>
    )
}

export default SingleBanner;