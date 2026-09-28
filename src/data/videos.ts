import generated from './generated-videos.json'

const words = ['SVEV.', 'PULS.', 'STILLE.', 'UTSIKT.', 'AVSTED.']
const lines = ['Gjennom tåken. Inn i øyeblikket.', 'Verden står aldri stille.', 'Noen øyeblikk trenger ingen ord.', 'Et vindu mot noe større.', 'Reisen starter her.']

export const videos = words.map((word, index) => ({
  id: `film-${index + 1}`,
  word,
  line: lines[index],
  src: generated[index].src,
  poster: generated[index].poster,
}))
