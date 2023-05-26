<template>
  <div class="border-b border-solid to-brand-grey-2 py-5">
    <div
      role="button"
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>Default child content</slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => (isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']));
</script>
