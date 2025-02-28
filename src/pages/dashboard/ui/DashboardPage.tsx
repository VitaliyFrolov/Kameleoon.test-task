import { FC, useEffect, useState } from "react";
import { Container, Title } from "../../../shared/ui";
import { NothingFound, Table } from "../../../widgets";
import { getTests } from "../../../entities/tests";
import { getSites } from "../../../entities/sites";
import { Tests } from "../../../entities/tests";
import { Sites } from "../../../entities/sites";
import { Search } from "../../../features/search";
import { useFilteredTests } from "../../../features/filter";
import styles from './DashboardPage.module.scss';

export const DashboardPage: FC = () => {
    const [ testsData, setTestsData ] = useState<Tests[]>([]);
    const [ sitesData, setSitesData ] = useState<Sites[]>([]);
    const [ error, setError ] = useState<string | null>(null);

    const { 
        filteredTests, 
        handleSearch, 
        handleSort, 
        query, 
        sortKey, 
        sortOrder 
    } = useFilteredTests(
        testsData, 
        sitesData
    );

    useEffect(() => {
        const fetchTestsAndSites = async () => {
            try {
                const [tests, sites] = await Promise.all([getTests(), getSites()]);
                setTestsData(tests);
                setSitesData(sites);
            } catch (error) {
                setError("Ошибка при получении данных");
                console.error("Ошибка при получении тестов или сайтов:", error);
            }
        };

        fetchTestsAndSites();
    }, []);

    const handleResetSearch = () => {
        handleSearch("");
    };

    return (
        <Container>
            <Title tag="h2" size="l" className={styles.title}>
                Dashboard
            </Title>

            <Search onSearch={handleSearch} records={filteredTests.length} query={query} className={styles.search} />

            {error && <div className="error">{error}</div>}

            {filteredTests.length > 0 ? (
                <Table tests={filteredTests} sites={sitesData} onSort={handleSort} sortKey={sortKey} sortOrder={sortOrder} />
            ) : (
                <NothingFound onReset={handleResetSearch} />
            )}
        </Container>
    );
}
