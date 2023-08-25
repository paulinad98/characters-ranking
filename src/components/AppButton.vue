<script setup lang="ts">
import { computed } from 'vue'
import { ThemeColors } from '../types/types'

const props = defineProps<{
  color: ThemeColors
}>()

const cssVariableRgb = computed(() => {
  return `var(--${props.color}-rgb)`
})
</script>

<template>
  <button class="app-button"><slot /></button>
</template>

<style scoped>
.app-button {
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 18px;
  color: rgb(v-bind(cssVariableRgb));
  border: 2px solid rgb(v-bind(cssVariableRgb));
  background-color: transparent;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}

.app-button::before {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 50px;
  height: 50px;
  border-radius: inherit;
  scale: 0;
  z-index: -1;
  background-color: rgb(v-bind(cssVariableRgb));
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.app-button:hover::before {
  scale: 3;
}

.app-button:hover {
  color: rgb(var(--white-rgb));
  scale: 1.1;
  box-shadow: 0 0px 20px rgba(v-bind(cssVariableRgb), 0.4);
}

.app-button:active {
  scale: 1;
}
</style>
