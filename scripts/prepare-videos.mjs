import { createHash } from 'node:crypto'
import { readdirSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

// Pass FFMPEG=/path/to/ffmpeg when it is not on PATH. Originals stay untouched.
const ffmpeg = process.env.FFMPEG || 'ffmpeg'
const source = 'src/assets/video'
const output = 'public/films'
const names = ['Fly gjennom tåke.mp4', 'Flyålasskaos.mp4', 'sjøbasseng.mp4', 'drømme utsikt .mp4', 'Taxe1.mp4']
const manifest = []
const files = readdirSync(source)
mkdirSync(output, { recursive: true })
for (const [index, name] of names.entries()) {
  const actual = files.find(file => file.normalize('NFC') === name)
  if (!actual) throw new Error(`Missing video: ${name}`)
  const input = path.join(source, actual)
  const destination = path.join(output, `film-${[1, 6, 5, 2, 7][index]}`)
  for (const args of [
    ['-i', input, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-g', '50', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', `${destination}.mp4`],
    ['-i', input, '-frames:v', '1', '-q:v', '2', `${destination}.jpg`],
  ]) {
    const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
    if (result.status !== 0) throw new Error(`ffmpeg failed for ${name}: ${result.error || result.status}`)
  }
  const urls = {}
  for (const [key, extension] of [['src', 'mp4'], ['poster', 'jpg']]) {
    const filename = destination + '.' + extension
    const hash = createHash('sha256').update(readFileSync(filename)).digest('hex').slice(0, 12)
    const versioned = destination + '-' + hash + '.' + extension
    renameSync(filename, versioned)
    urls[key] = '/' + versioned.replace(/^public\//, '')
  }
  manifest.push(urls)
  console.log(`Prepared ${index + 1}/${names.length}: ${name}`)
}

writeFileSync("src/data/generated-videos.json", JSON.stringify(manifest, null, 2) + "\n")
