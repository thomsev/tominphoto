import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
const source = 'src/assets/photos'
await mkdir('public/photos', { recursive:true })
const files = (await readdir(source, { recursive:true })).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f)).sort((a,b) => a.localeCompare(b, undefined, { numeric:true }))
const output = []
for (const file of files) {
  const original = path.join(source,file)
  const id = file.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g,'_')
  const info = await sharp(original).metadata()
  const sizes = [720,1600,2560]
  for (const width of sizes) {
    const dest = 'public/photos/'+id+'-'+width+'.webp'
    const existing = await stat(dest).catch(()=>null)
    if (!existing || existing.mtimeMs < (await stat(original)).mtimeMs) {
      await sharp(original).rotate().resize({ width, withoutEnlargement:true }).webp({quality:width===2560?88:82}).toFile(dest)
    }
  }
  output.push({ id, number:parseInt(file.split(/[\\/]/).pop()), src:'/photos/'+id+'-1600.webp', thumb:'/photos/'+id+'-720.webp', full:'/photos/'+id+'-2560.webp', width:info.autoOrient?.width ?? info.width, height:info.autoOrient?.height ?? info.height })
}
await writeFile('src/data/generated-photos.json',JSON.stringify(output,null,2)+'\n')
console.log('Prepared '+output.length+' photographs in three sizes.')
