import path from 'path'
import XLSX from 'xlsx'
import { sheetByName, parseAsDaily, parseAsPrefectures } from './util'

type DataSrouce = {
  base: string
  url: string
  getSheet: (ws: XLSX.WorkBook) => XLSX.WorkSheet
  getData: (sheet: XLSX.WorkSheet) => { latestDate: Date; data: string[][] }
}

export const dataSources: DataSrouce[] = [
  {
    base: path.join(__dirname, '..', 'data', 'daily', 'IRYO'),
    url: 'https://www.kantei.go.jp/jp/content/IRYO-vaccination_data.xlsx',
    getSheet: sheetByName('医療従事者'),
    getData: parseAsDaily(
      {
        dataStartRow: 5,
      },
      (sheet, rowCount) => ({
        date: new Date(sheet[`A${rowCount}`].w!),
        totalVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
        peopleVaccinated: parseInt(sheet[`D${rowCount}`].v, 10),
        peopleFullyVaccinated: parseInt(sheet[`E${rowCount}`].v, 10),
      })
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'daily', 'KOREI'),
    url: 'https://www.kantei.go.jp/jp/content/KOREI-vaccination_data.xlsx',
    getSheet: sheetByName('高齢者等'),
    getData: parseAsDaily(
      {
        dataStartRow: 5,
      },
      (sheet, rowCount) => ({
        date: new Date(sheet[`A${rowCount}`].w!),
        totalVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
        peopleVaccinated: parseInt(sheet[`D${rowCount}`].v, 10),
        peopleFullyVaccinated: parseInt(sheet[`E${rowCount}`].v, 10),
      })
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'prefecture', 'IRYO'),
    url:
      'https://www.kantei.go.jp/jp/content/IRYO-kenbetsu-vaccination_data.xlsx',
    getSheet: sheetByName('医療従事者'),
    getData: parseAsPrefectures(
      {
        dataStartRow: 5,
      },
      (sheet, rowCount) => {
        const [code, name] = sheet[`A${rowCount}`].v.split(' ')
        return {
          prefectureCode: code,
          prefectureName: name,
          totalVaccinations: parseInt(sheet[`B${rowCount}`].v, 10),
          peopleVaccinated: parseInt(sheet[`C${rowCount}`].v, 10),
          peopleFullyVaccinated: parseInt(sheet[`D${rowCount}`].v, 10),
        }
      }
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'prefecture', 'KOREI'),
    url:
      'https://www.kantei.go.jp/jp/content/KOREI-kenbetsu-vaccination_data.xlsx',
    getSheet: sheetByName('高齢者等'),
    getData: parseAsPrefectures(
      {
        dataStartRow: 5,
      },
      (sheet, rowCount) => {
        const [code, name] = sheet[`A${rowCount}`].v.split(' ')
        return {
          prefectureCode: code,
          prefectureName: name,
          totalVaccinations: parseInt(sheet[`B${rowCount}`].v, 10),
          peopleVaccinated: parseInt(sheet[`C${rowCount}`].v, 10),
          peopleFullyVaccinated: parseInt(sheet[`D${rowCount}`].v, 10),
        }
      }
    ),
  },
]
