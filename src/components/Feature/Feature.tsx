import css from './Feature.module.css';
import {Icon} from "../Icon/Icon.tsx";
import {FeatureItem} from "../../models/CamperFeatures.ts";

interface CategoryProps {
    feature: FeatureItem,
    backgroundColor?: string,
}

export const Feature = ({feature, backgroundColor}: CategoryProps) => {
    const style = {
        width: '20px',
        height: '20px',
        marginRight: '8px',
        fill: 'none',
    };

    return (
        <>
            <div className={css.category} style={{background: backgroundColor || 'inherit'}}>
                <Icon name={feature.icon.toLowerCase()} style={style}/>
                <span className={css.categoryName}>{feature.name}</span>
            </div>
        </>
    );
};