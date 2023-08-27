export type ThemeColors = 'ash-grey' | 'pale-dogwood' | 'raisin-black' | 'raspberry-rose' | 'azure'

export type Character = {
  id: number
  img: string
  name: string
}

export type CameraStreamApi = {
  startRecord: () => void
  stopRecord: () => Blob
}
