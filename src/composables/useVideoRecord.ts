import { ref } from 'vue'

export function useVideoRecord() {
  const cameraStream = ref<MediaStream | null>(null)
  const mediaRecorder = ref<MediaRecorder | null>(null)
  const chunks = ref<Blob[]>([])

  function resetRecord() {
    chunks.value = []
    mediaRecorder.value = null
  }

  async function setCameraStream(video: HTMLVideoElement) {
    cameraStream.value = await navigator.mediaDevices.getUserMedia({
      video: true
    })

    video.srcObject = cameraStream.value
  }

  function startRecord() {
    if (!cameraStream.value) {
      throw new Error('Camera stream is not set')
    }

    mediaRecorder.value = new MediaRecorder(cameraStream.value, {
      mimeType: 'video/webm'
    })

    mediaRecorder.value.ondataavailable = (e) => {
      chunks.value.push(e.data)
    }

    mediaRecorder.value.start(1000)
  }

  function stopRecord() {
    if (!mediaRecorder.value) {
      throw new Error('Media recorder is not set. First start recording.')
    }

    mediaRecorder.value.stop()
    const videoFile = new Blob(chunks.value, { type: 'video/webm' })
    resetRecord()

    return videoFile
  }

  return { setCameraStream, startRecord, stopRecord }
}
