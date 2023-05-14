<template>
  <main class="flex h-screen flex-col">
    <section class="pb-20 pt-10">
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
    <spot-light class="flex flex-row justify-center pb-16">
      <template v-slot:default="slotProps">
        <router-link
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border border-brand-grey-2"
        >
          <img :src="slotProps.spotlight.img" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="font-meduim text-lg">{{ slotProps.spotlight.title }}</h3>
            <p class="mt-3 text-sm">{{ slotProps.spotlight.description }}</p>
          </div>
          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See jobs</router-link
          >
        </router-link>
      </template>
    </spot-light>
  </main>
</template>

<script>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue';
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import SpotLight from '@/components/JobSearch/SpotLight.vue';

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm,
    SpotLight,
  },
  data() {
    return {
      heroImage: '../../../static/carlos.jpg',
    };
  },
};
</script>
