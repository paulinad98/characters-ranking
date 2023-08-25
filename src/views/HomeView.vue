<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
import AppButton from '../components/AppButton.vue'
import { downloadUrl } from '../helpers/downloadUrl'

function handleStop(stopRecord: () => Blob) {
  const videoFile = stopRecord()
  downloadUrl(videoFile)
}
</script>

<template>
  <div>
    <CameraStream v-slot="{ startRecord, stopRecord }">
      <AppButton @click="startRecord()" color="pale-dogwood">Start</AppButton>
      <AppButton @click="handleStop(stopRecord)" color="pale-dogwood">Stop</AppButton>
    </CameraStream>
  </div>
</template>
