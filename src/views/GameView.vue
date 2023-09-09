<script setup lang="ts">
import { ref, computed } from 'vue'
import { Character } from '@/types/types'
import GameRanking from '@/components/GameRanking.vue'
import GameStartButton from '@/components/GameStartButton.vue'
import GameDrawnCharacter from '@/components/GameDrawnCharacter.vue'
import AppButton from '../components/AppButton.vue'
import charactersData from '@/assets/characters.json'

const gameRounds = 10
const characters: Character[] = charactersData.ranczo
const charactersRanking = ref<(Character | null)[]>(new Array(gameRounds).fill(null))
const actualCharacter = ref<Character | null>(null)
const isGameStarted = ref(false)
const isCharactersSelectable = ref(false)

const charactersToDraw = computed(() => {
  const selectedCharactersId = charactersRanking.value
    .map((character) => character?.id)
    .filter((characterId) => !!characterId)

  const charactersToDraw = characters.filter((character) => {
    return !selectedCharactersId.includes(character.id)
  })

  return charactersToDraw
})

const isGameEnded = computed(() => {
  return charactersRanking.value.every((character) => !!character)
})

function startGame() {
  isCharactersSelectable.value = false
  actualCharacter.value = null
  charactersRanking.value = new Array(gameRounds).fill(null)
  isGameStarted.value = true
  drawCharacter()
}

function selectCharacterPlace(characterRankingIndex: number) {
  charactersRanking.value[characterRankingIndex] = actualCharacter.value

  if (isGameEnded.value) return

  drawCharacter()
}

function drawCharacter() {
  const randomCharacterIndex = Math.floor(Math.random() * charactersToDraw.value.length)
  actualCharacter.value = charactersToDraw.value[randomCharacterIndex]
}
</script>

<template>
  <main class="game-background">
    <GameStartButton @click="startGame()" v-if="!isGameStarted" />
    <GameRanking
      v-if="isGameStarted"
      @select="selectCharacterPlace($event)"
      v-bind="{ charactersRanking, isCharactersSelectable }"
    />
    <GameDrawnCharacter
      v-model="isCharactersSelectable"
      v-if="actualCharacter && isGameStarted"
      v-bind="{ actualCharacter, characters }"
    />
    <AppButton v-if="isGameEnded" @click="startGame()" color="raspberry-rose" class="reset-btn">
      Zacznij od nowa
    </AppButton>
  </main>
</template>

<style scoped>
.game-background {
  position: relative;
  height: 100svh;
  background-color: rgb(var(--ash-gray-rgb));
}
.reset-btn {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 12%;
  margin: auto;
  width: max-content;
}
</style>
