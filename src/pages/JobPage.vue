<template>
  <div>Job Page {{ currentJobId }}</div>
</template>

<script>
export default {
  name: 'JobPage',
  computed: {
    currentJobId() {
      return this.$route.params.id;
    },
  },
};
</script>
