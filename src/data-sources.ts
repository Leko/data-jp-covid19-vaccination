import * as path from 'path'
import * as XLSX from 'xlsx'
import {
  ParserResult,
  sheetByName,
  parseAsNationwide,
  parseAsPrefectures,
} from './util'

type DataSrouce = {
  base: string
  url: string
  getSheet: (ws: XLSX.WorkBook) => XLSX.WorkSheet
  getData: (sheet: XLSX.WorkSheet) => ParserResult
}

export const dataSources: DataSrouce[] = [
  {
    base: path.join(__dirname, '..', 'data', 'nationwide', 'medical_workers'),
    url: 'https://www.kantei.go.jp/jp/content/IRYO-vaccination_data3.xlsx',
    getSheet: sheetByName('医療従事者'),
    getData: parseAsNationwide(
      {
        dataStartRow: 6,
      },
      (sheet, rowCount) => {
        const firstVaccinationsPfizer = parseInt(sheet[`D${rowCount}`].v, 10)
        const secondVaccinationsPfizer = parseInt(sheet[`F${rowCount}`].v, 10)
        const firstVaccinationsModerna =
          parseInt(sheet[`E${rowCount}`]?.v, 10) || 0
        const secondVaccinationsModerna =
          parseInt(sheet[`G${rowCount}`]?.v, 10) || 0

        return {
          date: new Date(sheet[`A${rowCount}`].w!),
          totalVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
          firstVaccinationsPfizer,
          secondVaccinationsPfizer,
          firstVaccinationsModerna,
          secondVaccinationsModerna,
          firstVaccinations: firstVaccinationsPfizer + firstVaccinationsModerna,
          secondVaccinations:
            secondVaccinationsPfizer + secondVaccinationsModerna,
        }
      }
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'nationwide', 'senior_citizen'),
    url: 'https://www.kantei.go.jp/jp/content/KOREI-vaccination_data3.xlsx',
    getSheet: sheetByName('高齢者等'),
    getData: parseAsNationwide(
      {
        dataStartRow: 6,
      },
      (sheet, rowCount) => {
        const firstVaccinationsPfizer = parseInt(sheet[`D${rowCount}`].v, 10)
        const secondVaccinationsPfizer = parseInt(sheet[`F${rowCount}`].v, 10)
        const firstVaccinationsModerna =
          parseInt(sheet[`E${rowCount}`]?.v, 10) || 0
        const secondVaccinationsModerna =
          parseInt(sheet[`G${rowCount}`]?.v, 10) || 0

        return {
          date: new Date(sheet[`A${rowCount}`].w!),
          totalVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
          firstVaccinationsPfizer,
          secondVaccinationsPfizer,
          firstVaccinationsModerna,
          secondVaccinationsModerna,
          firstVaccinations: firstVaccinationsPfizer + firstVaccinationsModerna,
          secondVaccinations:
            secondVaccinationsPfizer + secondVaccinationsModerna,
        }
      }
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'prefecture', 'medical_workers'),
    url: 'https://www.kantei.go.jp/jp/content/IRYO-kenbetsu-vaccination_data.xlsx',
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
          firstVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
          secondVaccinations: parseInt(sheet[`D${rowCount}`].v, 10),
        }
      }
    ),
  },
  {
    base: path.join(__dirname, '..', 'data', 'prefecture', 'senior_citizen'),
    url: 'https://www.kantei.go.jp/jp/content/KOREI-kenbetsu-vaccination_data2.xlsx',
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
          firstVaccinations: parseInt(sheet[`C${rowCount}`].v, 10),
          secondVaccinations: parseInt(sheet[`D${rowCount}`].v, 10),
        }
      }
    ),
  },
]
