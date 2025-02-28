import { FC } from "react";
import { Container, Title } from "../../../shared/ui";
import styles from './ResultsPage.module.scss';
import { Link } from "react-router-dom";

export const ResultsPage: FC = () => {
    return (
        <Container>
           <div className={styles.wrapper}>
                <div>
                    <Title
                        tag="h2"
                        size="l"
                        className={styles.title}
                    >
                        Finalize
                    </Title>
                    <p className={styles.text}>
                        Spring promotion
                    </p>
                </div>
                <Link
                    className={styles.link}
                    to={'/'}
                >
                    <img
                        src="/to-back-icon.svg"
                        width={8}
                        height={16}
                        alt="to back"
                    />
                    Back
                </Link>
           </div>
        </Container>
    )
}