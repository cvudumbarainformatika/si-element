<template>
  <q-input
    ref="refInput"
    dense
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    :label="label"
    :placeholder="placeholder"
    :hide-bottom-space="true"
    no-error-icon
    lazy-rules
    :rules="[anotherValid]"
    :type="typeInput"
    :autocomplete="type==='password'?'off':'on'"
    :error="error"
    :class="type==='dater'?'cursor-pointer':''"
    :autofocus="autofocus"
    :disable="disable"
    :readonly="readonly"
  >
    <template
      v-if="error"
      #error
    >
      {{ errMessage }}
    </template>
    <template
      v-if="icon!==null"
      #prepend
    >
      <q-icon
        :name="icon"
        size="18px"
      />
    </template>
    <template
      v-if="props.type === 'password'"
      #append
    >
      <q-icon
        :name="typeInput==='password'? 'icon-mat-visibility_off':'icon-mat-visibility'"
        size="18px"
        class="cursor-pointer"
        @click="changeType"
      />
    </template>
  </q-input>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// const emits = defineEmits(['showDate'])
const props = defineProps({
  icon: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: 'label'
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  mask: {
    type: String,
    default: '#.##'
  },
  fillMask: {
    type: String,
    default: '#'
  },
  validator: {
    type: String,
    default: null
  },
  dense: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  valid: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  reverseFillMask: { type: Boolean, default: false },
  errMessage: { type: String, default: 'error, data tidak valid' }
})

const refInput = ref(null)
const typeInput = ref(props.type)

onMounted(() => {
  // console.log(refInput.value)
})

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  if (props.validator === 'email') {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailPattern.test(val) || 'email tidak valid'
  }
  return (!!val) || 'Harap diisi'
}

function changeType () {
  let type = typeInput.value
  if (type === 'text') {
    type = 'password'
  } else {
    type = 'text'
  }
  typeInput.value = type
}

</script>

<style lang="scss" scoped>
.q-field--dense .q-field__bottom {
    display:none;
}

.q-field--error .q-field--highligted {
  background: none;
}
.q-field--standout.q-field--highlighted .q-field__control {
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
    background: rgb(250, 173, 173);
}

</style>
