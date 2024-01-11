import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questionBank: string[] = [
    "What is your favourite memory?",
    "What is your favourite food?",
    "If you can have dinner with anyone, who would it be?"
  ];

  constructor() { }

  chooseRandomQuestion(): string {
    const randomIndex = Math.floor(Math.random() * this.questionBank.length);

    return this.questionBank[randomIndex];
  }
}

