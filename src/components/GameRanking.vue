<script setup lang="ts">
import { Character } from '@/types/types'

defineProps<{
  charactersRanking: (Character | null)[]
}>()

const emit = defineEmits<{
  (e: 'select', characterRankingIndex: number): void
}>()

function selectCharacter(characterRankingIndex: number, character: Character | null) {
  if (character) return

  emit('select', characterRankingIndex)
}
</script>

<template>
  <ol class="game-ranking">
    <li :key="i" v-for="(character, i) in charactersRanking" class="ranking-wrapper">
      <span class="ranking-place">{{ i + 1 }}</span>
      <button @click="selectCharacter(i, character)" class="ranking-btn" :disabled="!!character">
        <img
          v-if="!!character"
          :src="character.img"
          :alt="character.name"
          class="ranking-character-img"
        />
      </button>
    </li>
  </ol>
</template>

<style scoped>
.game-ranking {
  --ranking-theme: rgb(var(--raspberry-rose-rgb));

  position: absolute;
  top: 0;
  left: 8%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.ranking-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ranking-btn {
  width: 80px;
  height: 45px;
  overflow: hidden;
  border-radius: 12px;
  background-color: rgb(var(--white-mute-rgb));
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.2s;
}

.ranking-btn:hover:not(:disabled) {
  border: 2px solid var(--ranking-theme);
}

.ranking-btn:disabled {
  border: none;
  cursor: unset;
}

.ranking-character-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ranking-place {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 4px;
  background-color: var(--ranking-theme);
  color: rgb(var(--white-mute-rgb));
}
</style>
