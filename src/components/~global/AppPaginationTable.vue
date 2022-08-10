<template>
  <q-card
    bordered
    flat
  >
    <div class="row items-center q-pa-sm">
      <div class="col-md-6 col-xs-12">
        Hal. <strong>{{ meta.current_page }}</strong> dari <strong>{{ meta.last_page }}</strong>
        halaman dan <strong>{{ meta.total }}</strong> data keseluruhan
      </div>
      <div class="col-md-6 col-xs-12">
        <div class="flex items-center justify-end">
          <q-btn
            :disable="meta.current_page===1"
            flat
            round
            color="primary"
            icon="icon-mat-skip_previous"
            size="sm"
            @click="emits('first')"
          />
          <q-btn
            :disable="meta.current_page === 1"
            flat
            round
            color="primary"
            icon="icon-mat-chevron_left"
            size="sm"
            @click="emits('prev')"
          />
          <div class="bold q-pa-xs">
            {{ meta.current_page }} / {{ meta.last_page }}
          </div>
          <q-btn
            :disable="meta.current_page === meta.last_page"
            flat
            round
            color="primary"
            icon="icon-mat-chevron_right"
            size="sm"
            @click="emits('next')"
          />
          <q-btn
            :disable="meta.current_page === meta.last_page"
            flat
            round
            color="primary"
            icon="icon-mat-skip_next"
            size="sm"
            @click="emits('last')"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup>

defineProps({
  meta: {
    type: Object,
    default: () => {}
  }
})
const emits = defineEmits(['next', 'first', 'prev', 'last'])

</script>

<style lang="scss" scoped>
.table__control {
  display: flex;
  align-items: center;
  font-size: 12px !important;
}
</style>
