import XLSX from 'xlsx'

type DailyRow = {
  date: Date
  totalVaccinations: number
  peopleVaccinated: number
  peopleFullyVaccinated: number
}

type PrefectureRow = {
  prefectureCode: string
  prefectureName: string
  totalVaccinations: number
  peopleVaccinated: number
  peopleFullyVaccinated: number
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

export const sheetByName = (name: string) => (
  ws: XLSX.WorkBook
): XLSX.WorkSheet => {
  const sheet = ws.Sheets[name]
  if (!sheet) {
    throw new Error(`No sheet found: ${name}`)
  }
  return sheet
}

export const parseAsDaily = (
  args: {
    // 1-index
    dataStartRow: number
  },
  rowParser: (sheet: XLSX.WorkSheet, rowCount: number) => DailyRow
) => (sheet: XLSX.WorkSheet): { latestDate: Date; data: string[][] } => {
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
    latestDate: sorted[sorted.length - 1]!.date,
    data: [
      [
        'date',
        'total_vaccinations',
        'people_vaccinated',
        'people_fully_vaccinated',
      ],
    ].concat(
      sorted.map((item) => [
        toYYYYMMDD(item.date),
        String(item.totalVaccinations),
        String(item.peopleVaccinated),
        String(item.peopleFullyVaccinated),
      ])
    ),
  }
}

export const parseAsPrefectures = (
  args: {
    // 1-index
    dataStartRow: number
  },
  rowParser: (sheet: XLSX.WorkSheet, rowCount: number) => PrefectureRow
) => (sheet: XLSX.WorkSheet): { latestDate: Date; data: string[][] } => {
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
    data: [
      [
        'code',
        'prefecture',
        'total_vaccinations',
        'people_vaccinated',
        'people_fully_vaccinated',
      ],
    ].concat(
      data.map((item) => [
        item.prefectureCode,
        item.prefectureName,
        String(item.totalVaccinations),
        String(item.peopleVaccinated),
        String(item.peopleFullyVaccinated),
      ])
    ),
  }
}
