<template>
  <div class="mt2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="border-brand-gray shadow-gray shadow-gray h-12 w-full rounded border border-solid border-brand-grey-1 p-3 text-base"
      placeholder="Computer programming, Finance degree"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
});
</script>
