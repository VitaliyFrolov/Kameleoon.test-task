import { useState, useMemo, useCallback } from "react";
import { Status, Tests } from "../../../entities/tests";
import { Sites } from "../../../entities/sites";

type SortKey = "name" | "type" | "status" | "site";
type SortOrder = "asc" | "desc";

const statusOrderAsc: Status[] = [Status.ONLINE, Status.PAUSED, Status.STOPPED, Status.DRAFT];
const statusOrderDesc: Status[] = [...statusOrderAsc].reverse();

export const useFilteredTests = (testsData: Tests[], sitesData: Sites[]) => {
    const [ query, setQuery ] = useState("");
    const [ sortKey, setSortKey ] = useState<SortKey | null>(null);
    const [ sortOrder, setSortOrder ] = useState<SortOrder>("asc");

    const handleSearch = useCallback((query: string) => {
        setQuery(query);
    }, []);

    const handleSort = useCallback((key: SortKey) => {
        setSortKey(key);
        setSortOrder((prevOrder) => (sortKey === key && prevOrder === "asc" ? "desc" : "asc"));
    }, [sortKey]);

    const filteredTests = useMemo(() => {
        let result = [...testsData];

        if (query) {
            result = result.filter((test) =>
                test.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        const testsWithSites = result.map((test) => ({
            ...test,
            site: sitesData.find((site) => site.id === test.siteId)?.url || "",
        }));


        if (sortKey) {
            testsWithSites.sort((a, b) => {
                if (sortKey === "status") {
                    return sortOrder === "asc"
                        ? statusOrderAsc.indexOf(a.status) - statusOrderAsc.indexOf(b.status)
                        : statusOrderDesc.indexOf(a.status) - statusOrderDesc.indexOf(b.status);
                } else {
                    const aValue = a[sortKey].toString().toLowerCase();
                    const bValue = b[sortKey].toString().toLowerCase();
                    return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
            });
        }

        return testsWithSites;
    }, [testsData, sitesData, query, sortKey, sortOrder]);

    return { filteredTests, handleSearch, handleSort, query, sortKey, sortOrder };
};
