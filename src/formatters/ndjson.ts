import * as path from 'path'
import * as fs from 'fs'

export async function exportAsNDJSON(
  dir: string,
  baseName: string,
  headers: string[],
  data: string[][]
): Promise<string> {
  const filePath = path.join(dir, `${baseName}.ndjson`)
  const stream = fs.createWriteStream(filePath)
  return new Promise((resolve, reject) => {
    stream.on('finish', resolve)
    stream.on('error', reject)

    data.forEach((row) => {
      const item = row.reduce(
        (acc, col, i) => ({
          ...acc,
          [headers[i]!]: col,
        }),
        {}
      )
      stream.write(JSON.stringify(item) + '\n')
    })
    stream.end()
  }).then(() => filePath)
}
