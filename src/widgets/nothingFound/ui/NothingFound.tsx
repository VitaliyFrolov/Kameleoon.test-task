import { FC } from "react";
import styles from './NothingFound.module.scss'
import { Title } from "../../../shared/ui";

interface NothingFoundProps {
    onReset: () => void;
}

export const NothingFound: FC<NothingFoundProps> = ({ onReset }) => {
    return (
        <div className={styles.wrapper}>
            <Title tag="h2" size="m">
                Your search did not match any results.
            </Title>
            <button className={styles.button} onClick={onReset}>
                Reset
            </button>
        </div>
    );
}