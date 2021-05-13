import * as path from 'path'
import { writeToPath } from '@fast-csv/format'

export async function exportAsCSV(
  dir: string,
  baseName: string,
  headers: string[],
  data: (string | number)[][]
): Promise<string> {
  const filePath = path.join(dir, `${baseName}.csv`)
  return new Promise((resolve, reject) => {
    writeToPath(filePath, [headers].concat(data.map((row) => row.map(String))))
      .on('error', reject)
      .on('finish', resolve)
  }).then(() => filePath)
}
