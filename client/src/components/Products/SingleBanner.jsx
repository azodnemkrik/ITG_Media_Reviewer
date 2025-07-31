import { useParams, Link, useLocation } from "react-router-dom";
import { use, useEffect, useRef, useState } from 'react';
import React from 'react';

const SingleBanner = ({ allBanners, allStoryboards, allFrames }) => {
	const params = useParams()
	const id = params.id
	const [showFrames, setShowFrames] = useState(true);
	const [onionSkinMode, setOnionSkinMode] = useState(false);
	const location = useLocation();

	// console.log("PARAM:", params.id)

	const banner = allBanners.find((banner) => {
		// console.log(banner.width)
		return banner.id === id
	})

	// Define Frames based on the banner
	const frames = allFrames.filter((frame) => {
		return frame.banner_id === banner?.id
	})

	useEffect(() => {
		if (banner && frames) {
			setShowFrames(false);
		}
	}, [banner, frames.length]);

	// Set the first pagination button as selected when frames are available
	useEffect(() => {
		if (frames.length > 0) {
			const firstPaginationButton = document.querySelector('.pagination .paginationBorder');
			if (firstPaginationButton) {
				firstPaginationButton.classList.add('selectedButton');
			}
		} else {
			const pagination = document.querySelector('.pagination');
			const verticalButtons = document.querySelector('.verticalButtons');
			if (pagination) {
				pagination.classList.add('hidden');
				verticalButtons.classList.add('hidden');
			}
		}
	}, [frames.length, showFrames]);

	useEffect(() => {
		const iframe_and_frames_container = document.querySelector('.iframe_and_frames_container');
		const framesContainer = document.querySelector('.framesContainer');
		const frameParts = document.querySelector('.frameParts');
		const frameOrSkinsToggleButtons = document.querySelectorAll('.frameOrSkinsToggleButton');

		// This runs whenever showFrames changes
		if (iframe_and_frames_container) {
			const pagination = document.querySelector('.pagination');

			if (showFrames) {
				console.log("Frames are now visible", showFrames);

				// Detect whether it is a horizontal type banner or vertical type banner
				// console.log("banner dimensions:", banner.width, "x", banner.height);
				if (banner.width > 2 * banner.height) {
					iframe_and_frames_container.style.height = `${banner.height * 2 + 50}px`;
					iframe_and_frames_container.classList.add('column');
					framesContainer.style.marginLeft = '23px';
				} else {
					iframe_and_frames_container.style.width = `${banner.width * 2 + 50}px`;
					iframe_and_frames_container.classList.add('row');
				}

				// Check if pagination and frameParts exist before modifying their classes
				pagination?.classList.remove('hidden');
				frameParts?.classList.remove('hidden');
				frameOrSkinsToggleButtons.forEach((button) => {
					button.classList.remove('hidden');
				});
			} else {
				console.log("Frames are now hidden", showFrames);

				// Bring back to the original dimensions
				iframe_and_frames_container.style.width = `${banner.width}px`;
				iframe_and_frames_container.style.height = `${banner.height}px`;
				iframe_and_frames_container.classList.remove('column');
				iframe_and_frames_container.classList.remove('row');
				framesContainer.style.marginLeft = '0px';
				pagination?.classList.add('hidden');
				frameParts?.classList.add('hidden');
				frameOrSkinsToggleButtons.forEach((button) => {
					button.classList.add('hidden');
				});

			}

		}
	}, [showFrames]);


	const filteredFrameElements = frames.filter((frame) => {
		return frame.banner_id === banner.id
	}).map((frame, index) => (
		index > 0 ? (
			<img key={frame.id} className={`frame hidden frame${index + 1}`} src={frame.link} width={banner.width} height={banner.height} alt={`Frame for banner ${banner.id}`} />
		) : (
			<img key={frame.id} className={`frame frame${index + 1}`} src={frame.link} width={banner.width} height={banner.height} alt={`Frame for banner ${banner.id}`} />
		)
	));

	let frameOpacity = 1;


	const updateFrame = (event) => {
		const buttonElements = document.querySelectorAll('.paginationBorder');
		buttonElements.forEach((button) => {
			button.classList.remove('selectedButton');
		});

		const clickedButton = event.target;
		clickedButton.classList.add('selectedButton');

		const framesContainer = document.querySelector('.framesContainer');
		const frameElements = framesContainer.querySelectorAll('.frame');
		frameElements.forEach((frame, index) => {
			frame.classList.add('hidden');
		});
		// console.log(`Current Frame: .frame${event.target.innerText}`);
		const currentFrame = document.querySelector(`.frame${event.target.innerText}`);
		// currentFrame.style.opacity = frameOpacity;
		currentFrame.classList.remove('hidden');
	}

	const resetFrames = () => {
		const buttonElements = document.querySelectorAll('.paginationBorder');
		buttonElements.forEach((button) => {
			button.classList.remove('selectedButton');
		});
		const currentFrame = document.querySelector(".frame1");
		currentFrame.classList.remove('hidden');
	}



	// let onionSkinMode = true;

	const handleToggleFrameOrSkins = () => {
		const iframe_and_frames_container = document.querySelector('.iframe_and_frames_container');
		const framesContainer = document.querySelector('.framesContainer');
		const frameElements = framesContainer.querySelectorAll('.frame');

		if (!onionSkinMode) {
			// Switching to frames mode
			iframe_and_frames_container.style.width = `${banner.width}px`;
			console.log("adding float class");
			framesContainer.classList.add('float');
			framesContainer.style.marginLeft = '0px';
			frameOpacity = .5;
			frameElements.forEach((frame) => {
				frame.style.opacity = frameOpacity;
			});
		} else {
			// Switching to onion skin mode  
			if (banner.width > 2 * banner.height) {
				iframe_and_frames_container.style.height = `${banner.height * 2 + 50}px`;
			} else {
				iframe_and_frames_container.style.width = `${banner.width * 2 + 50}px`;
			}



			framesContainer.style.marginLeft = '23px';
			console.log("removing float class");
			framesContainer.classList.remove('float');
			frameOpacity = 1;
			frameElements.forEach((frame) => {
				frame.style.opacity = frameOpacity;
			});
		}

		setOnionSkinMode(!onionSkinMode);
	}

	const frameOrSkinsToggle = () => {
		if (onionSkinMode) {
			return (
				<a href="#" onClick={handleToggleFrameOrSkins} className="frameOrSkinsToggleButton"><span className="material-symbols-outlined" title="Onion Skin Mode">animation</span></a>
			)
		} else {
			return (
				<a href="#" onClick={handleToggleFrameOrSkins} className="frameOrSkinsToggleButton"><span className="material-symbols-outlined" title="Storyboard Mode">photo_frame</span></a>
			)
		}
	}

	const handleToggleShowFrames = () => {
		const iframe_and_frames_container = document.querySelector('.iframe_and_frames_container');
		const framesContainer = document.querySelector('.framesContainer');
		const frameElements = framesContainer.querySelectorAll('.frame');
		const frameParts = document.querySelector('.frameParts');
		const frameOrSkinsToggleButtons = document.querySelectorAll('.frameOrSkinsToggleButton');
		const pagination = document.querySelector('.pagination');

		if (showFrames) {
			// Switching to HIDE FRAMES mode
			// console.log("banner dimensions:", banner.width, "x", banner.height);
			if (banner.width > 2 * banner.height) {
				iframe_and_frames_container.style.height = `${banner.height * 2 + 50}px`;
			} else {
				iframe_and_frames_container.style.width = `${banner.width * 2 + 50}px`;
			}
			pagination.classList.remove('hidden');
			// frameParts.classList.remove('hidden');
			frameOrSkinsToggleButtons.forEach((button) => {
				button.classList.remove('hidden');
			});
			if (onionSkinMode) {
				handleToggleFrameOrSkins();
			}
			resetFrames();

		} else {
			// Switching to SHOW FRAMES mode
			iframe_and_frames_container.style.width = `${banner.width}px`;
			iframe_and_frames_container.style.height = `${banner.height}px`;
			pagination.classList.add('hidden');
			// frameParts.classList.add('hidden');
			frameOrSkinsToggleButtons.forEach((button) => {
				button.classList.add('hidden');
			});
			frameElements.forEach((frame) => {
				frame.classList.add('hidden');
			});
			frameParts.firstChild.classList.remove('hidden');
			console.log("onionSkinMode", onionSkinMode);

		}

		setShowFrames(!showFrames);
	}

	const showOrHideFramesToggle = () => {
		if (showFrames) {
			return (
				<a href="#" onClick={handleToggleShowFrames}><span className="material-symbols-outlined" title="Frames Showing">visibility</span></a>
			)
		} else {
			return (
				<a href="#" onClick={handleToggleShowFrames}><span className="material-symbols-outlined" title="Frames Hidden">visibility_off</span></a>
			)
		}
	}
	return (

		<div className="singleBanner">
			{
				!banner ? (<h2>Loading...</h2>) : (
					<>
						<p>Project: <span className="projectStyle">{banner.org_code}-{banner.job_number}</span></p>
						<p>Creative: <span className="projectStyle">{banner.creative_name}-{banner.width}x{banner.height}</span></p>
						<div className="iframe_and_frames_container" style={{ width: banner.width, height: banner.height }}>
							<div className="banner_and_replay_container" style={{ width: banner.width, height: banner.height }}>
								<a className="float replayButton" href={banner.link} target={banner.id}><span className="material-symbols-outlined">
									replay
								</span></a>
								<iframe className="banner-iframe" src={banner.link} width={banner.width} height={banner.height} title='banner' name={banner.id} frameborder="0"></iframe>
							</div>

							<div className="framesContainer">
								<div className="frames_and_toggle_container">
									<div className="frameParts">
										{filteredFrameElements}
									</div>
									<div className="verticalButtons">
										{showOrHideFramesToggle()}
										{frameOrSkinsToggle()}
									</div>

								</div>
								<div className="pagination" width={banner.width}>
									{
										filteredFrameElements.map((frame) => (
											// <a href="#" onClick={updateFrame} title={`Frame ${filteredFrameElements.indexOf(frame) + 1}`}>
											<div className="paginationBorder" onClick={updateFrame}>
												<p className="paginationNumber">{filteredFrameElements.indexOf(frame) + 1}</p>
											</div>
											// </a>
										))
									}
								</div>
							</div>
						</div>
					</>
				)
			}
			{location.state?.from === 'banners' ? (
				<Link to="/banners" className="backTo">
					<span className="material-symbols-outlined">arrow_back</span>
					Back to Banners
				</Link>
			) : (
				<Link to="/projects" className="backTo">
					<span className="material-symbols-outlined">arrow_back</span>
					Back to Projects
				</Link>
			)}
			{/* <Link to="/projects" className="backToProjectsLink"><span className="material-symbols-outlined">arrow_back</span>Back to Projects</Link> */}
		</div>
	)
}

export default SingleBanner;

/*
								{ <div className="radioButtonsContainer" onChange={onRadioChangeValue}>
									 <label>
										  Frames <input type="radio" className="radioToggle" name="status" value="frames" />
									 </label>
									 <label>
										  Onion Skin <input type="radio" className="radioToggle" name="status" value="onionSkin" />
									 </label>
								</div> 

*/ 