import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
declare var window: any;

const webkitSpeechRecognition = window.webkitSpeechRecognition;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent {
  transcript = '';
  isListening = false;
  constructor(private ngZone: NgZone) { 
    console.log('AppComponent constructor called');
  }

  startListening() {
    console.log('startListening called');
    this.isListening = true;
    console.log('Écoute démarrée');

    
    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.lang = 'fr-FR';
    recognition.maxResults = 10;

    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      this.ngZone.run(() => {
        this.transcript = '';
        const transcript = event.results[0][0].transcript;
        console.log(`Vous dites : ${transcript}`);
        this.transcript = transcript;
      });
    };
    recognition.onend = () => {
      this.ngZone.run(() => {
        console.log('Écoute terminée');
        this.isListening = false;
        setTimeout(() => {
          console.log('Retransmission du texte :', this.transcript);
        }, 1000);
      });
    };
    recognition.start();
  }

  doSomething(){
    console.log("recherche")
  }
}
