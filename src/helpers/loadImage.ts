export function loadImage(imagesArray: string[]) {
  imagesArray.map((imgSrc) => {
    const img = new Image()
    img.src = imgSrc
  })
}
