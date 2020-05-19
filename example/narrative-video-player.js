


let nvpContainer = document.querySelector(`#${options.ContainerId}`);

function generateHTML (options) {
	let narrativesChildren = "";
	options.images.map(function(narr){
		
		narrativesChildren += `
					<div class='narrative'>
						<img src='${narr.url}' data-time='${narr.start}' data-text="The beautiful mountains of New Zealand">
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
			<div class="narratives">
				<div class="narratives-slider">
					${narrativesChildren}
				</div>					
			</div>	
			
			<div class="interact">

					
					<div class="left">
						<div class="play-button">				
						</div>

						<div class="sound-button">				
						</div>

						<div class="sound-slider">						
							<input type="range" min="0" max="100" value="100">						
						</div>
					</div>				
					

					<div class="right">
						<div class="full-screen">				
						</div>
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
const progressContainer = document.querySelector(".progress-bar");
const narrativePos = document.querySelector(".narrative-position");
	

const playImage= `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.049 3.74" height="14.136" width="11.525"><path d="M.002 3.499c0 .223.156.306.348.187l2.556-1.599c.192-.12.19-.315 0-.435L.349.054C.156-.066 0 .022 0 .241V3.5h.002z" fill="#fff"/></svg>`;
const pauseImage = `<svg width="69.4" height="82.1" viewBox="0 0 18.4 21.7" xmlns="http://www.w3.org/2000/svg"><g fill="#f9f9f9" color="#000"><path d="M3.3 0A3 3 0 00.9 1.3c-.5.8-.9 1.9-.9 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.3 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 003.3 0zM15 0a3 3 0 00-2.3 1.3c-.6.8-1 1.9-1 3v13c0 1.2.4 2.3 1 3.1a3 3 0 002.4 1.3 3 3 0 002.3-1.3c.6-.8 1-1.9 1-3v-13c0-1.2-.4-2.3-1-3.1A3 3 0 0015.1 0z"/></g></svg>` ;
const soundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96zm2.26.96c0-.19-.13-.32-.32-.32v.64c.2 0 .32-.13.32-.32zm.64 0A.96.96 0 002.8 1l-.1.3c.3.06.52.31.52.63s-.22.58-.51.64l.13.3c.38-.1.7-.49.7-.94zM2.76.31L2.63.6c.8.12 1.23.75 1.23 1.32 0 .58-.5 1.12-1.15 1.28l.12.29c.73-.16 1.35-.83 1.35-1.57 0-.73-.57-1.5-1.42-1.61z" fill="#fff"/></svg>`;
const noSoundIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.18 3.84" height="14.53" width="15.8"><path d="M2.78 1.26l-.26.26.4.4-.4.4.26.26.4-.4.4.4.25-.26-.4-.4.4-.4-.25-.26-.4.4zM.64.96A.64.64 0 000 1.6v.64c0 .36.29.64.64.64h.4l1.09.96V0L1.04.96z" color="#000" fill="#fff"/></svg>`;
const fullScreenIcon = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="357px" height="357px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><g><path style="color:#000000;fill:#ffffff" d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51 H306v76.5h51V0H229.5z"/></g></svg>`;

playButton.innerHTML = playImage;
soundButton.innerHTML = soundIcon;
fullScreenButton.innerHTML = fullScreenIcon;

function narrativeSliderResize() {
	let sliderDivSize = 0;
	narratives.forEach( function(narrative) {
		sliderDivSize += narrative.offsetWidth;	
		console.log(narrative.offsetWidth);	
	});
	// we get inconsistent results when running this function multiple times 
	// probably a rounding issue in trying to get elements sizes 
	// then we add a bit of room to the slider div by adding half a pixel for each child
	sliderDivSize = sliderDivSize + narratives.length ;
	narrativesSlider.style.width = sliderDivSize+"px";
	console.log(sliderDivSize);
	
	
}

function positionningSlider() {
	let sliderOffset = (narrativesWindow.offsetWidth - narrativesSlider.offsetWidth) /2;
	narrativesSlider.style.left = sliderOffset+"px";
}



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

function narrativePlay() {
	video.play();
	playButton.innerHTML = pauseImage;
	video.currentTime = convertTime(this);
	keepRetracted ();
	unFade();
}

function convertTime (narrative) {
	let time = narrative.querySelector('img').dataset.time;
	let splitTime = time.split(':');
	let seconds = (parseInt(splitTime[0])*60)+parseInt(splitTime[1]);
	return seconds
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

function toggleFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) { /* Firefox */
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) { /* IE/Edge */
    video.msRequestFullscreen();
  }
}

function resizeNarratives () {
	let sliderHeight = Math.round(video.offsetHeight/10);
	narrativesSlider.style.height = sliderHeight+"px";
}

function narrativeBarSize (narrative) {
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




// function init( args ) {
	
// 	args.images.forEach(function(image){
// 		document.querySelector('.narratives-slider').innerHTML += `<div class='narrative'>
// 							<img src='${image.url}' data-time='${image.start}'>
// 						</div>`

// 	});    // this.value = 'value' in args ? args.value : defaults.value;
// }

// init(options);




narratives.forEach( function(narrative) {
	narrative.addEventListener("click", narrativePlay);	
	narrative.addEventListener("mouseover", function() {
		narrativeBarSize(narrative);
		narrativePos.classList.remove('invisible');
	});
	narrative.addEventListener("mouseout", function() {		
		narrativePos.classList.add('invisible');
	});
	// factor(narrative);
});
playButton.addEventListener("click", playVideo);
video.addEventListener("click", playVideo);
video.addEventListener("ended", function(){alterPlayButton(playImage); keepExtended (); });




let soundChange = false;
let lastSavedVolume = 1;
soundButton.addEventListener("click", toggleSound);
soundSlider.addEventListener("mousedown", () => soundChange = true);
soundSlider.addEventListener("mousemove", () => soundChange && soundVolume());
soundSlider.addEventListener("mouseup", () => soundChange = false);
soundSlider.addEventListener("change", soundVolume);

video.addEventListener('timeupdate', videoProgress);
fullScreenButton.addEventListener("click", toggleFullScreen);

window.addEventListener("resize", function () {
	// narrativeSliderResize(); 
	// positionningSlider();
	resizeNarratives();
})

window.addEventListener('DOMContentLoaded', function () {
// narrativeSliderResize();
// positionningSlider();
	resizeNarratives();
});





