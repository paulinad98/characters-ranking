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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #ffffff;
  background-color: rgba(v-bind(cssVariableRgb), 0.9);
  border-style: none;
  border-radius: 8px;
  padding: 16px 24px;
  transform: scale(1);
  transition: 0.2s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.app-button:hover {
  background-color: rgb(v-bind(cssVariableRgb));
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
}

.app-button:active {
  transform: scale(0.95);
  box-shadow: none;
}
</style>
