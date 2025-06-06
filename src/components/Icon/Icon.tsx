import icons from '../../assets/icons/icons.svg';
import {CSSProperties} from "react";

interface IconProps {
    name: string,
    style: CSSProperties
}

export const Icon = ({name, style}: IconProps) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" style={style}>
                <use href={`${icons}#${name}`}/>
            </svg>
        </>
    );
};