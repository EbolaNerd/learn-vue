<template>
  <div class="boder-brand-grey-1 w-full border-b border-solid">
    <div class="mx-auto my-16 text-center">
      <slot name="title">Title default</slot>
      <slot name="subtitle">Subtitle default</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer',
};
</script>
