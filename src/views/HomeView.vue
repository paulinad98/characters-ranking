<script setup lang="ts">
import { ref } from 'vue'
import CameraStream from '../components/CameraStream.vue'
import AppButton from '../components/AppButton.vue'

const cameraStream = ref<InstanceType<typeof CameraStream> | null>(null)

function handleStart() {
  console.log(cameraStream.value.startRecord)
}
</script>

<template>
  <CameraStream ref="cameraStream">
    <AppButton @click="handleStart()" color="raspberry-rose" class="start-btn">Start</AppButton>
  </CameraStream>
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
