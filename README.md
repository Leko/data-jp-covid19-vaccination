# data-jp-covid19-vaccination

This is an **unofficial repository** to make the Excel files of vaccination results available on [the Prime Minister's Office of Japan (首相官邸) website](https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html) machine-readable. This repository will be automatically updated when the Excel is updated.

## Directory structure

If you just want to get the latest data, you can refer to `latest.csv` or `latest.json` in each directory. If you're going to get historical data by prefecture, please refer to `{{DATE}}.csv` or `{{DATE}}.json`. Note that historical data may not be updated daily as the government does not update the official data every day. They will be saved on the day the Excel is updated.

```
data/
├── nationwide
│   ├── medical_workers
│   │   ├── latest.csv
│   │   └── latest.json
│   └── senior_citizen
│       ├── latest.csv
│       └── latest.json
└── prefecture
    ├── medical_workers
    │   ├── {{DATE}}.csv
    │   ├── {{DATE}}.json
    │   ├── latest.csv
    │   └── latest.json
    └── senior_citizen
        ├── {{DATE}}.csv
        ├── {{DATE}}.json
        ├── latest.csv
        └── latest.json
```

## Data structure: CSV

### Data structure: nationwide/\*\*/\*.csv

```
head -n2 data/nationwide/medical_workers/latest.csv
date,total_vaccinations,1st_vaccinations,2nd_vaccinations
2021-04-13,53986,13896,40090
```

- `date`: Day. YYYY-MM-DD
- `total_vaccinations`: The number of times vaccinations on that day
- `1st_vaccinations_pfizer`: Number of doses of Pfizer vaccine per day for the first time
- `2nd_vaccinations_pfizer`: Number of doses of Pfizer vaccine per day for the second time
- `1st_vaccinations_moderna`: Number of doses of Moderna vaccine per day for the first time
- `2nd_vaccinations_moderna`: Number of doses of Moderna vaccine per day for the second time
- `1st_vaccinations`: **Deprecated: Please use `1st_vaccinations_pfizer` instead**
- `2nd_vaccinations`: **Deprecated: Please use `2nd_vaccinations_pfizer` instead**

### Data structure: prefecture/\*\*/\*.csv

```
head -n2 data/prefecture/medical_workers/latest.csv
code,prefecture,total_vaccinations,1st_vaccinations,2nd_vaccinations
01,北海道,146108,95871,50237
```

- `code`: For sorting. `01`~`46`
- `prefecture`: Prefecture name such as `北海道`, `東京都`, `京都府`, and `神奈川県`
- `total_vaccinations`: The number of times total vaccinations
- `1st_vaccinations_pfizer`: Number of doses of Pfizer vaccine per day for the first time
- `2nd_vaccinations_pfizer`: Number of doses of Pfizer vaccine per day for the second time
- `1st_vaccinations_moderna`: Number of doses of Moderna vaccine per day for the first time
- `2nd_vaccinations_moderna`: Number of doses of Moderna vaccine per day for the second time
- `1st_vaccinations`: **Deprecated: Please use `1st_vaccinations_pfizer` instead**
- `2nd_vaccinations`: **Deprecated: Please use `2nd_vaccinations_pfizer` instead**

## Data structure: JSON

### Data structure: nationwide/\*\*/\*.json

```json
[
  {
    "date": "2021-04-13",
    "total_vaccinations": 53986,
    "1st_vaccinations": 13896,
    "2nd_vaccinations": 40090
  }
  // ...
]
```

- `date`: Day. YYYY-MM-DD
- `total_vaccinations`: The number of times vaccinations on that day
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

### Data structure: prefecture/\*\*/\*.json

```json
[
  {
    "code": "01",
    "prefecture": "北海道",
    "total_vaccinations": 164622,
    "1st_vaccinations": 110357,
    "2nd_vaccinations": 54265
  }
  // ...
]
```

- `code`: For sorting. `01`~`46`
- `prefecture`: Prefecture name such as `北海道`, `東京都`, `京都府`, and `神奈川県`
- `total_vaccinations`: The number of times total vaccinations
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day
