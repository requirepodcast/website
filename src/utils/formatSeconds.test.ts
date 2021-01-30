import { formatSeconds } from "./formatSeconds"

describe("formatSeconds", () => {
  it("formats less than an hour properly", () => {
    // less than 10 seconds
    expect(formatSeconds(5)).toBe("00:05")

    // more than 10 seconds
    expect(formatSeconds(47)).toBe("00:47")

    // round minutes
    expect(formatSeconds(60)).toBe("01:00")

    // less than ten minutes
    expect(formatSeconds(60 * 4 + 20)).toBe("04:20")

    // more than ten minutes
    expect(formatSeconds(60 * 13 + 37)).toBe("13:37")
  })

  it("formats more than an hour properly", () => {
    // round hours
    expect(formatSeconds(60 * 60)).toBe("1:00:00")

    // more than an hour (with seconds)
    expect(formatSeconds(60 * 60 + 4)).toBe("1:00:04")

    // more than an hour (with minutes)
    expect(formatSeconds(60 * 60 * 2 + 60 * 21 + 37)).toBe("2:21:37")
  })
})
