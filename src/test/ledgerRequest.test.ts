import request from "supertest";
import app from "../app/app";
import { Frequency } from "../app/models";
import { IndexType } from "../app/models/apiModels";

const validRequest: IndexType = {
  start_date: "2020-03-24T00:00:00.000Z",
  end_date: "2020-06-03T00:00:00.000Z",
  frequency: "WEEKLY",
  weekly_rent: "555",
  timezone: "Europe/London",
};

const postRequest = async (queryString: string) => {
  return request(app).get(`/api/v1/ledger?${queryString}`);
};

const convertToQueryString = (body: IndexType) => {
  const queryItems = Object.keys(body).map((key) => `${key}=${body[key]}`);
  return queryItems.join("&");
};

describe("ledger request integration tests", () => {
  test.each`
    field            | value               | expectedMessage
    ${"start_date"}  | ${undefined}        | ${"start_date cannot be undefined"}
    ${"end_date"}    | ${undefined}        | ${"end_date cannot be undefined"}
    ${"frequency"}   | ${undefined}        | ${"frequency cannot be undefined"}
    ${"weekly_rent"} | ${undefined}        | ${"weekly_rent cannot be undefined"}
    ${"timezone"}    | ${undefined}        | ${"timezone cannot be undefined"}
    ${"start_date"}  | ${"test-date"}      | ${"start_date is not a valid ISO date"}
    ${"start_date"}  | ${"2020-13-05"}     | ${"start_date is not a valid ISO date"}
    ${"end_date"}    | ${"test-date"}      | ${"end_date is not a valid ISO date"}
    ${"end_date"}    | ${"2020-11-35"}     | ${"end_date is not a valid ISO date"}
    ${"end_date"}    | ${"2019-11-25"}     | ${"start_date should come before the end_date"}
    ${"frequency"}   | ${"test-frequency"} | ${"frequency should be one of WEEKLY, FORTNIGHTLY or MONTHLY"}
    ${"weekly_rent"} | ${"test-rent"}      | ${"weekly_rent should be a numeric value"}
    ${"timezone"}    | ${"America/"}       | ${"timezone should be valid timezone name"}
  `(
    "returns $expectedMessage when $field is $value",
    async ({ field, value, expectedMessage }) => {
      const request = { ...validRequest };
      if (value === undefined) {
        delete request[field];
      } else {
        request[field] = value;
      }
      const response = await postRequest(convertToQueryString(request));
      expect(response.status).toBe(400);
      expect(response.body.validationErrors[field]).toBe(expectedMessage);
    }
  );

  test("returns multiple validation errors correctly", async () => {
    const expected = {
      validationErrors: {
        end_date: "end_date cannot be undefined",
        frequency: "frequency should be one of WEEKLY, FORTNIGHTLY or MONTHLY",
        weekly_rent: "weekly_rent should be a numeric value",
      },
    };
    const request = { ...validRequest };
    delete request["end_date"];
    request["frequency"] = "Weekly";
    request["weekly_rent"] = "12TW";
    const response = await postRequest(convertToQueryString(request));
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expected);
  });

  test("returns 200 status code when a valid request is used", async () => {
    const response = await postRequest(convertToQueryString(validRequest));
    expect(response.statusCode).toBe(200);
  });

  test("returns 200 status code when frequency is of desired value", async () => {
    Object.keys(Frequency).forEach(async (key) => {
      const request = { ...validRequest };
      request["frequency"] = key;
      const response = await postRequest(convertToQueryString(request));
      expect(response.statusCode).toBe(200);
    });
  });

  test("returns correct response for a valid WEEKLY request", async () => {
    const expected = {
      ledgerLines: [
        {
          startDate: "2020-03-24T00:00:00.000Z",
          endDate: "2020-03-30T00:00:00.000Z",
          totalRent: 555,
        },
        {
          startDate: "2020-03-31T00:00:00.000Z",
          endDate: "2020-04-03T00:00:00.000Z",
          totalRent: 317.14285714285717,
        },
      ],
      numberOfLedgerLines: 2,
    };

    const request = {
      ...validRequest,
      end_date: "2020-04-03T00:00:00.000Z",
      frequency: "WEEKLY",
    };

    const actual = await postRequest(convertToQueryString(request));
    expect(expected).toEqual(actual.body);
  });

  test("returns correct response for a valid FORTNIGHTLY request", async () => {
    const expected = {
      ledgerLines: [
        {
          startDate: "2020-03-28T00:00:00.000Z",
          endDate: "2020-04-10T00:00:00.000Z",
          totalRent: 1110,
        },
        {
          startDate: "2020-04-11T00:00:00.000Z",
          endDate: "2020-04-24T00:00:00.000Z",
          totalRent: 1110,
        },
        {
          startDate: "2020-04-25T00:00:00.000Z",
          endDate: "2020-05-03T00:00:00.000Z",
          totalRent: 713.5714285714287,
        },
      ],
      numberOfLedgerLines: 3,
    };

    const request = {
      ...validRequest,
      start_date: "2020-03-28T00:00:00.000Z",
      end_date: "2020-05-03T00:00:00.000Z",
      frequency: "FORTNIGHTLY",
    };

    const actual = await postRequest(convertToQueryString(request));
    expect(expected).toEqual(actual.body);
  });

  test("returns correct response for a valid MONTHLY request", async () => {
    const expected = {
      ledgerLines: [
        {
          startDate: "2020-08-31T00:00:00.000Z",
          endDate: "2020-09-30T00:00:00.000Z",
          totalRent: 2411.607142857143,
        },
        {
          startDate: "2020-10-01T00:00:00.000Z",
          endDate: "2020-10-31T00:00:00.000Z",
          totalRent: 2411.607142857143,
        },
        {
          startDate: "2020-11-01T00:00:00.000Z",
          endDate: "2020-11-27T00:00:00.000Z",
          totalRent: 2140.714285714286,
        },
      ],
      numberOfLedgerLines: 3,
    };

    const request = {
      ...validRequest,
      start_date: "2020-08-31T00:00:00.000Z",
      end_date: "2020-11-27T00:00:00.000Z",
      frequency: "MONTHLY",
    };

    const actual = await postRequest(convertToQueryString(request));
    expect(expected).toEqual(actual.body);
  });
});
