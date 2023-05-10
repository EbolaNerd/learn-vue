<template>
  <h1 class="text-3xl font-bold">Sup</h1>
  <button @click="goToHome">Go to home page</button>
</template>

<script>
export default {
  name: 'JobResultsPage',
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
