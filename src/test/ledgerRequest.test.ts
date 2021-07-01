import app from "../app/app";
import request from "supertest";

interface IndexType {
  [key: string]: string;
}

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
    field            | value        | expectedMessage
    ${"start_date"}  | ${undefined} | ${"start_date cannot be undefined"}
    ${"end_date"}    | ${undefined} | ${"end_date cannot be undefined"}
    ${"frequency"}   | ${undefined} | ${"frequency cannot be undefined"}
    ${"weekly_rent"} | ${undefined} | ${"weekly_rent cannot be undefined"}
    ${"timezone"}    | ${undefined} | ${"timezone cannot be undefined"}
  `(
    "returns $expectedMessage when $field is $value",
    async ({ field, value, expectedMessage }) => {
      const request = { ...validRequest };
      if (value === undefined) {
        delete request[field];
      }
      const response = await postRequest(convertToQueryString(request));
      expect(response.status).toBe(400);
      expect(response.body.validationErrors[field]).toBe(expectedMessage);
    }
  );
});
