import * as path from 'path'
import * as fs from 'fs/promises'

export async function exportAsJSON(
  dir: string,
  baseName: string,
  headers: string[],
  data: (string | number)[][]
): Promise<string> {
  const filePath = path.join(dir, `${baseName}.json`)
  const rows = data.map((row) =>
    row.reduce(
      (acc, col, i) => ({
        ...acc,
        [headers[i]!]: col,
      }),
      {}
    )
  )
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2))
  return filePath
}
