"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app/app"));
const models_1 = require("../app/models");
const validRequest = {
    start_date: "2020-03-24T00:00:00.000Z",
    end_date: "2020-06-03T00:00:00.000Z",
    frequency: "WEEKLY",
    weekly_rent: "555",
    timezone: "Europe/London",
};
const postRequest = (queryString) => __awaiter(void 0, void 0, void 0, function* () {
    return supertest_1.default(app_1.default).get(`/api/v1/ledger?${queryString}`);
});
const convertToQueryString = (body) => {
    const queryItems = Object.keys(body).map((key) => `${key}=${body[key]}`);
    return queryItems.join("&");
};
describe("ledger request integration tests", () => {
    test.each `
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
    ${"frequency"}   | ${"test-frequency"} | ${"frequency should be one of WEEKLY, FORTNIGHTLY or MONTHLY"}
    ${"weekly_rent"} | ${"test-rent"}      | ${"weekly_rent should be a numeric value"}
    ${"timezone"}    | ${"America/"}       | ${"timezone should be valid timezone name"}
  `("returns $expectedMessage when $field is $value", ({ field, value, expectedMessage }) => __awaiter(void 0, void 0, void 0, function* () {
        const request = Object.assign({}, validRequest);
        if (value === undefined) {
            delete request[field];
        }
        else {
            request[field] = value;
        }
        const response = yield postRequest(convertToQueryString(request));
        expect(response.status).toBe(400);
        expect(response.body.validationErrors[field]).toBe(expectedMessage);
    }));
    test("returns multiple validation errors correctly", () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = {
            validationErrors: {
                end_date: "end_date cannot be undefined",
                frequency: "frequency should be one of WEEKLY, FORTNIGHTLY or MONTHLY",
                weekly_rent: "weekly_rent should be a numeric value",
            },
        };
        const request = Object.assign({}, validRequest);
        delete request["end_date"];
        request["frequency"] = "Weekly";
        request["weekly_rent"] = "12TW";
        const response = yield postRequest(convertToQueryString(request));
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expected);
    }));
    test("returns 200 status code when a valid request is used", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield postRequest(convertToQueryString(validRequest));
        expect(response.statusCode).toBe(200);
    }));
    test("returns 200 status code when frequency is of desired value", () => {
        Object.keys(models_1.Frequency).forEach((key) => __awaiter(void 0, void 0, void 0, function* () {
            const request = Object.assign({}, validRequest);
            request["frequency"] = key;
            const response = yield postRequest(convertToQueryString(request));
            expect(response.statusCode).toBe(200);
        }));
    });
    test("returns correct response for a valid WEEKLY request", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const request = Object.assign(Object.assign({}, validRequest), { end_date: "2020-04-03T00:00:00.000Z", frequency: "WEEKLY" });
        const actual = yield postRequest(convertToQueryString(request));
        expect(expected).toEqual(actual.body);
    }));
    test("returns correct response for a valid FORTNIGHTLY request", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const request = Object.assign(Object.assign({}, validRequest), { start_date: "2020-03-28T00:00:00.000Z", end_date: "2020-05-03T00:00:00.000Z", frequency: "FORTNIGHTLY" });
        const actual = yield postRequest(convertToQueryString(request));
        expect(expected).toEqual(actual.body);
    }));
    test("returns correct response for a valid MONTHLY request", () => __awaiter(void 0, void 0, void 0, function* () {
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
        const request = Object.assign(Object.assign({}, validRequest), { start_date: "2020-08-31T00:00:00.000Z", end_date: "2020-11-27T00:00:00.000Z", frequency: "MONTHLY" });
        const actual = yield postRequest(convertToQueryString(request));
        expect(expected).toEqual(actual.body);
    }));
});
//# sourceMappingURL=ledgerRequest.test.js.map