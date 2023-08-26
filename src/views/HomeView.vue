<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
import AppButton from '../components/AppButton.vue'

function handleStart(startRecord, stopRecord) {}
</script>

<template>
  <CameraStream v-slot="{ startRecord, stopRecord }">
    <AppButton
      @click="handleStart(startRecord, stopRecord)"
      color="raspberry-rose"
      class="start-btn"
      >Start</AppButton
    >
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
