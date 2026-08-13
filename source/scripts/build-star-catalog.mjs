import fs from 'node:fs'

const input = JSON.parse(fs.readFileSync(new URL('../src/data/bright-stars.json', import.meta.url), 'utf8'))

function raDegrees(value) {
  const [hours, minutes, seconds] = value.split(':').map(Number)
  return (hours + minutes / 60 + seconds / 3600) * 15
}

function decDegrees(value) {
  const sign = value.startsWith('-') ? -1 : 1
  const [degrees, minutes, seconds] = value.replace(/[+-]/, '').split(':').map(Number)
  return sign * (degrees + minutes / 60 + seconds / 3600)
}

const spectralColors = {
  O: '#9bb0ff', B: '#aabfff', A: '#cad7ff', F: '#f8f7ff',
  G: '#fff4ea', K: '#ffd2a1', M: '#ffb56c',
}

const compact = input
  .filter((star) => Number(star.MAG) <= 5.6)
  .map((star) => {
    const spectral = String(star['Title HD'] || '').replace(/^[a-z]/, '').trim()[0]
    return [
      Number(raDegrees(star.RA).toFixed(4)),
      Number(decDegrees(star.DEC).toFixed(4)),
      Number(Number(star.MAG).toFixed(2)),
      spectralColors[spectral] || '#eaf2ff',
    ]
  })

fs.writeFileSync(new URL('../src/data/bright-stars-compact.json', import.meta.url), `${JSON.stringify(compact)}\n`)
console.log(`Wrote ${compact.length} stars`) // eslint-disable-line no-console
