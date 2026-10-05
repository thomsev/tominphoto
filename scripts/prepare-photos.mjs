import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile, readFile } from 'node:fs/promises'
import path from 'node:path'
const source = 'src/assets/photos'
await mkdir('public/photos', { recursive:true })
const files = (await readdir(source, { recursive:true })).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f)).sort((a,b) => a.localeCompare(b, undefined, { numeric:true }))
const uploads = await readdir('public/photos/webp').catch(() => [])
const replacements = JSON.parse(await readFile('src/data/photo-sources.json','utf8'))
const output = []
for (const file of files) {
  const basename = path.basename(file).replace(/^\d+-/, '').replace(/\.[^.]+$/, '')
  const preferred = replacements[parseInt(path.basename(file))] ?? basename + '.webp'
  const match = uploads.find(name => name.toLowerCase() === preferred.toLowerCase())
  const upload = match
  const original = upload ? path.join('public/photos/webp', upload) : path.join(source,file)
  const id = file.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g,'_')
  const info = await sharp(original).metadata()
  const sizes = [720,1600,2560]
  for (const width of sizes) {
    const dest = 'public/photos/'+id+'-'+width+'.webp'
    const existing = await stat(dest).catch(()=>null)
    if (upload || !existing || existing.mtimeMs < (await stat(original)).mtimeMs) {
      await sharp(original).rotate().resize({ width, withoutEnlargement:true }).webp({quality:width===2560?88:82}).toFile(dest)
    }
  }
  const width = info.autoOrient?.width ?? info.width
  const url = size => '/photos/'+id+'-'+size+'.webp'
  const srcSet = sizes => [...new Set(sizes.map(size => Math.min(size, width)))].map(actual => url(sizes.find(size => Math.min(size,width) === actual))+' '+actual+'w').join(', ')
  output.push({ id, number:parseInt(file.split(/[\\/]/).pop()), src:url(1600), thumb:url(720), full:upload?'/photos/webp/'+upload:url(2560), srcSet:srcSet([720,1600,2560]), thumbSrcSet:srcSet([720,1600]), width, height:info.autoOrient?.height ?? info.height })
}
await writeFile('src/data/generated-photos.json',JSON.stringify(output,null,2)+'\n')
console.log('Prepared '+output.length+' photographs in three sizes.')

// Preserve the supplied logo and prepare a small transparent version for the header.
const logo = 'public/logo/meling_media_logo_black_white.png'
if (await stat(logo).catch(() => null)) {
  const {data,info} = await sharp(logo).ensureAlpha().raw().toBuffer({resolveWithObject:true})
  for (let pixel = 0; pixel < data.length; pixel += 4) {
    const ink = 255 - Math.round((data[pixel] + data[pixel+1] + data[pixel+2]) / 3)
    data[pixel+3] = Math.round(ink * data[pixel+3] / 255)
    data[pixel] = data[pixel+1] = data[pixel+2] = 255
  }
  await sharp(data,{raw:{width:info.width,height:info.height,channels:4}})
    .trim().resize({width:480,withoutEnlargement:true}).webp({lossless:true})
    .toFile('public/logo/meling_media_logo_header.webp')
}
