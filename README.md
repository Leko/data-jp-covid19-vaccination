# data-jp-covid19-vaccination

This is an **unofficial repository** of CSVs extracted from the Excel files posted on [the Prime Minister of Japan website](https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html). This repository will be updated when the official data is updated.

## Directory structure

If you just want to get the latest data, please refer to `latest.csv` in each directory. If you want to get historical data by prefecture, please refer to `{{DATE}}.csv`. Note that historical data can be missing. Since the government does not update the official data every day, it will only be saved on the day the data is updated.

```
data/
├── nationwide
│   ├── medical_workers
│   │   └── latest.csv
│   └── senior_citizen
│       └── latest.csv
└── prefecture
    ├── medical_workers
    │   ├── {{DATE}}.csv
    │   └── latest.csv
    └── senior_citizen
        ├── {{DATE}}.csv
        └── latest.csv
```

## Data structure: nationwide/**/*.csv

```
head -n2 data/nationwide/medical_workers/latest.csv
date,total_vaccinations,1st_vaccinations,2nd_vaccinations
2021-04-13,53986,13896,40090
```

- `date`: Day. YYYY-MM-DD
- `total_vaccinations`: The number of times vaccinations on that day
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

## Data structure: prefecture/**/*.csv

```
head -n2 data/prefecture/medical_workers/latest.csv
code,prefecture,total_vaccinations,1st_vaccinations,2nd_vaccinations
01,北海道,146108,95871,50237
```

- `code`: For sorting
- `prefecture`: Prefecture name such as `北海道`, `東京都`, `京都府`, and `神奈川県`
- `total_vaccinations`: The number of times total vaccinations
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day
