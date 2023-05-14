<template>
  <header-container>
    <template #title>
      <h1 class="w-full text-4xl font-normal">Teams</h1>
    </template>
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">This is a subtitle</h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from '@/components/Shared/HeaderContainer.vue';
export default {
  name: 'TeamsPage',
  components: {
    HeaderContainer,
  },
};
</script>
