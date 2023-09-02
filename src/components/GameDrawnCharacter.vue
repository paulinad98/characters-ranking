<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { Character } from '@/types/types'
import { getRandomArrayIndex } from '@/helpers/getRandomArrayIndex'

const DRAWING_CHARACTERS_COUNT = 11
const DRAWING_STEPS_COUNT = 4

const props = defineProps<{
  actualCharacter: Character
  characters: Character[]
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const drawingCharacters = ref<Character[]>([])
const positions = ref<number[]>([])
const charactersElement = ref<HTMLElement | null>(null)

const notSelectedCharacters = computed(() => {
  const characterWithoutActualCharacter = props.characters.filter(
    (character) => character.id !== props.actualCharacter.id
  )
  return characterWithoutActualCharacter.filter(
    (character) => !drawingCharactersIds.value.includes(character.id)
  )
})

const drawingCharactersIds = computed(() => {
  return drawingCharacters.value.map((character) => character?.id)
})

watch(
  () => props.actualCharacter,
  () => {
    emit('update:modelValue', false)

    setDrawingCharacters()
    setActualCharacterToDrawingCharacters()
    setPositions()

    const transform = [450, 360, 270, 180, 90, 0, -90, -180, -270, -360, -450]
    const keyframes = positions.value.map((position) => {
      return { transform: `translateY(${transform[position]}px)` }
    })

    nextTick(async () => {
      if (!charactersElement.value) return

      const animation = charactersElement.value.animate(keyframes, {
        duration: 2500,
        fill: 'both'
      })
      await animation.finished

      emit('update:modelValue', true)
    })
  },
  { immediate: true }
)

function setDrawingCharacters() {
  const newDrawingCharacters = []
  for (let i = 0; i < DRAWING_CHARACTERS_COUNT - 1; i++) {
    const randomCharacterIndex = getRandomArrayIndex(notSelectedCharacters.value)
    const randomCharacter = notSelectedCharacters.value[randomCharacterIndex]

    newDrawingCharacters.push(randomCharacter)
    drawingCharacters.value.push(randomCharacter)
  }

  drawingCharacters.value = newDrawingCharacters
}

function setActualCharacterToDrawingCharacters() {
  const randomIndex = getRandomArrayIndex(drawingCharacters.value)

  drawingCharacters.value = [
    ...drawingCharacters.value.slice(0, randomIndex),
    props.actualCharacter,
    ...drawingCharacters.value.slice(randomIndex)
  ]
}

function setPositions() {
  const newPositions: number[] = []

  for (let i = 0; i < DRAWING_STEPS_COUNT - 1; i++) {
    const randomPosition = getRandomArrayIndex(
      drawingCharactersIds.value.filter(
        (id) => !newPositions?.includes(id) && id !== props.actualCharacter.id
      )
    )
    newPositions.push(
      drawingCharactersIds.value.indexOf(drawingCharactersIds.value[randomPosition])
    )
  }

  const actualCharacterIndex = drawingCharactersIds.value.indexOf(props.actualCharacter.id)
  newPositions.push(actualCharacterIndex)

  positions.value = newPositions
}
</script>

<template>
  <div class="drawn-characters-container">
    <div ref="charactersElement" class="drawn-characters">
      <img
        :key="character.id"
        v-for="character in drawingCharacters"
        class="drawn-character-img"
        :src="character.img"
        :alt="character.name"
      />
    </div>
  </div>
</template>

<style scoped>
.drawn-characters-container {
  --img-height: 90px;
  --img-width: 160px;

  overflow: hidden;
  position: absolute;
  top: 10%;
  right: 5%;
  width: var(--img-width);
  height: var(--img-height);
}
.drawn-characters {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}
.drawn-character-img {
  max-width: var(--img-width);
  max-height: var(--img-height);
  object-fit: contain;
}
</style>
