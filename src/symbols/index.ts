import type { InjectionKey } from 'vue'
import type { CameraStreamApi } from '@/types/types'

export const CameraStreamSymbol: InjectionKey<CameraStreamApi> = Symbol('CameraStreamApi')
