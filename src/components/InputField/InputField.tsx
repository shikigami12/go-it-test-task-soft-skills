import css from "./InputField.module.css";
import {ChangeEvent} from "react";
import {Icon} from "../Icon/Icon.tsx";

interface InputFieldProps {
    icon?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    palaceHolder?: string;
}

export const InputField = ({icon, value, onChange, palaceHolder = "Enter location"}: InputFieldProps) => {
    // Inline styles for the icon
    const iconStyle = {
        width: "20px",
        height: "20px",
        marginRight: '8px',
        verticalAlign: 'middle',
        color: value ? 'var(--main-color)' : 'var(--text-color)',
    };
    return (
        <>
            <label className={css.inputLabel}>
                {icon && <Icon name={icon} style={iconStyle}/>}
                <input
                    type="text"
                    placeholder={palaceHolder}
                    className={css.input}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </>
    );
};