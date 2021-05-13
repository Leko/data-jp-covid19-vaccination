import * as path from 'path'
import * as fs from 'fs'
import * as XLSX from 'xlsx'
import fetch from 'node-fetch'
import { dataSources } from './data-sources'
import { toYYYYMMDD } from './util'
import { exportAsCSV, exportAsJSON } from './formatters'

const exporters = [exportAsCSV, exportAsJSON] as const

Promise.all(
  dataSources.map((ds) =>
    fetch(ds.url)
      .then((res) => res.buffer())
      .then((buff) => XLSX.read(buff, { type: 'buffer' }))
      .then((workSheet) => ds.getSheet(workSheet))
      .then(async (sheet) => {
        const { latestDate, headers, data } = ds.getData(sheet)
        if (!fs.existsSync(ds.base)) {
          fs.mkdirSync(ds.base, { recursive: true })
        }

        return Promise.all(
          exporters.map(async (exporter) => {
            const filePath = await exporter(ds.base, 'latest', headers, data)
            const extName = path.extname(filePath)
            if (latestDate) {
              fs.copyFileSync(
                filePath,
                path.join(ds.base, toYYYYMMDD(latestDate) + extName)
              )
            }
          })
        )
      })
  )
).catch((e) => {
  console.error(e.stack)
  process.exit(1)
})
