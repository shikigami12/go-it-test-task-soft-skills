import css from './Category.module.css';
import {Icon} from "../Icon/Icon.tsx";
import {useEffect, useState} from "react";

interface CategoryProps {
    icon: string;
}

export const Category = ({icon} : CategoryProps) => {
    const style = {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        fill: 'none',
    };
    const [iconName, setIconName] = useState<string>(icon);

    useEffect(() => {
        let iconNameCapitalized;
        if (icon?.length) {
            iconNameCapitalized = icon.charAt(0).toUpperCase() + icon.slice(1);
        }

        setIconName(iconNameCapitalized || '');
    }, [icon]);

    return (
        <>
            <div className={css.category}>
                <Icon name={icon.toLowerCase()} style={style}/>
                <span className={css.categoryName}>{iconName}</span>
            </div>
        </>
    );
};