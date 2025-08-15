class AudioPlayer {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.currentTimeEl = document.getElementById('currentTime');
        this.totalTimeEl = document.getElementById('totalTime');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressFill = document.getElementById('progressFill');
        this.progressHandle = document.getElementById('progressHandle');
        this.percentageText = document.getElementById('percentageText');
        this.buttonIcon = this.playPauseBtn.querySelector('.button-icon');
        this.buttonText = this.playPauseBtn.querySelector('.button-text');
        
        this.isPlaying = false;
        this.duration = 0;
        this.currentTime = 0;
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.audio.addEventListener('timeupdate', () => this.handleTimeUpdate());
        this.audio.addEventListener('loadedmetadata', () => this.handleLoadedMetadata());
        this.audio.addEventListener('ended', () => this.handleEnded());
        this.progressContainer.addEventListener('click', (e) => this.handleSeek(e));
        
        // Load audio metadata
        this.audio.load();
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.updatePlayButton();
        } else {
            this.audio.play();
            this.isPlaying = true;
            this.updatePlayButton();
        }
    }
    
    updatePlayButton() {
        if (this.isPlaying) {
            this.buttonIcon.textContent = '⏸️';
            this.buttonText.textContent = 'إيقاف التسجيل';
            this.playPauseBtn.classList.add('playing');
        } else {
            this.buttonIcon.textContent = '▶️';
            this.buttonText.textContent = 'تشغيل التسجيل';
            this.playPauseBtn.classList.remove('playing');
        }
    }
    
    handleTimeUpdate() {
        this.currentTime = this.audio.currentTime;
        this.updateTimeline();
    }
    
    handleLoadedMetadata() {
        this.duration = this.audio.duration;
        this.totalTimeEl.textContent = this.formatTime(this.duration);
    }
    
    handleEnded() {
        this.isPlaying = false;
        this.updatePlayButton();
        this.currentTime = 0;
        this.updateTimeline();
    }
    
    handleSeek(e) {
        if (this.duration > 0) {
            const rect = this.progressContainer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const newTime = (clickX / rect.width) * this.duration;
            this.audio.currentTime = newTime;
            this.currentTime = newTime;
            this.updateTimeline();
        }
    }
    
    updateTimeline() {
        // Update time display
        this.currentTimeEl.textContent = this.formatTime(this.currentTime);
        
        if (this.duration > 0) {
            // Update progress bar
            const progressPercent = (this.currentTime / this.duration) * 100;
            this.progressFill.style.width = `${progressPercent}%`;
            this.progressHandle.style.left = `${progressPercent}%`;
            
            // Update percentage text
            this.percentageText.textContent = `${Math.round(progressPercent)}% مكتمل`;
        }
    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize the audio player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
});
