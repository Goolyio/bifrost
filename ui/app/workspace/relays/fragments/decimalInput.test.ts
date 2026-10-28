import { describe, expect, it } from "vitest";
import { readDecimalText } from "./decimalInput";

describe("readDecimalText", () => {
	it("refuses anything but digits and one decimal point", () => {
		for (const raw of ["e", "1e5", "-1", "+2", "1.2.3", "abc", "0,5"]) expect(readDecimalText(raw), raw).toBeUndefined();
	});

	it("reports a cleared field as null so it reads as unset", () => {
		expect(readDecimalText("")).toEqual({ text: "", value: null });
		expect(readDecimalText(".")).toEqual({ text: ".", value: null });
	});

	it("keeps a half-typed decimal as typed and reports its number", () => {
		expect(readDecimalText("0.")).toEqual({ text: "0.", value: 0 });
		expect(readDecimalText(".5")).toEqual({ text: ".5", value: 0.5 });
		expect(readDecimalText("0.0325")).toEqual({ text: "0.0325", value: 0.0325 });
	});
});