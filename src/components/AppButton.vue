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
/* .app-button {
  cursor: pointer;
  position: relative;
  padding: 10px 24px;
  font-size: 18px;
  color: rgb(v-bind(cssVariableRgb));
  border: 2px solid rgb(v-bind(cssVariableRgb));
  background-color: rgb(var(--white-rgb), 0.2);
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
} */

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
