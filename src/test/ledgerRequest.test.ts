import request from "supertest";
import app from "../app/app";
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
    field            | value           | expectedMessage
    ${"start_date"}  | ${undefined}    | ${"start_date cannot be undefined"}
    ${"end_date"}    | ${undefined}    | ${"end_date cannot be undefined"}
    ${"frequency"}   | ${undefined}    | ${"frequency cannot be undefined"}
    ${"weekly_rent"} | ${undefined}    | ${"weekly_rent cannot be undefined"}
    ${"timezone"}    | ${undefined}    | ${"timezone cannot be undefined"}
    ${"start_date"}  | ${"test-date"}  | ${"start_date is not a valid ISO date"}
    ${"start_date"}  | ${"2020-13-05"} | ${"start_date is not a valid ISO date"}
    ${"end_date"}    | ${"test-date"}  | ${"end_date is not a valid ISO date"}
    ${"end_date"}    | ${"2020-11-35"} | ${"end_date is not a valid ISO date"}
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
});
