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
  <div class="video-wrapper">
    <video class="video" ref="video" autoplay></video>
    <slot v-bind="{ startRecord, stopRecord }" />
  </div>
</template>

<style scoped>
.video-wrapper {
  position: relative;
}
.video {
  width: 100%;
  height: 100%;
}
</style>
