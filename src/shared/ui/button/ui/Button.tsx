import { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

// eslint-disable-next-line react-refresh/only-export-components
export enum ButtonTheme {
    Filled = 'filled',
    Outlined = 'outlined',
    Default = Filled
}

interface ButtonProps {
    className?: string;
    onClick?: () => void;
    children?: string;
    iconPosition?: 'left' | 'right';
    theme?: ButtonTheme;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        onClick,
        theme = ButtonTheme.Filled
    } = props;

    return (
       <button className={cn([styles.button, className, styles[`theme-${theme}`]])} onClick={onClick}>
            <span className={styles.caption}>
                {children}
            </span>
       </button>
    );
};