import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questionBank: string[] = [
    "If you were a vegetable, what vegetable would you be and why?",
    "What is your spirit animal?",
    "If you could have dinner with any fictional character, who would it be?",
    "What's the weirdest food combination you enjoy?",
    "If aliens visited Earth, what dish would you want to introduce them to?",
    "If you could swap lives with any person for a day, who would it be?",
    "What's the most embarrassing thing that's ever happened to you?",
    "If you could have any mythical creature as a pet, what would it be?",
    "What's the silliest joke you know?",
    "If you had a theme song that played whenever you entered a room, what would it be?",
    "If you could create a new holiday, what would it celebrate?",
    "What's your favorite dance move, and can you demonstrate it (virtually)?",
    "If you were a wizard, what would your signature spell do?",
    "What's the strangest talent you possess?",
    "If you were a superhero with a sidekick, what would their name be?",
    "What's your favorite dad joke?",
    "If you could have any fictional technology from a movie or book, what would it be?",
    "What's the most unusual pet you would consider having?",
    "If you could visit any fictional world, where would you go?",
    "What's your go-to karaoke song?",
    "If you had a magic wand, what's the first thing you would do with it?",
    "What's your spirit emoji?",
    "If you could be any inanimate object for a day, what would it be and why?",
    "What's the weirdest dream you've ever had?",
    "If your life had a tagline, what would it be?",
    "If you could switch lives with a cartoon character, who would it be?",
    "What's your favorite type of cheese?",
    "If you were a superhero, what would be your weakness?",
    "What's the most ridiculous thing you believed as a child?",
    "If you could time travel only once, would you go to the past or the future?",
    "What's the craziest thing on your bucket list?",
    "If you were a dessert, what dessert would you be?",
    "What's the most absurd item on your bucket list?",
  ];

  constructor() { }

  chooseRandomQuestion(): string {
    const randomIndex = Math.floor(Math.random() * this.questionBank.length);

    return this.questionBank[randomIndex];
  }
}

