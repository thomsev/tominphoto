import generated from './generated-photos.json'

const descriptions: Record<number, [string,string]> = {
  1:['Veien videre','En svingete fjellvei i et snødekt landskap, fotografert i svart-hvitt.'],
  2:['Gjennom fjellet','En vei leder inn i en tunnel under dramatiske skyer.'],
  3:['Vektløs','Et kunstnerisk svart-hvitt-portrett i et badekar.'],
  4:['Over alt','En person står på en fjellrygg med utsikt over fjellene.'],
  5:['Mellom rom','En person i enden av en smal korridor, i svart-hvitt.'],
  6:['Et annet tempo','En kvinne med solhatt ved en sykkel og en blå dør.'],
  7:['Det siste lyset','En kvinne i en flagrende kjole i et varmt, steinete landskap.'],
  8:['Fritt fall','Figurer av stupere foran en stor innendørs vannvegg.'],
  9:['Stillheten','En kvinne på gyllen sand under en dypblå himmel.'],
  10:['Mot vinden','Bølger slår mot en kystvei under en mørk himmel.'],
  11:['Uvær','En steinmolo møter opprørt hav og tunge skyer.'],
  12:['Havets rytme','Hvite bølgetopper under en dramatisk skyhimmel.'],
  13:['Der havet tar tak','Store bølger og bygninger langs en værhard kyst.'],
  14:['Byen sover aldri','En bil i snø og damp i en opplyst bygate om natten.'],
  15:['Midt i alt','Snøfall, mennesker og lysende reklameskilt på Times Square.'],
  16:['Et stille New York','En snødekt gate mellom høye bygninger.'],
  17:['Helt stille','En steinmolo strekker seg ut i et stille, blått hav.'],
  18:['På vei','En person går gjennom en smal gate med varme fasader.'],
  19:['Blå dager','Et basseng og en kirke med kupler under blå himmel.'],
  20:['Ved vannet','En strand og bølger sett fra en terrasse.'],
  21:['Et lite øyeblikk','En strand med bølger og mennesker ved vannkanten.'],
}
export const photos = generated.map(photo => ({
  ...photo,
  title:descriptions[photo.number]?.[0] ?? 'Et øyeblikk',
  alt:descriptions[photo.number]?.[1] ?? 'Fotografi fra Tomin Photos portefølje',
}))
export type Photo = (typeof photos)[number]
export const chapters = [
  { number:13, word:'VILL.', eyebrow:'01 / Naturens krefter', line:'Der havet tar tak.', position:'50% 55%', mobile:'65% 50%' },
  { number:9, word:'STILLE.', eyebrow:'02 / Langt fra alt', line:'Ingenting. Og alt.', position:'50% 55%', mobile:'43% 50%' },
  { number:14, word:'LEVENDE.', eyebrow:'03 / Mellom mennesker', line:'En by som aldri står stille.', position:'50% 50%', mobile:'45% 50%' },
  { number:7, word:'NÆR.', eyebrow:'04 / I det siste lyset', line:'Det som bare varer et øyeblikk.', position:'50% 55%', mobile:'65% 50%' },
  { number:17, word:'TIDLØS.', eyebrow:'05 / Tilbake til roen', line:'Noen øyeblikk blir værende.', position:'50% 55%', mobile:'50% 50%' },
].flatMap(chapter => {
  const photo = photos.find(item => item.number === chapter.number)
  return photo ? [{...chapter,photo}] : []
})

