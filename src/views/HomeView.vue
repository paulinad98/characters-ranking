<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
import { downloadUrl } from '../helpers/downloadUrl'

function handleStop(stopRecord: () => Blob) {
  const videoFile = stopRecord()
  downloadUrl(videoFile)
}
</script>

<template>
  <div>
    <CameraStream v-slot="{ startRecord, stopRecord }">
      <button @click="startRecord()">Start</button>
      <button @click="handleStop(stopRecord)">Stop</button>
    </CameraStream>
  </div>
</template>
