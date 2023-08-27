<script setup lang="ts">
import { ref, watch } from 'vue'
import { Character } from '@/types/types'

const props = defineProps<{
  drawnCharacter: Character
  characters: Character[]
}>()

const actualCharacter = ref<Character>(props.drawnCharacter)

watch(
  () => props.drawnCharacter,
  () => {
    shuffle(props.characters)
  }
)

function shuffle(array: Character[]) {
  const changesCount = 10
  const intervalTime = 200

  for (let i = 0; i < changesCount; i++) {
    setTimeout(function () {
      const randomCharacterIndex = Math.floor(Math.random() * array.length)
      actualCharacter.value = array[randomCharacterIndex]
    }, i * intervalTime)

    setTimeout(function () {
      actualCharacter.value = props.drawnCharacter
    }, changesCount * intervalTime)
  }
}
</script>

<template>
  <Transition>
    <img
      :key="actualCharacter.id"
      class="drawn-character"
      :src="actualCharacter.img"
      :alt="actualCharacter.name"
    />
  </Transition>
</template>

<style scoped>
.drawn-character {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 160px;
  height: 90px;
  object-fit: contain;
}

.v-enter-active,
.v-leave-active {
  transition: 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
