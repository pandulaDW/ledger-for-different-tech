import { createDateSeq } from "../../app/utils/ledgerUtils";

describe("ledger utility unit tests", () => {
  const dateSeqListFortnightly = () => [
    {
      startDate: "2020-03-28T00:00:00.000Z",
      endDate: "2020-04-10T00:00:00.000Z",
      dateDiff: 14,
      isFullRange: true,
    },
    {
      startDate: "2020-04-11T00:00:00.000Z",
      endDate: "2020-04-24T00:00:00.000Z",
      dateDiff: 14,
      isFullRange: true,
    },
    {
      startDate: "2020-04-25T00:00:00.000Z",
      endDate: "2020-05-03T00:00:00.000Z",
      dateDiff: 9,
      isFullRange: true,
    },
  ];

  test("returns a correctly generated FORTNIGHTLY SeqItem list for two given dates", () => {
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-05-03"), 14)).toEqual(
      dateSeqListFortnightly()
    );
  });

  test("returns a correctly generated FORTNIGHTLY SeqItem list when end day is a payment day", () => {
    const seqList = dateSeqListFortnightly();
    seqList.pop();
    seqList.push({
      startDate: "2020-04-25T00:00:00.000Z",
      endDate: "2020-05-08T00:00:00.000Z",
      dateDiff: 14,
      isFullRange: true,
    });
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-05-08"), 14)).toEqual(
      seqList
    );
  });

  test("returns a correctly generated FORTNIGHTLY SeqItem list when end day is before the first payment day", () => {
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-04-05"), 14)).toEqual([
      {
        startDate: "2020-03-28T00:00:00.000Z",
        endDate: "2020-04-05T00:00:00.000Z",
        dateDiff: 9,
        isFullRange: true,
      },
    ]);
  });

  const dateSeqListWeekly = () => [
    {
      startDate: "2020-03-28T00:00:00.000Z",
      endDate: "2020-04-03T00:00:00.000Z",
      dateDiff: 7,
      isFullRange: true,
    },
    {
      startDate: "2020-04-04T00:00:00.000Z",
      endDate: "2020-04-10T00:00:00.000Z",
      dateDiff: 7,
      isFullRange: true,
    },
    {
      startDate: "2020-04-11T00:00:00.000Z",
      endDate: "2020-04-15T00:00:00.000Z",
      dateDiff: 5,
      isFullRange: true,
    },
  ];

  test("returns a correctly generated WEEKLY SeqItem list for two given dates", () => {
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-04-15"), 7)).toEqual(
      dateSeqListWeekly()
    );
  });

  test("returns a correctly generated WEEKLY SeqItem list when end day is a payment day", () => {
    const seqList = dateSeqListWeekly();
    seqList.pop();
    seqList.push({
      startDate: "2020-04-11T00:00:00.000Z",
      endDate: "2020-04-17T00:00:00.000Z",
      dateDiff: 7,
      isFullRange: true,
    });
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-04-17"), 7)).toEqual(
      seqList
    );
  });

  test("returns a correctly generated WEEKLY SeqItem list when end day is before the first payment day", () => {
    expect(createDateSeq(new Date("2020-03-28"), new Date("2020-04-01"), 7)).toEqual([
      {
        startDate: "2020-03-28T00:00:00.000Z",
        endDate: "2020-04-01T00:00:00.000Z",
        dateDiff: 5,
        isFullRange: true,
      },
    ]);
  });
});
