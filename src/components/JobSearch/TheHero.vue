<template>
  <main>
    <section class="flex h-screen flex-col pb-20 pt-10">
      <div class="grid-col-12 grid">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img :src="heroImage" class="h-80 w-80 rounded-full" />
        </div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>
  </main>
</template>

<script>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue';
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm,
  },
  data() {
    return {
      heroImage: '../../../static/carlos.jpg',
    };
  },
};
</script>
