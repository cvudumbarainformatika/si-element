<template>
  <q-btn
    unelevated
    :dense="dense"
    no-caps
    :type="props.type"
    :color="props.color"
    :class="props.class"
    :loading="loading"
    :disable="loading"
    style="min-width:100px"
  >
    <div
      class="f-12"
      :class="color===''?'text-primary':''"
    >
      {{ label }}
    </div>
    <template #loading>
      <q-spinner-hourglass
        class="on-left"
        size="18px"
      />
      <span class="f-12"> Loading </span>
    </template>
  </q-btn>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'submit'
  },
  to: {
    type: String,
    default: '/'
  },
  color: {
    type: String,
    default: 'primary'
  },
  class: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Label'
  },
  loading: {
    type: Boolean,
    default: false
  },
  fullwidth: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }

})
</script>

<style lang="scss" scoped>

</style>
