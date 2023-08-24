export function downloadUrl(blob: Blob, name: string = '') {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.setAttribute('download', `${name.replace(' ', '-')}`)

  document.body.appendChild(link)

  link.click()
  URL.revokeObjectURL(url)
}
