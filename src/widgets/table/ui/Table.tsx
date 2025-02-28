import React from "react";
import classNames from "classnames";
import styles from "./Table.module.scss";
import { Link } from "react-router-dom";
import { Tests } from "../../../entities/tests";
import { Sites } from "../../../entities/sites";
import { urlFormatter } from "../../../shared/utils";

interface TableProps {
    sites: Sites[];
    tests: Tests[];
    onSort: (key: "name" | "type" | "status" | "site") => void;
    sortKey: string | null;
    sortOrder: "asc" | "desc";
}

export const Table: React.FC<TableProps> = ({ sites, tests, onSort, sortKey, sortOrder }) => {
    const getStatusClass = (status: Tests["status"]) => {
        return classNames(styles.status, {
            [styles.table__status_online]: status === "ONLINE",
            [styles.table__status_paused]: status === "PAUSED",
            [styles.table__status_stopped]: status === "STOPPED",
            [styles.table__status_draft]: status === "DRAFT",
        });
    };

    const getRowClass = (status: Tests["status"]) => {
        return classNames({
            [styles.table__row_online]: status === "ONLINE",
            [styles.table__row_paused]: status === "PAUSED",
            [styles.table__row_stopped]: status === "STOPPED",
            [styles.table__row_draft]: status === "DRAFT",
        });
    };

    const renderSortIndicator = (key: string) => {
        if (sortKey !== key) return null;

        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="4"
                viewBox="0 0 7 4"
                fill="none"
                className={classNames(styles.sortIcon, { [styles.sortIcon_desc]: sortOrder === "desc" })}
            >
                <path
                    d="M0 3.50001L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.50001L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.50001Z"
                    fill="#999999"
                />
            </svg>
        );
    };

    return (
        <div className={styles.table}>
            <div className={styles.table__header}>
                <div className={styles.table__title} onClick={() => onSort("name")}>
                    Name {renderSortIndicator("name")}
                </div>
                <div className={styles.table__title} onClick={() => onSort("type")}>
                    Type {renderSortIndicator("type")}
                </div>
                <div className={styles.table__title} onClick={() => onSort("status")}>
                    Status {renderSortIndicator("status")}
                </div>
                <div className={styles.table__title} onClick={() => onSort("site")}>
                    Site {renderSortIndicator("site")}
                </div>
                <div className={styles.table__title}>{""}</div>
            </div>
            <div className={styles.table__body}>
                {tests.map((test, index) => {
                    const site = sites.find((s) => s.id === test.siteId);

                    return (
                        <Link
                            to={test.status === "ONLINE" ? `/results/${test.id}` : `/finalize/${test.id}`}
                            className={classNames(styles.table__row, getRowClass(test.status))}
                            key={test.id}
                            tabIndex={index + 1} // Добавляем уникальный tabIndex
                        >
                            <div className={styles.table__name}>{test.name}</div>
                            <div className={styles.table__type}>{test.type}</div>
                            <div className={styles.table__status}>
                                <span className={getStatusClass(test.status)}>{test.status}</span>
                            </div>
                            <div>
                                <p className={styles.table__site}>
                                    {urlFormatter(site?.url)}
                                </p>
                            </div>
                            <div className={styles.table__buttonWrapper}>
                                <button
                                    className={classNames(styles.table__button, {
                                        [styles.table__button_green]: test.status === "ONLINE",
                                        [styles.table__button_gray]: test.status !== "ONLINE",
                                    })}
                                >
                                    {test.status === "ONLINE" ? "Results" : "Finalize"}
                                </button>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};
