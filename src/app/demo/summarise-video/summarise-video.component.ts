// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../services/videoService';
import { showNotification } from '../utils/notification';


import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-sample-page',
  imports: [CommonModule, CardComponent, FormsModule,],
  templateUrl: './summarise-video.component.html',
  styleUrls: ['./summarise-video.component.scss']
})
export class SummariseVideoPageComponent {

  constructor(private videoService: VideoService,) {}

  searchQuery: string = '';
  videoData: any = null;

  videoSummary: string = '';
  speechSynthesis = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance();
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: string = '';
  volume: number = 0.5;
  volumeDisplay: number = 50;
  isPaused: boolean = false;

  // videoTitle = "Example Video Title";
  // videoLink = "https://www.youtube.com/watch?v=EXAMPLE";
  // videoViews = 1500;
  // videoLength = "12:34";
  publishedDate = "Feb 20, 2025";
  // thumbnails = [
  //   "https://example.com/thumbnail1.jpg",
  //   "https://example.com/thumbnail2.jpg"
  // ];

animatedViews = 0;
// keyThemes = [
//   "Artificial Intelligence in Education",
//   "The Future of Online Learning",
//   "Impact of Technology on Teaching",
//   "Student Engagement Strategies"
// ];

  showDetails = false;

  ngOnInit() {
    this.loadVoices();
    this.utterance.text = this.videoSummary;
    this.utterance.volume = this.volume;
  }

  loadVoices() {
    this.voices = this.speechSynthesis.getVoices();
    if (this.voices.length > 0) {
      this.selectedVoice = this.voices[0].name;
      this.utterance.voice = this.voices[0];
    }
    speechSynthesis.onvoiceschanged = () => {
      this.voices = this.speechSynthesis.getVoices();
      if (!this.selectedVoice) {
        this.selectedVoice = this.voices[0]?.name || '';
        this.utterance.voice = this.voices[0];
      }
    };
  }

  searchVideo() {
    this.videoService.summariseVideo(this.searchQuery).subscribe({
      next: (data) => {
        console.log(data);
        this.videoData = data;
        this.animatedViews = this.videoData.views;
        console.log('Got the video data');
        
        this.videoSummary = this.videoData.summary;
        showNotification(true,'Email generated successfully')
        this.showDetails=true;
      },
      error: (err) => {
        console.error('Error adding prospect:', err);
        showNotification(false,'Failed to generate email')
      }
    });

    this.utterance.text = this.videoSummary;
  }

  animateViews() {
    let start = 0;
    let end = this.videoData.views || 0;
    let duration = 2000; // 2 seconds
    let stepTime = Math.abs(Math.floor(duration / end));

    let counter = setInterval(() => {
      if (start >= end) {
        clearInterval(counter);
      } else {
        start += Math.ceil(end / 100); // Smooth increment
        this.animatedViews = start;
      }
    }, stepTime);
  }

  playSummary() {
    if (this.isPaused) {
      // Resume from pause
      this.speechSynthesis.resume();
    } else {
      // Start from beginning
      this.utterance.text = this.videoSummary;
      this.utterance.volume = this.volume;
      this.utterance.voice = this.voices.find(v => v.name === this.selectedVoice) || this.utterance.voice;
      this.speechSynthesis.speak(this.utterance);
    }
    this.isPaused = false;
  }

  pauseSummary() {
    this.speechSynthesis.pause();
    this.isPaused = true;
  }

  stopSummary() {
    this.speechSynthesis.cancel();
    this.isPaused = false;
  }

  adjustVolume() {
    this.volume = this.volumeDisplay /100;
    this.utterance.volume = this.volume;
  }

  changeVoice() {
    this.utterance.voice = this.voices.find(v => v.name === this.selectedVoice) || this.utterance.voice;
  }
}
