<template>
  <q-select
    ref="refAuto"
    :options="optionx"
    :label="label"
    dense
    :filled="!outlined?filled:!filled"
    :outlined="outlined"
    hide-bottom-space
    no-error-icon
    :input-debounce="!filterred?500:0"
    emit-value
    map-options
    use-input
    fill-input
    hide-selected
    :option-value="optionValue"
    :option-label="optionLabel"
    :disable="disable"
    :loading="loading"
    lazy-rules
    :rules="[anotherValid]"
    @filter="filterFn"
    @focus="getFocus"
    @input-value="setModel"
    @new-value="createValue"
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup>
import { ref } from 'vue'
const emits = defineEmits(['getSource', 'setModel', 'onEnter', 'setSearch'])
const props = defineProps({
  source: { type: Array, default: () => [] },
  label: { type: String, default: 'Label' },
  disable: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  optionValue: { type: [Object, Array, String], default: 'name' },
  optionLabel: { type: [Object, Array, String], default: 'name' },
  filled: { type: Boolean, default: true },
  outlined: { type: Boolean, default: false },
  valid: { type: Boolean, default: false },
  filterred: { type: Boolean, default: true }
})
const refAuto = ref(null)
const optionx = ref(props.source)

function getFocus () {
  if (props.source.length === 0) {
    console.log('getData from server')
    emits('getSource')
  }
}
function filterFn (val, update) {
  update(() => {
    if (val === '') {
      if (!props.filterred) {
        emits('setSearch', val)
        optionx.value = props.source
      } else {
        optionx.value = props.source
      }
    } else {
      if (!props.filterred) {
        emits('setSearch', val)
        optionx.value = props.source
      } else {
        const needle = val.toLowerCase()
        optionx.value = props.source.filter(v => v[refAuto.value.optionLabel].toLowerCase().indexOf(needle) > -1)
      }
    }
  },
  ref => {
    // console.log(ref)
    if (val !== '' && ref.options.length > 0) {
      ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
      ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
    }
  })
}
function setModel (val) {
  emits('setModel', val)
}

function anotherValid (val) {
  if (props.valid) {
    return true
  }
  return (val !== null && val !== '') || 'Harap diisi'
}

function createValue (val, done) {
  if (!props.filterred) {
    emits('onEnter', val)
    done(val)
  }
}
</script>

<style lang="scss" scoped>

</style>
