<template>
  <div class="timer">
    Time left: {{ seconds }}
  </div>
</template>

<script>
export default {
  name: 'GameTimer',
  props: {
    timeLeft: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      seconds: 0,
      intervalId: null
    };
  },
  watch: {
    timeLeft: {
      immediate: true,
      handler(newValue) {
        this.seconds = newValue;
        this.startTimer();
      }
    }
  },
  methods: {
    startTimer() {
      this.stopTimer(); 
      this.intervalId = setInterval(() => {
        if (this.seconds > 0) {
          this.seconds--;
        } else {
          this.stopTimer();
          this.$emit('timeOut');
        }
      }, 1000);
    },
    stopTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  beforeUnmount() {
    this.stopTimer();
  }
};
</script>

<style scoped>
.timer {
    font-weight: bold;
}
</style>
