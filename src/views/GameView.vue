<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character } from '@/types/types'
import CameraStream from '@/components/CameraStream.vue'
import GameRanking from '@/components/GameRanking.vue'
import GameStartButton from '@/components/GameStartButton.vue'
import GameDrawnCharacter from '@/components/GameDrawnCharacter.vue'
import charactersData from '@/assets/characters.json'

const gameRounds = 10
const characters: Character[] = charactersData.ranczo
const charactersRanking = ref<(Character | null)[]>(new Array(gameRounds).fill(null))
const actualCharacter = ref<Character | null>(null)
const isGameStarted = ref(false)

const charactersToDraw = computed(() => {
  const selectedCharactersId = charactersRanking.value
    .map((character) => character?.id)
    .filter((characterId) => !!characterId)

  const charactersToDraw = characters.filter((character) => {
    return !selectedCharactersId.includes(character.id)
  })

  return charactersToDraw
})

function startGame() {
  isGameStarted.value = true
  drawCharacter()
}

function selectCharacterPlace(characterRankingIndex: number) {
  charactersRanking.value[characterRankingIndex] = actualCharacter.value

  if (charactersRanking.value.every((character) => !!character)) {
    endGame()
    return
  }

  drawCharacter()
}

function drawCharacter() {
  const randomCharacterIndex = Math.floor(Math.random() * charactersToDraw.value.length)
  actualCharacter.value = charactersToDraw.value[randomCharacterIndex]
}

function endGame() {}
</script>

<template>
  <CameraStream>
    <GameStartButton v-if="!isGameStarted" @start="startGame()" />
    <GameRanking
      v-if="isGameStarted"
      @select="selectCharacterPlace($event)"
      v-bind="{ charactersRanking }"
    />
    <GameDrawnCharacter
      v-if="actualCharacter && isGameStarted"
      v-bind="{ actualCharacter, characters }"
    />
  </CameraStream>
</template>

<style scoped></style>
