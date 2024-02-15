<template>
  <div>
    <h2 id="gameTitle">Anagram Hunt</h2>

    <div id="game-container">
      <div v-if="!gameStarted">
        <label for="word-length" class="my-label">Word Length:</label>
        <select id="word-length" v-model="wordLength">
    <option v-for="length in wordLengths" :key="length" :value="length">
        {{ length }}
    </option>
</select>

<div class="instructions-container">
    <ol class="ol-instruction">
        <li>Choose Word Length.</li>
        <li>Press <strong>Play!</strong></li>
        <li>How many anagrams can you find in a minute?</li>
    </ol>
  </div>
    <button class="btn btn-primary form-control m-1 d-block text-center" @click="initializeGame">Play!</button>
      </div>
      
      <div v-else-if="timesUp || gameWon">
      <h2 class="score-title spaced-element">{{ gameWon ? "Congratulations, you found all word arrays!" : "Time's Up!" }}</h2>
        <div class="score-label spaced-element">You Got</div>
        <div class="score-section spaced-element">
          <span class="score-value">{{ score }}</span>
        </div>
        <div class="score-label spaced-element">Anagrams</div>

        <section class="d-flex justify-content-center flex-column align-items-center">
    <button class="btn btn-primary form-control m-1 spaced-element" @click="goToStartScreen">
        Play Again
    </button>

    <button @click="redirectToStart" class="btn btn-secondary">
      Back to Start Screen
    </button>
    </section>
    </div>

  <div v-else>
    <div id="score_and_timer" class="d-flex justify-content-between">
    <div class="score_and_timer_item"><GameScore :score="score" /></div>
    <div class="score_and_timer_item"><GameTimer :timeLeft="timeLeft" /></div>
  </div>
  </div>
  </div>

  <div v-if="gameStarted && !timesUp && !gameWon">
      <div :class="equationClass" id="equation">
        <p class="anagram-word highlighted">{{ currentWord }} ({{ remainingAnagrams }} left)</p>
        <GameEquation
          :question="currentWord"
          :answer="userInput"
          :answered="answered"
        />
      </div>
  
      <div class="row" id="buttons">
        <div class="col">
          <input type="text" v-model="userInput" @keyup.enter="checkAnswer" :disabled="answered" placeholder="type here" id="inputBox" />
        </div>
      </div>

      <div class="completed-anagrams">
        <p v-for="(anagram, index) in completedAnagrams" :key="anagram">
            {{ index + 1 }}. {{ anagram }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import GameScore from "./components/GameScore.vue"
import GameTimer from "./components/GameTimer.vue"
import GameEquation from "./components/GameEquation.vue"
import anagrams from "./helpers/anagrams"

export default {
  name: 'App',
  components: {
    GameScore,
    GameTimer,
    GameEquation,
  },

  data() {
    return {
      wordLengths: [5, 6, 7, 8],
      wordLength: 0,
      gameStarted: false,
      currentWord: '',
      anagrams: [],
      usedAnagramsGroups: [],
      gameOver: false,
      userInput: '',
      answered: false,
      score: 0,
      gameLength: 60,
      timeLeft: 0,
      equationClass: '',
      completedAnagrams: [],
    };
  },
  methods: {
    initializeGame() {
      this.timeLeft = 60;  
      this.startGame();
    },
    startGame() {
      const wordLength = parseInt(this.wordLength, 10); 
      if (!this.wordLengths.includes(wordLength)) {
        alert('You must choose a valid word length!');
        return;
      }
      this.gameStarted = true; 
      this.newWord();
      this.startTimer();
    },

    newWord() {
    const wordLength = this.wordLength; 
    console.log('Word Length:', wordLength);
    const wordArrays = anagrams[wordLength];
    console.log('Word Arrays:', wordArrays);

    let unusedAnagram = wordArrays.filter(
      (wordArray, index) => !this.usedAnagramsGroups.includes(index)
    );

    if (unusedAnagram.length === 0) {
        this.gameOver = true;
        return;
    }

    if (this.anagrams.length > 0) {
     this.gameOver = true;
     return;
    }

    if (unusedAnagram && unusedAnagram.length > 0) {
        const randomArrayIndex = Math.floor(Math.random() * unusedAnagram.length);
        const randomArray = unusedAnagram[randomArrayIndex];

        // Record the index for this anagram array so you won't pick it again
        this.usedAnagramsGroups.push(wordArrays.indexOf(randomArray));

        console.log('Random Array:', randomArray);
        if (randomArray && randomArray.length > 0) {      
            const filteredArray = randomArray.filter(word => word.length === wordLength);
            console.log('Filtered Array:', filteredArray);

            if (filteredArray.length > 0) {
                this.currentWord = filteredArray[Math.floor(Math.random() * filteredArray.length)];
                console.log('New word:', this.currentWord);
                this.anagrams = filteredArray.filter(word => word !== this.currentWord);
                console.log('Updated anagrams:', this.anagrams);
            
                this.completedAnagrams = [];
            } else {
                console.error('No words with the selected length in the random array.');
            }
        } else {
            console.error('Random array is empty or undefined.');
        }
    } else {
        console.error('Word arrays are empty or undefined for the given word length.');
    }

    this.answered = false;
},

    checkAnswer() {
  
  if (this.anagrams.includes(this.userInput)) {
    this.score++;
    this.completedAnagrams.push(this.userInput);
    
    this.anagrams = this.anagrams.filter(word => word !== this.userInput);
    
    this.userInput = '';

    
    if (this.anagrams.length === 0) {
      this.newWord(); 
      console.log('Getting a new word...');
    }
  }
  this.answered = false; 
  },

    startTimer() {
      window.addEventListener('keyup', this.handleKeyUp);
      this.timeLeft = this.gameLength; 
      if (this.timeLeft > 0) {
        this.timer = setInterval(() => {
          this.timeLeft--;
          if (this.timeLeft === 0) {
            clearInterval(this.timer);
            window.removeEventListener('keyup', this.handleKeyUp);
          }
        }, 1000);
      }
    },

    redirectToStart () {
      window.location.href = './../../HTML/index.html'
    },

    gameStatus() {
  if (this.timesUp) {
    return "Time's Up!";
  } else if (this.gameWon) {
    return "Congratulations, you found all word arrays!";
  } else {
    return null;
  }
},

    goToStartScreen() {
  this.gameStarted = false;
  this.score = 0;
  this.timeLeft = this.gameLength; 
  this.currentWord = '';
  this.anagrams = [];
  this.usedAnagramsGroups = [];
  this.userInput = '';
  this.answered = false;
  this.completedAnagrams = [];
  }
},

  
  mounted() {
  if (this.$route && this.$route.params) {
    this.wordLength = parseInt(this.$route.params.wordLength, 10) || this.wordLength;
  }
  this.gameStarted = false;
},

computed: {
  timesUp() {
    return this.timeLeft === 0;
  },
  gameWon() {
    return this.anagrams.length === 0;
  },
  remainingAnagrams() {
    return this.anagrams.length;
  },
}
}
</script>

<style>
@import './components/my-stylesheet.css';
</style>