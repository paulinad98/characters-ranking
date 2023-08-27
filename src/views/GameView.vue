<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character } from '@/types/types'
import CameraStream from '@/components/CameraStream.vue'
import GameRanking from '@/components/GameRanking.vue'
import GameStartButton from '@/components/GameStartButton.vue'
import charactersData from '@/assets/characters.json'

const gameRounds = 10
const characters: Character[] = charactersData.ranczo
const charactersRanking = ref<(Character | null)[]>(new Array(gameRounds).fill(null))
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

function selectCharacterPlace(characterRankingIndex: number) {
  charactersRanking.value[characterRankingIndex] = actualCharacter.value
  drawCharacter()
}

function drawCharacter() {
  const randomCharacterIndex = Math.floor(Math.random() * charactersToDraw.value.length)
  actualCharacter.value = charactersToDraw.value[randomCharacterIndex]
}
</script>

<template>
  <CameraStream>
    <GameStartButton @start="drawCharacter()" />
    <GameRanking @select="selectCharacterPlace($event)" v-bind="{ charactersRanking }" />
  </CameraStream>
</template>

<style scoped></style>
