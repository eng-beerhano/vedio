const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const volumeBar = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Update play/pause button
function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseButton.textContent = 'Pause';
  } else {
    video.pause();
    playPauseButton.textContent = 'Play';
  }
}

// Update progress bar
function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.value = percent;
  currentTimeDisplay.textContent = formatTime(video.currentTime);
}

// Seek video
function seekVideo() {
  const time = (progressBar.value / 100) * video.duration;
  video.currentTime = time;
}

// Update volume
function updateVolume() {
  video.volume = volumeBar.value;
}

// Enter fullscreen mode
function toggleFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}

// Set video duration
video.addEventListener('loadedmetadata', () => {
  durationDisplay.textContent = formatTime(video.duration);
});

// Event listeners
playPauseButton.addEventListener('click', togglePlayPause);
video.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('input', seekVideo);
volumeBar.addEventListener('input', updateVolume);
fullscreenButton.addEventListener('click', toggleFullscreen);
