<script setup lang="ts">
import { inject } from 'vue'
import AppButton from '../components/AppButton.vue'
import { CameraStreamSymbol } from '@/symbols'

const emit = defineEmits(['start'])
const cameraStreamApi = inject(CameraStreamSymbol)

function startGame() {
  startRecord()
  emit('start')
}

function startRecord() {
  if (!cameraStreamApi) {
    throw new Error('Camera stream api not provided')
  }

  cameraStreamApi.startRecord()
}
</script>

<template>
  <AppButton @click="startGame()" color="raspberry-rose" class="start-btn"> Start </AppButton>
</template>

<style scoped>
.start-btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12%;
  margin: auto;
  width: max-content;
}
</style>
