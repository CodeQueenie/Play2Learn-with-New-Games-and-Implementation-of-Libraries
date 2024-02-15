<template>
    <div class="score">
      Score: {{ score }}
    </div>
</template>
  
  <script>
  export default {
    name: 'GameScore',
    props: {
      score: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
.score {
    font-weight: bold;
}
</style>
  