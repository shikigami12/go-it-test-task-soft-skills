import css from "./FilterItem.module.css";
import {Icon} from "../Icon/Icon.tsx";
import {MouseEvent} from "react";

interface FilterItemProps {
    icon?: string,
    text: string,
    onClick: (event: MouseEvent<HTMLButtonElement>, value: string) => void,
    value: string,
    active: boolean
}

export const FilterItem = ({icon, text, onClick, value, active = false}: FilterItemProps) => {
    // Inline styles for the icon
    const iconStyle = {
        width: "32px",
        height: "32px",
        fill: "none",
        stroke: "none",
    };

    return (
        <>
            <button className={active ? css.filterItemActive : css.filterItem}
                    onClick={(event) => onClick(event, value)}>
                {icon && <Icon name={icon} style={iconStyle}/>}
                <span className={css.filterText}>{text}</span>
            </button>
        </>
    );
};