import css from './Feature.module.css';
import {Icon} from "../Icon/Icon.tsx";
import {FeatureItem} from "../../models/CamperFeatures.ts";

interface CategoryProps {
    feature: FeatureItem
}

export const Feature = ({feature}: CategoryProps) => {
    const style = {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        fill: 'none',
    };

    return (
        <>
            <div className={css.category}>
                <Icon name={feature.icon.toLowerCase()} style={style}/>
                <span className={css.categoryName}>{feature.name}</span>
            </div>
        </>
    );
};