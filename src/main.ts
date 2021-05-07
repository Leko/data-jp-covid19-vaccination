import path from 'path'
import fs from 'fs'
import XLSX from 'xlsx'
import fetch from 'node-fetch'
import { writeToPath } from '@fast-csv/format'
import { dataSources } from './data-sources'
import { toYYYYMMDD } from './util'

Promise.all(
  dataSources.map((ds) =>
    fetch(ds.url)
      .then((res) => res.buffer())
      .then((buff) => XLSX.read(buff, { type: 'buffer' }))
      .then((workSheet) => ds.getSheet(workSheet))
      .then(async (sheet) => {
        const { latestDate, data } = ds.getData(sheet)
        if (!fs.existsSync(ds.base)) {
          fs.mkdirSync(ds.base, { recursive: true })
        }
        const filePath = path.join(ds.base, `${toYYYYMMDD(latestDate)}.csv`)

        return new Promise((resolve, reject) => {
          writeToPath(filePath, data)
            .on('error', reject)
            .on('finish', () => {
              fs.copyFileSync(filePath, path.join(ds.base, 'latest.csv'))
              resolve(null)
            })
        })
      })
  )
).catch((e) => {
  console.error(e.stack)
  process.exit(1)
})
