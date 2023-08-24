<script setup lang="ts">
import CameraStream from '../components/CameraStream.vue'
</script>

<template>
  <div>
    <CameraStream v-slot="{ startRecord, stopRecord }">
      <button @click="startRecord()">Start</button>
      <button @click="stopRecord()">Stop</button>
    </CameraStream>
  </div>
</template>
