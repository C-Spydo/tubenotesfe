// angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// project import

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-sample-page',
  imports: [CommonModule, CardComponent, FormsModule,],
  templateUrl: './summarise-video.component.html',
  styleUrls: ['./summarise-video.component.scss']
})
export class SummariseVideoPageComponent {
  searchQuery: string = '';
  videoSummary: string = 'This is a sample summary of the video...';
  speechSynthesis = window.speechSynthesis;
  utterance = new SpeechSynthesisUtterance();
  voices: SpeechSynthesisVoice[] = [];
  selectedVoice: string = '';
  volume: number = 0.5;
  volumeDisplay: number = 50;
  isPaused: boolean = false;

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
    this.videoSummary = `Summary for "${this.searchQuery}" goes here...`;
    this.utterance.text = this.videoSummary;
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
