import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { useFilteredTests } from "../model";
import { Status, Tests, Type } from "../../../entities/tests";
import { Sites } from "../../../entities/sites";

interface FilteredTest {
    site: string;
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
}

const mockTests: Tests[] = [
    { id: 1, name: "Test A", type: Type.CLASSIC, status: Status.ONLINE, siteId: 1 },
    { id: 2, name: "Test B", type: Type.MVT, status: Status.PAUSED, siteId: 2 },
    { id: 3, name: "Test C", type: Type.SERVER_SIDE, status: Status.STOPPED, siteId: 1 },
    { id: 4, name: "Test D", type: Type.CLASSIC, status: Status.DRAFT, siteId: 3 },
];

const mockSites: Sites[] = [
    { id: 1, url: "https://site1.com" },
    { id: 2, url: "https://site2.com" },
    { id: 3, url: "https://site3.com" },
];

describe("useFilteredTests", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any;

    beforeEach(() => {
        result = renderHook(() => useFilteredTests(mockTests, mockSites)).result;
    });

    it("returns all tests by default without filtering", () => {
        expect(result.current.filteredTests).toHaveLength(mockTests.length);
    });

    it("sorts tests by status (ascending)", () => {
        act(() => {
            result.current.handleSort("status");
        });

        expect(result.current.filteredTests.map((t: FilteredTest) => t.status)).toEqual([
            Status.ONLINE,
            Status.PAUSED,
            Status.STOPPED,
            Status.DRAFT,
        ]);
    });

    it("sorts tests by site (ascending)", () => {
        act(() => {
            result.current.handleSort("site");
        });

        expect(result.current.filteredTests[0].site).toBe("https://site1.com");
    });
});
