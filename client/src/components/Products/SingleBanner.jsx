import { useParams } from "react-router-dom";
import { useEffect, useRef } from 'react';
import React from 'react';

const SingleBanner = ({ allBanners, allStoryboards, allFrames }) => {
    const params = useParams()
    const id = params.id

    console.log("PARAM:", params.id)
    const banner = allBanners.find((banner) => {
        console.log(banner.width)
        return banner.id === id
    })

    // const storyboard = allStoryboards.find((storyboard) => {
    //     console.log(storyboard.id)
    //     return storyboard.banner_id === id
    // })

    const frames = allFrames.filter((frame) => {
        frame.banner_id === banner.id
        return (
            <img src={frame.link} alt={`Frame for banner ${banner.id}`} />
        )
    })

    let frameOpacity = 1;

    const onRadioChangeValue = (event) => {
        const iframe_and_frames_container = document.querySelector('.iframe_and_frames_container');
        const framesContainer = document.querySelector('.framesContainer');
        if (event.target.value === 'frames') {
            iframe_and_frames_container.style.width = `${banner.width * 2 + 50}px`;
            framesContainer.classList.remove('float');
            frameOpacity = .5;
            frame.style.opacity = frameOpacity;
        }
        if (event.target.value === 'onionSkin') {
            iframe_and_frames_container.style.width = `${banner.width}px`;
            framesContainer.classList.add('float');
            frameOpacity = 1;
            frame.style.opacity = frameOpacity;
        }
    }

    const updateFrame = (event) => {
        const framesContainer = document.querySelector('.framesContainer');
        const frameElements = framesContainer.querySelectorAll('.frame');
        frameElements.forEach((frame, index) => {
            frame.classList.add('hidden');
        });
        console.log(`Current Frame: .frame${event.target.innerText}`);
        const currentFrame = document.querySelector(`.frame${event.target.innerText}`);
        // currentFrame.style.opacity = frameOpacity;
        currentFrame.classList.remove('hidden');
    }

    const filteredFrameElements = frames.filter((frame, index) => {
        return frame.banner_id === banner.id
    }).map((frame, index) => (
        <img key={frame.id} className={`frame hidden frame${index + 1}`} src={frame.link} width={banner.width} height={banner.height} alt={`Frame for banner ${banner.id}`} />
    ));

    return (

        <div className="singleBanner">
            {
                !banner ? (<h2>Loading...</h2>) : (
                    <>
                        <p>Project: <span className="projectStyle">{banner.org_code}-{banner.job_number}</span></p>
                        <p>Creative: <span className="projectStyle">{banner.creative_name} {banner.width} x {banner.height}</span></p>
                        <div className="iframe_and_frames_container" style={{ width: banner.width, height: banner.height }}>
                            <iframe className="banner-iframe" src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id} frameborder="0"></iframe>
                            <div className="framesContainer">
                                {
                                    <div width={banner.width} height={banner.height} >
                                        {filteredFrameElements}
                                    </div>
                                }
                                <div className="pagination" width={banner.width}>
                                    {
                                        filteredFrameElements.map((frame) => (
                                            <h3 className="paginationNumber"><a href="#" onClick={updateFrame}>{filteredFrameElements.indexOf(frame) + 1}</a></h3>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="controls">
                            <a href={banner.link} target={banner.id}><span class="material-symbols-outlined">
                                replay
                            </span></a>
                        </div>
                        <div className="radioButtonsContainer" onChange={onRadioChangeValue}>
                            <label>
                                Frames <input type="radio" className="radioToggle" name="status" value="frames" />
                            </label>
                            <label>
                                Onion Skin <input type="radio" className="radioToggle" name="status" value="onionSkin" />
                            </label>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default SingleBanner;

/*
                            <h3>ID:{banner.id}</h3>
                            <h3>{banner.creative_name} ({banner.creative_id})</h3>

        </div>
    )
}

export default SingleBanner;

/*
                            <h3>ID:{banner.id}</h3>
                            <h3>{banner.creative_name} ({banner.creative_id})</h3>

*/ 