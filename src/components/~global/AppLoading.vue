<template>
  <!-- <q-inner-loading
    showing
    color="primary"
  /> -->
  <div
    class="flex column flex-center bg-loading-bg__table"
    style="height:400px"
  >
    <div>
      <q-spinner-cube
        :color="props.color"
        :size="props.size"
      />
    </div>
    <div :class="'text-' + props.color + ' q-mt-sm'">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: { type: String, default: 'Loading ... Mohon bersabar menunggu ...' },
  color: { type: String, default: 'primary' },
  size: { type: String, default: '40px' }
})
</script>
