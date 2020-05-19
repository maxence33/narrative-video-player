

// function init( args ) {
	
// 	args.images.forEach(function(image){
// 		document.querySelector('.narratives-slider').innerHTML += `<div class='narrative'>
// 							<img src='${image.url}' data-time='${image.start}'>
// 						</div>`

// 	});    // this.value = 'value' in args ? args.value : defaults.value;
// }

// init(options);


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
	

	const playImage= `
<svg   
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"   
   viewBox="0 0 3.0494232 3.7400284"
   height="3.7400284mm"
   width="3.0494232mm">  
  <g
     transform="translate(59.733045,-98.582368)"
     id="layer1">
    <path
       style="fill:#ffffff;fill-opacity:1"
       d="m -59.731457,102.08093 c 0,0.22357 0.156898,0.30612 0.348456,0.18706 l 2.555611,-1.59835 c 0.192352,-0.11986 0.191029,-0.31565 0,-0.43524 l -2.556669,-1.59782 c -0.192881,-0.120386 -0.348986,-0.03254 -0.348986,0.18706 v 3.25755 h 0.0016 z"
       id="path815" />
  </g>
</svg>`


const pauseImage = `
<svg width="18.354mm" height="21.733mm" version="1.1" viewBox="0 0 18.354 21.733" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<g transform="translate(211.34 -54.848)">
<g fill="#f9f9f9" shape-rendering="auto">
<path d="m-208.05 54.848c-0.92433 0-1.7528 0.50736-2.3418 1.3038-0.58895 0.79643-0.94859 1.8857-0.94859 3.0866v12.952c0 1.201 0.35963 2.2904 0.94859 3.0866 0.58896 0.79622 1.4175 1.3038 2.3418 1.3038 0.92491 0 1.7531-0.50755 2.3418-1.3038 0.58867-0.79623 0.94667-1.8856 0.94667-3.0866v-12.952c0-1.2009-0.35801-2.2902-0.94667-3.0866-0.58866-0.79642-1.4168-1.3038-2.3418-1.3038z" color="#000000" />
<path d="m-196.28 54.848c-0.92482 0-1.7527 0.50736-2.3418 1.3038-0.58902 0.79643-0.94858 1.8857-0.94858 3.0866v12.952c0 1.201 0.35955 2.2904 0.94858 3.0866 0.58903 0.79623 1.417 1.3038 2.3418 1.3038 0.92492 0 1.7528-0.50756 2.3418-1.3038 0.58899-0.79622 0.94858-1.8856 0.94858-3.0866v-12.952c0-1.2009-0.35959-2.2902-0.94858-3.0866-0.58899-0.79642-1.4168-1.3038-2.3418-1.3038z" color="#000000" />
</g>
</g>
</svg>
` ;

const soundIcon = `
<svg   
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"   
   viewBox="0 0 4.18121 3.84466"
   height="3.84466mm"
   width="4.18121mm">  
  <g
     transform="translate(-84.843919,-106.84553)"
     id="layer1">
    <path
       style="fill:#ffffff;fill-opacity:1;stroke-width:0.26458332"
       d="m 85.484739,107.80649 c -0.352425,0 -0.64082,0.2884 -0.64082,0.64082 v 0.64083 c 0,0.35242 0.288395,0.64082 0.64082,0.64082 h 0.401109 l 1.085321,0.96123 v -3.84466 l -1.085586,0.96096 z m 2.259277,0.96123 c 0,-0.19235 -0.128058,-0.32041 -0.32041,-0.32041 v 0.64083 c 0.192088,0 0.32041,-0.12806 0.32041,-0.32042 z m 0.640557,0 c 0,-0.44846 -0.320411,-0.8329 -0.736865,-0.92921 l -0.09604,0.28839 c 0.288396,0.064 0.512763,0.32041 0.512763,0.64082 0,0.32042 -0.224367,0.5768 -0.512763,0.64083 l 0.128059,0.28839 c 0.384704,-0.0963 0.70485,-0.48075 0.70485,-0.92922 z m -0.779768,-1.61292 -0.128059,0.28839 c 0.802037,0.12667 1.228237,0.74774 1.228237,1.32453 0,0.5768 -0.501369,1.11435 -1.154726,1.27582 l 0.128059,0.2884 c 0.724343,-0.16007 1.346813,-0.82735 1.346813,-1.56422 2.65e-4,-0.73686 -0.572093,-1.50436 -1.420324,-1.61292 z"
       id="path1489" />
  </g>
</svg>`

const noSoundIcon = `
<svg   
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"  
   viewBox="0 0 4.18121 3.84466"
   height="3.84466mm"
   width="4.18121mm">   
  <g
     transform="translate(-84.843919,-106.84553)"
     id="layer1">
    <path
       d="M 10.488281,4.7773438 9.5136719,5.7519531 11.027344,7.265625 9.5136719,8.7773438 10.488281,9.7519531 12.001953,8.2382812 13.515625,9.7519531 14.490234,8.7773438 12.976562,7.265625 14.490234,5.7519531 13.515625,4.7773438 12.001953,6.2910156 Z M 2.4219969,3.6319748 C 1.0899969,3.6319748 0,4.7219906 0,6.0539717 v 2.4220347 c 0,1.3319811 1.0899969,2.4219966 2.4219969,2.4219966 h 1.5160025 l 4.1020007,3.632996 V 0 L 3.9369978,3.6319748 Z"
       style="color:#000000;fill:#ffffff"
       transform="matrix(0.26458333,0,0,0.26458333,84.843919,106.84553)"
       id="path1577" />
  </g>
</svg>`

const fullScreenIcon = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="357px" height="357px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
<g>
	<g id="fullscreen">
		<path style="color:#000000;fill:#ffffff" d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51
			H306v76.5h51V0H229.5z"/>
	</g>
</g>

</svg>
`

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





