<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character } from '@/types/types'
import CameraStream from '../components/CameraStream.vue'
import AppButton from '../components/AppButton.vue'
import GameRanking from '../components/GameRanking.vue'
import charactersData from '@/assets/characters/ranczo'

const characters: Character[] = charactersData.characters
const charactersRanking = ref<(Character | null)[]>(new Array(10).fill(null))
const actualCharacter = ref<Character | null>(null)

const charactersToDraw = computed(() => {
  const selectedCharactersId = charactersRanking.value
    .map((character) => character?.id)
    .filter((characterId) => !!characterId)

  const charactersToDraw = characters.filter((character) => {
    return !selectedCharactersId.includes(character.id)
  })

  return charactersToDraw
})

function startRecord(cameraStreamApi) {}

function selectCharacterPlace() {}

function drawCharacter() {
  const randomCharacterIndex = Math.floor(Math.random() * charactersToDraw.value.length)
  actualCharacter.value = charactersToDraw.value[randomCharacterIndex]
  console.log(actualCharacter.value)
}

drawCharacter()
</script>

<template>
  <CameraStream v-slot="cameraStreamApi">
    <AppButton @click="startRecord(cameraStreamApi)" color="raspberry-rose" class="start-btn">
      Start
    </AppButton>
    <GameRanking @select="selectCharacterPlace()" v-bind="{ charactersRanking }" />
  </CameraStream>
</template>

<style scoped>
.start-btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12%;
  margin: auto;
  width: max-content;
}
</style>
