import * as XLSX from 'xlsx'

type DailyRow = {
  date: Date
  totalVaccinations: number
  firstVaccinations: number
  secondVaccinations: number
  firstVaccinationsPfizer: number
  secondVaccinationsPfizer: number
  firstVaccinationsModerna: number
  secondVaccinationsModerna: number
}

type PrefectureRow = {
  prefectureCode: string
  prefectureName: string
  totalVaccinations: number
  firstVaccinations: number
  secondVaccinations: number
}

export type ParserResult = {
  latestDate?: Date
  headers: string[]
  data: (string | number)[][]
}

export function toYYYYMMDD(d: Date): string {
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  )
}

export const sheetByName =
  (name: string) =>
  (ws: XLSX.WorkBook): XLSX.WorkSheet => {
    const sheet = ws.Sheets[name]
    if (!sheet) {
      throw new Error(`No sheet found: ${name}`)
    }
    return sheet
  }

export const parseAsNationwide =
  (
    args: {
      // 1-index
      dataStartRow: number
    },
    rowParser: (sheet: XLSX.WorkSheet, rowCount: number) => DailyRow
  ) =>
  (sheet: XLSX.WorkSheet): ParserResult => {
    const data: DailyRow[] = []
    for (
      let rowCount = args.dataStartRow;
      sheet[`A${rowCount + 1}`];
      rowCount++
    ) {
      data.push(rowParser(sheet, rowCount))
    }
    const sorted = data.sort((a, b) => a.date.getTime() - b.date.getTime())

    return {
      headers: [
        'date',
        'total_vaccinations',
        '1st_vaccinations',
        '2nd_vaccinations',
        '1st_vaccinations_pfizer',
        '2nd_vaccinations_pfizer',
        '1st_vaccinations_moderna',
        '2nd_vaccinations_moderna',
      ],
      data: sorted.map((item) => [
        toYYYYMMDD(item.date),
        item.totalVaccinations,
        item.firstVaccinations,
        item.secondVaccinations,
        item.firstVaccinationsPfizer,
        item.secondVaccinationsPfizer,
        item.firstVaccinationsModerna,
        item.secondVaccinationsModerna,
      ]),
    }
  }

export const parseAsPrefectures =
  (
    args: {
      // 1-index
      dataStartRow: number
    },
    rowParser: (sheet: XLSX.WorkSheet, rowCount: number) => PrefectureRow
  ) =>
  (sheet: XLSX.WorkSheet): ParserResult => {
    const data: PrefectureRow[] = []
    for (
      let rowCount = args.dataStartRow;
      sheet[`A${rowCount + 1}`];
      rowCount++
    ) {
      data.push(rowParser(sheet, rowCount))
    }

    const matched = sheet['D2'].v.match(/(?<month>\d+)月(?<day>\d+)日時点/)
    if (!matched) {
      throw new Error(`Date parse failed: ${sheet['D2']}`)
    }
    const { month: _month, day: _day } = matched.groups!
    const month = parseInt(_month ?? '', 10)
    const day = parseInt(_day ?? '', 10)
    if (!month || !day) {
      throw new Error(`Date parse failed: month=${_month}, day=${_day}`)
    }
    const latestDate = new Date(new Date().getFullYear(), month - 1, day)

    return {
      latestDate,
      headers: [
        'code',
        'prefecture',
        'total_vaccinations',
        '1st_vaccinations',
        '2nd_vaccinations',
      ],
      data: data.map((item) => [
        item.prefectureCode,
        item.prefectureName,
        item.totalVaccinations,
        item.firstVaccinations,
        item.secondVaccinations,
      ]),
    }
  }
