<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoRecord } from '../composables/useVideoRecord'

const { setCameraStream, startRecord, stopRecord } = useVideoRecord()
const video = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  setCameraStream(video.value)
})
</script>

<template>
  <div>
    <video ref="video" width="320" height="240" autoplay></video>
    <button @click="startRecord()">Start</button>
    <button @click="stopRecord()">Stop</button>
  </div>
</template>
