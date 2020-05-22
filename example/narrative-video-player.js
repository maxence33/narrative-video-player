
// building the HTML inside passed id

let nvpContainer = document.querySelector(`#${options.ContainerId}`);

function generateHTML (options) {
	let narrativesChildren = "";
	options.images.map(function(narr){
		
		narrativesChildren += `
					<div class='narrative' role="button" tabindex="0">
						<img src='${narr.url}' data-time='${narr.start}' data-text='${narr.description}'>
					</div>
		`
	});


	nvpContainer.innerHTML += `
		<video class="video">
		  	<source src="${options.videoSource}" type="video/mp4">
		  	
		  		Your browser does not support HTML video.
		</video>
		
		<div class="controls-background">
		</div>

		
		

		<div class="controls unselectable">
			
			<div class="text-display invisible">
			
			</div>

			<div class="narratives">
				<div class="narratives-slider">
					${narrativesChildren}
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
		
}

generateHTML(options);

// initializing elements to be listened to or subjects to JS changes

const narrativesSlider = document.querySelector('.narratives-slider');
const narrativesWindow = document.querySelector('.narratives');
const narratives = document.querySelectorAll('.narrative');
const video = document.querySelector('.nvp-video-container .video');
const playButton = document.querySelector('.play-button');
const soundButton = document.querySelector('.sound-button');
const soundSlider = document.querySelector('.sound-slider input[type="range"]');
const progressBar = document.querySelector('.current-progress');
const fullScreenButton = document.querySelector('.full-screen');
const controlsBackground = document.querySelector(".nvp-video-container .controls-background");
const controls = document.querySelector('.controls');
const progressContainer = document.querySelector(".progress-bar-container");
const narrativePos = document.querySelector(".narrative-position");
const playImage= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.049 3.74" height="14.136" width="11.525"><path d="M.002 3.499c0 .223.156.306.348.187l2.556-1.599c.192-.12.19-.315 0-.435L.349.054C.156-.066 0 .022 0 .241V3.5h.002z" fill="#fff"/></svg>`;
const pauseImage = `<svg width="69.4" height="82.1" viewBox="0 0 18.4 21.7" xmlns="http://www.w3.org/2000/svg"><g fill="#f9f9f9" color="#000"><path d="M3.3 0A3 3 0 00.9 1.3c-.5.8-.9 1.9-.9 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.3 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 003.3 0zM15 0a3 3 0 00-2.3 1.3c-.6.8-1 1.9-1 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.4 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 0015.1 0z"/></g></svg>` ;
const soundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96zm2.26.96c0-.19-.13-.32-.32-.32v.64c.2 0 .32-.13.32-.32zm.64 0A.96.96 0 002.8 1l-.1.3c.3.06.52.31.52.63s-.22.58-.51.64l.13.3c.38-.1.7-.49.7-.94zM2.76.31L2.63.6c.8.12 1.23.75 1.23 1.32 0 .58-.5 1.12-1.15 1.28l.12.29c.73-.16 1.35-.83 1.35-1.57 0-.73-.57-1.5-1.42-1.61z" fill="#fff"/></svg>`;
const noSoundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M2.78 1.26l-.26.26.4.4-.4.4.26.26.4-.4.4.4.25-.26-.4-.4.4-.4-.25-.26-.4.4zM.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96z" color="#000" fill="#fff"/></svg>`;
const fullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><g><path style="color:#000000;fill:#ffffff" d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51 H306v76.5h51V0H229.5z"/></g></svg>`;
const narrativeDesc = document.querySelector(".text-display"); 

playButton.innerHTML = playImage;
soundButton.innerHTML = soundIcon;
fullScreenButton.innerHTML = fullScreenIcon;

// functions


function playVideo() {	
	if (video.paused) {
		video.play();
		playButton.innerHTML = pauseImage;
		keepRetracted ();		
	} else {
		video.pause();
		playButton.innerHTML = playImage;	
		keepExtended();	
	}	
}

function keepExtended () {
	controls.classList.remove("retracted-position");
	controlsBackground.classList.remove("retracted-position");
}

function keepRetracted () {
	controls.classList.add("retracted-position");
	controlsBackground.classList.add("retracted-position");
}

function alterPlayButton(target) {	
	playButton.innerHTML = target;
}

function narrativePlay(narrative) {	
	video.play();
	playButton.innerHTML = pauseImage;
	video.currentTime = convertTime(narrative);
	keepRetracted ();
	unFade();
}

function convertTime (narrative) {
	let time = narrative.querySelector('img').dataset.time;
	const splitTime = time.split(':').reverse();
	let seconds = 0;
	
	for (i=0; i < splitTime.length; i++) {
		seconds += parseInt(splitTime[i])*Math.pow(60,i);			
	};
	
	return seconds;
}

function unFade () {
	video.classList.remove("fade-in-transition");	
	void video.offsetWidth;
	video.classList.add("fade-in-transition");	
}

function toggleSound() {
	if (video.volume == 0) {
		video.volume = lastSavedVolume;
		if (lastSavedVolume != 0) {
			soundButton.innerHTML = soundIcon;
		}
	} else {
		video.volume = 0;
		soundButton.innerHTML = noSoundIcon; 
	}
}

function soundVolume() {	
	lastSavedVolume = soundSlider.value / 100;
	video.volume = lastSavedVolume;
	if (video.volume == 0) {
		soundButton.innerHTML = noSoundIcon;
	} else {
		soundButton.innerHTML = soundIcon;
	}
}

function videoProgress () {
	const progressValue = video.currentTime / video.duration * 100;
	progressBar.style.width = `${progressValue}%`;
}

function toggleFullScreen(element) {
	const addFullScreen = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	const removeFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
 
  if (document.fullscreen) {
  	removeFullScreen.call(document); 
  	nvpContainer.classList.remove('clean-video-container');   
  } else { 
    addFullScreen.call(element);
    nvpContainer.classList.add('clean-video-container');
  }; 

}

function narrativesIconsResize () {
	// problem of setting original height
	// maybe because of Dom content loaded ?
	let sliderHeight = nvpContainer.offsetHeight/10;	
	narrativesSlider.style.height = sliderHeight+"px";	
}

function narrativeProgressBarHighlight (narrative) {
	let pixBySecond = progressContainer.offsetWidth / video.duration;

	let narrDuration = 0;
	if (narrative.nextElementSibling) {
		narrDuration = convertTime(narrative.nextElementSibling) - convertTime(narrative);
	} else {
		narrDuration = video.duration - convertTime(narrative);
	};
	
	let narrStart = convertTime(narrative);		
	const narrStartPix = narrStart*pixBySecond;
	const narrDurationPix = narrDuration*pixBySecond;
	narrativePos.style.left = narrStartPix+"px";
	narrativePos.style.width = narrDurationPix+"px";
	
}

function navigateThroughProgressBar (e) {
	const startPoint = e.offsetX / progressContainer.offsetWidth * video.duration
	video.currentTime = startPoint;
}

function populateNarrativeDesc (narrative) {
	narrativeDesc.innerHTML = `<p>${narrative.querySelector('img').dataset.text}</p>`;
}



// narratives listeners

narratives.forEach( function(narrative) {
	narrative.addEventListener("click", () => narrativePlay(narrative));	
	narrative.addEventListener("keypress", function (e) {				
		if (e.charCode == 32 ){
			narrativePlay(narrative);
		}
	})
	narrative.addEventListener("mouseover", function() {
		narrativeProgressBarHighlight(narrative);
		narrativePos.classList.remove('invisible');
		populateNarrativeDesc(narrative);
		narrativeDesc.classList.remove('invisible');

	});
	narrative.addEventListener("mouseout", function() {		
		narrativePos.classList.add('invisible');
		narrativeDesc.classList.add('invisible');
	});	
});

window.addEventListener("resize", function () {	
	narrativesIconsResize();
})

// was getting wrong values, the below helps as per https://stackoverflow.com/questions/41674184/get-incorrect-offsetwidth-and-offsetheight-values

setTimeout(function(){ 
	narrativesIconsResize(); }
	, 10);


// control listeners

// Sound
let soundBeingChanged = false;
let lastSavedVolume = 1;
soundButton.addEventListener("click", toggleSound);
soundSlider.addEventListener("mousedown", () => soundBeingChanged = true);
soundSlider.addEventListener("mousemove", () => soundBeingChanged && soundVolume());
soundSlider.addEventListener("mouseup", () => soundBeingChanged = false);
soundSlider.addEventListener("change", soundVolume);

// Play

playButton.addEventListener("click", playVideo);
video.addEventListener("click", playVideo);
video.addEventListener("ended", function(){
	alterPlayButton(playImage); 
	keepExtended (); 
});

// Fullscreen
fullScreenButton.addEventListener("click", function (e) {
	toggleFullScreen(nvpContainer);

});

// Progress
progressContainer.addEventListener("click", navigateThroughProgressBar);
video.addEventListener('timeupdate', videoProgress);








