import generated from './generated-videos.json'

const words = ['PULS.']
const lines = ['Verden står aldri stille.']

export const videos = words.map((word, index) => ({
  id: `film-${index + 1}`,
  word,
  line: lines[index],
  src: generated[index].src,
  poster: generated[index].poster,
}))
