import { FC, useState, useEffect } from "react";
import styles from "./Search.module.scss";
import cn from "classnames";

interface SearchProps {
    className?: string;
    onSearch: (query: string) => void;
    records: number;
    query: string;
}

export const Search: FC<SearchProps> = ({ className, onSearch, records, query }) => {
    const [ inputValue, setInputValue ] = useState(query);

    useEffect(() => {
        setInputValue(query);
    }, [query]);

    useEffect(() => {
        const delay = setTimeout(() => {
            onSearch(inputValue);
        }, 500);

        return () => {
            clearTimeout(delay);
        };
    },  [inputValue, onSearch]);

    return (
        <div className={cn(styles.search, className)}>
            <img
                src="/search-icon.svg"
                width={13}
                height={14}
                alt="search icon"
            />
            <input
                className={styles.input}
                placeholder="What test are you looking for?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <div className={styles.records}>
                {`${records} tests`}
            </div>
        </div>
    );
}
