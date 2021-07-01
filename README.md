# Ledger Rest API
This is a node.js REST API that offers an endpoint to fetch ledger entries for a given date range and frequency. The code is written in Typescript with Express as the backend framework.

## Instructions
- Clone this github repo to your machine.
- Node.JS is required to be installed in your system. 
- Change into the cloned directory run <i>npm install</i>. (use <i>--only=prod</i> flag to avoid installing the dev dependencies)
- Use below commands as you wish
    - Run <i>npm start</i> to start a development server running the built application in port 4000.
    - Run <i>npm test</i> to run the tests.
    - Run <i>npm run dev</i> to run the server in development mode in port 4000.
    - Run <i>npm run build</i> to compile and build the project.

## Output Format
- Validation error format
```json
    {
     "validationErrors": {
        "end_date": "end_date cannot be undefined",
        "frequency": "frequency should be one of WEEKLY, FORTNIGHTLY or MONTHLY"
    }
}
```
- Correct response format
```json
    {
     "ledgerLines": [
        {
            "startDate": "2020-03-24T00:00:00.000Z",
            "endDate": "2020-03-30T00:00:00.000Z",
            "totalRent": 555
        },
        {
            "startDate": "2020-03-31T00:00:00.000Z",
            "endDate": "2020-04-03T00:00:00.000Z",
            "totalRent": 317.14285714285717
        }
      ],
     "numberOfLedgerLines": 2
  }
}
```

## Assumptions
- Dates are in ISO8601 format as it's the default format in Javascript.