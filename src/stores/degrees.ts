import { defineStore } from 'pinia';
import { ref } from 'vue';

import getDegrees from '@/api/getDegrees';
import type { Degree } from '@/api/types';

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([]);

  const FETCH_DEGREES = async () => {
    const recievedDegrees = await getDegrees();
    degrees.value = recievedDegrees;
  };

  return { degrees, FETCH_DEGREES };
});
