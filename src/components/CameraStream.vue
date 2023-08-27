<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import { useVideoRecord } from '../composables/useVideoRecord'
import { CameraStreamSymbol } from '@/symbols'

const { setCameraStream, startRecord, stopRecord } = useVideoRecord()
const video = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  if (!video.value) return
  setCameraStream(video.value)
})

provide(CameraStreamSymbol, {
  startRecord,
  stopRecord
})
</script>

<template>
  <div class="video-wrapper">
    <video class="video" ref="video" autoplay></video>
    <slot />
  </div>
</template>

<style scoped>
.video-wrapper {
  position: relative;
  height: 100vh;
  background-color: rgb(var(--black-soft-rgb));
}
.video {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>
