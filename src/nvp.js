class nplayer{
	constructor(target,options){
		
		this.target = target;
		this.videoSource = options.videoSource;
		this.images = options.images;
		this.textDisplay = options.textDisplay;				
		
		//maincontainer
		this.container = document.querySelector(`#${this.target}`);
		
		// genrating html before initializing newly created content
		this.generateHTML();

		// Class values 
		this.narrativeSize = this.narrSize(options.narrativesSize);
		this.soundBeingChanged = false;
		this.lastSavedVolume = 1;
		this.sliderXOffset = 0;
		this.hovering = false;


		// HTML elements
		this.narrativesSlider = this.container.querySelector('.narratives-slider');
		this.narrativesWindow = this.container.querySelector('.narratives');
		this.narratives = this.container.querySelectorAll('.narrative');
		this.video = this.container.querySelector('.video');
		this.playButton = this.container.querySelector('.play-button');
		this.soundButton = this.container.querySelector('.sound-button');
		this.soundSlider = this.container.querySelector('.sound-slider input[type="range"]');
		this.progressBar = this.container.querySelector('.current-progress');
		this.fullScreenButton = this.container.querySelector('.full-screen');
		this.controlsBackground = this.container.querySelector(".controls-background");
		this.controls = this.container.querySelector('.controls');
		this.progressContainer = this.container.querySelector(".progress-bar-container");
		this.narrativePos = this.container.querySelector(".narrative-position");
		this.narrativeDesc = this.container.querySelector(".text-display"); 
		this.innerSlider = this.container.querySelector('.narr-inner-slider');

		// graphic elements
		this.playImage= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.049 3.74" height="14.136" width="11.525"><path d="M.002 3.499c0 .223.156.306.348.187l2.556-1.599c.192-.12.19-.315 0-.435L.349.054C.156-.066 0 .022 0 .241V3.5h.002z" fill="#fff"/></svg>`;
		this.pauseImage = `<svg width="69.4" height="82.1" viewBox="0 0 18.4 21.7" xmlns="http://www.w3.org/2000/svg"><g fill="#f9f9f9" color="#000"><path d="M3.3 0A3 3 0 00.9 1.3c-.5.8-.9 1.9-.9 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.3 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 003.3 0zM15 0a3 3 0 00-2.3 1.3c-.6.8-1 1.9-1 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.4 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 0015.1 0z"/></g></svg>` ;
		this.soundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96zm2.26.96c0-.19-.13-.32-.32-.32v.64c.2 0 .32-.13.32-.32zm.64 0A.96.96 0 002.8 1l-.1.3c.3.06.52.31.52.63s-.22.58-.51.64l.13.3c.38-.1.7-.49.7-.94zM2.76.31L2.63.6c.8.12 1.23.75 1.23 1.32 0 .58-.5 1.12-1.15 1.28l.12.29c.73-.16 1.35-.83 1.35-1.57 0-.73-.57-1.5-1.42-1.61z" fill="#fff"/></svg>`;
		this.noSoundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M2.78 1.26l-.26.26.4.4-.4.4.26.26.4-.4.4.4.25-.26-.4-.4.4-.4-.25-.26-.4.4zM.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96z" color="#000" fill="#fff"/></svg>`;
		this.fullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><g><path style="color:#000000;fill:#ffffff" d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51 H306v76.5h51V0H229.5z"/></g></svg>`;
		

		// initializing graphics
		this.playButton.innerHTML = this.playImage;
		this.soundButton.innerHTML = this.soundIcon;
		this.fullScreenButton.innerHTML = this.fullScreenIcon;


		// at start 
		this.startingIconsResize(this.narrativeSize);


		

		// adding the player to a variable in order to call it later
		// THIS IS UGLY BUT FOR NOW THIS IS FINE 
		const theplayer = this;
		
		// narratives listeners

		this.narratives.forEach( function(narrative) {
			narrative.addEventListener("click", () => theplayer.narrativePlay(narrative));	
			
			narrative.addEventListener("keypress", function (e) {		

				if (e.charCode == 32 || e.charCode == 13){
					theplayer.narrativePlay(narrative);
				}
			})

			narrative.addEventListener("mouseover", function() {

				theplayer.narrativeProgressBarHighlight(narrative);
				theplayer.narrativePos.classList.remove('invisible');

				// checking if text need be displayed
				if (theplayer.textDisplay != "no") {
					theplayer.populateNarrativeDesc(narrative);
					theplayer.narrativeDesc.classList.remove('invisible');
				}
			});

			narrative.addEventListener("focus", function() {
				theplayer.narrativeProgressBarHighlight(narrative);
				theplayer.narrativePos.classList.remove('invisible');

				// checking if text need be displayed
				if (theplayer.textDisplay != "no") {
					theplayer.populateNarrativeDesc(narrative);
					theplayer.narrativeDesc.classList.remove('invisible');
				}
			});

			narrative.addEventListener("mouseout", function() {		
				theplayer.narrativePos.classList.add('invisible');
				// checking if text need be displayed
				if (theplayer.textDisplay != "no") {
					theplayer.narrativeDesc.classList.add('invisible');
				}
			});	

		});
		
		window.addEventListener("resize", function(){
			theplayer.narrativesIconsResize(theplayer.narrativeSize)
		});

		

		// control listeners

		// Sound
		
		this.soundButton.addEventListener("click", () => theplayer.toggleSound() );
		this.soundSlider.addEventListener("mousedown", () => theplayer.soundBeingChanged = true);
		this.soundSlider.addEventListener("mousemove", () => theplayer.soundBeingChanged && theplayer.soundVolume());
		this.soundSlider.addEventListener("mouseup", () => theplayer.soundBeingChanged = false);
		this.soundSlider.addEventListener("change", () => theplayer.soundVolume());

		// Play

		this.playButton.addEventListener("click", () => theplayer.playVideo() );
		this.video.addEventListener("click", () => theplayer.playVideo() );		
		this.video.addEventListener("ended", function(){
			theplayer.alterPlayButton(theplayer.playImage); 
			theplayer.keepExtended(); 
		});

		// Fullscreen
		this.fullScreenButton.addEventListener("click", function () {
			theplayer.toggleFullScreen(theplayer.container);
		});

		// Progress
		this.progressContainer.addEventListener("click", function(e) {
			theplayer.navigateThroughProgressBar(e);
		});
		

		this.video.addEventListener('timeupdate', (e) => {			
			theplayer.videoProgress();
			theplayer.narrativeHighlight();
		});


		// Slider 
		

		this.video.addEventListener('mousemove', (e) => {
			theplayer.getSliderXOffset(e);	
		});

		this.video.addEventListener('mouseover', () => {
			theplayer.hovering = true;			
			setInterval(() => theplayer.slidingSlider(), 40);	
		})

		this.video.addEventListener('mouseout', () => {
			theplayer.hovering = false;				
		})
	}



	narrSize(size) {
		if (size == 'big') {
			return 7;
		} else if (size == 'bigger') {
			return 6;
		}else if (size == 'normal') {
			return 8;
		} else if (size == 'small') {
			return 9;
		} else {
			return parseInt(size);
		}
	};

	generateHTML() {
		
		let nvpContainer = document.querySelector(`#${this.target}`);
		nvpContainer.classList.add('nvp-container');

		let narrativesChildren = "";

			this.images.map(function(narr){
			
			narrativesChildren += `
						<div class='narrative' role="button" tabindex="0">
							<img src='${narr.url}' data-time='${narr.start}' data-title='${narr.title}'>
							<div class='inner-progress invisible'>
								<div class='inner-progress-default'>
									<div class='inner-progress-advance'>
									</div>
								</div>
							</div>
						</div>
			`
			});


			let textDis = "";
			if (this.textDisplay != "no") {
				textDis = `
					<div class="text-display invisible">
					
					</div>
				`
			};

			nvpContainer.innerHTML += `
				<video class="video">
				  	<source src="${this.videoSource}" type="video/mp4">
				  	
				  		Your browser does not support HTML video.
				</video>
				
				<div class="controls-background">
				</div>

				
				

				<div class="controls unselectable">
					
					${textDis}

					<div class="narratives">
						<div class="narratives-slider">
							<div class="narr-inner-slider">
								
							${narrativesChildren}
								
							</div>
						</div>					
					</div>	
					
					<div class="interact">

							
							<div class="left">
								<button class="play-button button" alt="play video" tabindex="0">				
								</button>

								<button class="sound-button button" alt="toggle sound" tabindex="0">				
								</button>

								<div class="sound-slider">						
									<input type="range" min="0" max="100" value="100" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" tabindex="0">						
								</div>
							</div>				
							

							<div class="right">
								<button class="full-screen button" alt="toggle fullscreen" tabindex="0">				
								</button>
							</div>

					</div>	

					<div class="progress-bar-container">
						<div class="progress-bar">
							<div class="current-progress">
							</div>
							<div class="narrative-position invisible">						
							</div>
						</div>
					</div>
				</div>
			
				`;

		};

	playVideo() {	
		
		if (this.video.paused) {
			this.video.play();
			this.togglePlayIcon();
			this.keepRetracted ();		
		} else {
			this.video.pause();
			this.togglePlayIcon();	
			this.keepExtended();	
		}	
	}	

	togglePlayIcon() {
		if (this.video.paused) {
			this.playButton.innerHTML = this.playImage;
		} else {
			this.playButton.innerHTML = this.pauseImage;
		}
	}

	keepExtended () {
		this.controls.classList.remove("retracted-position");
		this.controlsBackground.classList.remove("retracted-position");
	}

	keepRetracted () {
		this.controls.classList.add("retracted-position");
		this.controlsBackground.classList.add("retracted-position");
	}

	alterPlayButton(target) {	
		this.playButton.innerHTML = target;
	}

	narrativePlay(narrative) {	
		this.video.play();
		this.playButton.innerHTML = this.pauseImage;
		this.video.currentTime = this.convertTime(narrative);
		this.keepRetracted ();
		this.unFade();
	}

	convertTime (narrative) {
		let time = narrative.querySelector('img').dataset.time;
		const splitTime = time.split(':').reverse();
		let seconds = 0;
		
		for (let i=0; i < splitTime.length; i++) {
			seconds += parseInt(splitTime[i])*Math.pow(60,i);			
		};
		
		return seconds;
	}


	unFade () {
		this.video.classList.remove("fade-in-transition");	
		void this.video.offsetWidth;
		this.video.classList.add("fade-in-transition");	
	}

	toggleSound() {
		if (this.video.volume == 0 || this.video.muted == true) {
			this.video.volume = this.lastSavedVolume;
			this.soundSlider.value = this.lastSavedVolume * 100;
			this.video.muted = false;
			if (this.lastSavedVolume != 0) {
				this.soundButton.innerHTML = this.soundIcon;
			}
		} else {
			this.video.volume = 0;
			this.soundSlider.value = 0;
			this.soundButton.innerHTML = this.noSoundIcon; 
		}
	}

	toggleSoundIconForMute() {
		if (this.video.muted == true) {
			this.video.volume = 0;
			this.soundButton.innerHTML = this.noSoundIcon; 
			this.soundSlider.value = 0;			
		} 		
	}

	soundVolume() {	
		this.lastSavedVolume = this.soundSlider.value / 100;
		this.video.volume = this.lastSavedVolume;
		if (this.video.volume == 0) {
			this.soundButton.innerHTML = this.noSoundIcon;
		} else {
			this.video.muted = false;
			this.soundButton.innerHTML = this.soundIcon;
		}
	}

	videoProgress() {
		const progressValue = this.video.currentTime / this.video.duration * 100;
		this.progressBar.style.width = `${progressValue}%`;
	}

	toggleFullScreen(element) {
		const addFullScreen = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
		const removeFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
	 
	  if (document.fullscreen) {
	  	removeFullScreen.call(document); 
	  	this.container.classList.remove('nvp-fullscreen-cleanup');   
	  } else { 
	    addFullScreen.call(element);
	    this.container.classList.add('nvp-fullscreen-cleanup');
	  }; 

	}


	narrativesIconsResize (factor) {		
		let sliderHeight = Math.round(this.container.offsetHeight / factor);	
		this.narrativesSlider.style.height = sliderHeight+"px";	
	}

	startingIconsResize (factor) {	
		let sliderHeight = this.container.offsetHeight / factor;	
		this.narrativesSlider.style.height = Math.round(sliderHeight*(1+(1/factor)))+"px";
	}

	narrativeProgressBarHighlight (narrative) {
		let pixBySecond = this.progressContainer.offsetWidth / this.video.duration;

		let narrDuration = 0;
		if (narrative.nextElementSibling) {
			narrDuration = this.convertTime(narrative.nextElementSibling) - this.convertTime(narrative);
		} else {
			narrDuration = this.video.duration - this.convertTime(narrative);
		};
		
		let narrStart = this.convertTime(narrative);		
		const narrStartPix = narrStart*pixBySecond;
		const narrDurationPix = narrDuration*pixBySecond;
		this.narrativePos.style.left = narrStartPix+"px";
		this.narrativePos.style.width = narrDurationPix+"px";
		
	}

	navigateThroughProgressBar (e) {
		const startPoint = e.offsetX / this.progressContainer.offsetWidth * this.video.duration
		this.video.currentTime = startPoint;
	}

	populateNarrativeDesc (narrative) {
		this.narrativeDesc.innerHTML = `<p>${narrative.querySelector('img').dataset.title}</p>`;
	}

	narrativeHighlight() {
		let orderedNarratives = Array.from(this.narratives)
		.map(narr => this.convertTime(narr))
		.sort( function(a, b) {
			if (a>=b) {
				return -1
			} else {
				return 1
			}
		});
		
		let currentNarr = 0;
		for (let i=0; i < orderedNarratives.length; i++) {
			if (orderedNarratives[i] < this.video.currentTime){
				currentNarr = orderedNarratives.length - i -1;
				break;
			}				
		};
		
		this.narratives.forEach( function(narr, index) {
			if (index == currentNarr) {
				narr.querySelector('img').classList.add('highlight-narrative');
				// can't figure out the CSS for showing a progress bar in each narrative
				// without breaking EDGE display 
				// narr.querySelector('.inner-progress').classList.remove('invisible');

			} else {
				narr.querySelector('img').classList.remove('highlight-narrative');
				narr.querySelector('.inner-progress').classList.add('invisible');
			}
		});		

	}
		

	slidingSlider() {
		
		const maxOffset = (this.innerSlider.offsetWidth - this.video.offsetWidth) / 2
		
		if (this.hovering == true) {		
				this.innerSlider.style.left = (parseInt(this.innerSlider.style.left) || 0) + this.sliderXOffset + "px";						
		}		

		// stopping slider at both ends

		if (Math.abs((parseInt(this.innerSlider.style.left) || 0)) > Math.abs(maxOffset)) {
			if (Math.sign((parseInt(this.innerSlider.style.left) || 0)) == 1) {
				this.innerSlider.style.left = maxOffset+"px";			
			} else {
				this.innerSlider.style.left = "-"+maxOffset+"px";			
			}			
		}

	}

	getSliderXOffset(e) {
		let mouseXPosition = 0;		
		mouseXPosition = e.offsetX / this.video.offsetWidth;
		
		if (this.innerSlider.offsetWidth > this.video.offsetWidth) {
			
			if (mouseXPosition < 0.5) {
				this.sliderXOffset = (0.5 - mouseXPosition)*50*(this.video.offsetWidth/1000);	
				// 	(video.offsetWidth/1000) allows bigger moves on bigger videos 	
							
			} else {
				this.sliderXOffset = -(mouseXPosition - 0.5)*50*(this.video.offsetWidth/1000);
				// 	(video.offsetWidth/1000) allows bigger moves on bigger videos 			
			}	
			

		}	else {
			// need to reset this value when user switch from fullscreen forth and back
			this.sliderXOffset = 0;
		}
	}

	

	

};

export default nplayer;