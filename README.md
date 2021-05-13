# data-jp-covid19-vaccination

This is an **unofficial repository** of CSVs extracted from the Excel files posted on [the Prime Minister of Japan website](https://www.kantei.go.jp/jp/headline/kansensho/vaccine.html). This repository will be updated when the official data is updated.

## Directory structure

If you just want to get the latest data, please refer to `latest.csv` in each directory. If you want to get historical data by prefecture, please refer to `{{DATE}}.csv`. Note that historical data can be missing. Since the government does not update the official data every day, it will only be saved on the day the data is updated.

```
data/
├── nationwide
│   ├── medical_workers
│   │   ├── latest.csv
│   │   ├── latest.json
│   │   └── latest.ndjson
│   └── senior_citizen
│       ├── latest.csv
│       ├── latest.json
│       └── latest.ndjson
└── prefecture
    ├── medical_workers
    │   ├── {{DATE}}.csv
    │   ├── {{DATE}}.json
    │   ├── {{DATE}}.ndjson
    │   ├── latest.csv
    │   ├── latest.json
    │   └── latest.ndjson
    └── senior_citizen
        ├── {{DATE}}.csv
        ├── {{DATE}}.json
        ├── {{DATE}}.ndjson
        ├── latest.csv
        ├── latest.json
        └── latest.ndjson
```

<detail>
<summary>
## Data structure: CSV
</summary>

### Data structure: nationwide/\*_/_.csv

```
head -n2 data/nationwide/medical_workers/latest.csv
date,total_vaccinations,1st_vaccinations,2nd_vaccinations
2021-04-13,53986,13896,40090
```

- `date`: Day. YYYY-MM-DD
- `total_vaccinations`: The number of times vaccinations on that day
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

### Data structure: prefecture/\*_/_.csv

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

</detail>

<detail>
<summary>
## Data structure: JSON
</summary>

### Data structure: nationwide/\*_/_.json

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

### Data structure: prefecture/\*_/_.json

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

- `code`: For sorting
- `prefecture`: Prefecture name such as `北海道`, `東京都`, `京都府`, and `神奈川県`
- `total_vaccinations`: The number of times total vaccinations
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

</detail>

<detail>
<summary>
## Data structure: NDJSON
</summary>

### Data structure: nationwide/\*_/_.ndjson

```
head -n2 data/nationwide/medical_workers/latest.ndjson
{"date":"2021-04-13","total_vaccinations":53986,"1st_vaccinations":13896,"2nd_vaccinations":40090}
{"date":"2021-04-14","total_vaccinations":50996,"1st_vaccinations":9569,"2nd_vaccinations":41427}
```

- `date`: Day. YYYY-MM-DD
- `total_vaccinations`: The number of times vaccinations on that day
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

### Data structure: prefecture/\*_/_.ndjson

```
head -n2 data/prefecture/medical_workers/latest.ndjson
{"code":"01","prefecture":"北海道","total_vaccinations":164622,"1st_vaccinations":110357,"2nd_vaccinations":54265}
{"code":"02","prefecture":"青森県","total_vaccinations":43071,"1st_vaccinations":30210,"2nd_vaccinations":12861}
```

- `code`: For sorting
- `prefecture`: Prefecture name such as `北海道`, `東京都`, `京都府`, and `神奈川県`
- `total_vaccinations`: The number of times total vaccinations
- `1st_vaccinations`: The number of times the first vaccine was given on that day
- `2nd_vaccinations`: The number of times the second vaccine was given on that day

</detail>
