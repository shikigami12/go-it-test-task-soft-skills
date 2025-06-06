import css from './CamperFeaturesDetail.module.css';
import {Feature} from "../Feature/Feature.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const CamperFeaturesDetails = () => {
    const {currentCamper} = useSelector((state: RootState) => state.campers);


    return (
        <>
            <div className={css.featuresDetail}>
                <div className={css.featuresList}>
                    {currentCamper?.features?.features?.length && currentCamper.features.features.map((feature, index) => (
                        <Feature key={index} feature={feature}/>
                    ))}
                </div>

                <div className={css.details}>
                    <h3 className={css.detailsTitle}>Vehicle details</h3>
                    <hr/>
                    <ul className={css.detailsList}>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Form</span>
                            <span className={css.detailValue}>4</span>
                        </li>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Length</span>
                            <span className={css.detailValue}>2</span>
                        </li>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Width</span>
                            <span className={css.detailValue}>Yes</span>
                        </li>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Height</span>
                            <span className={css.detailValue}>No</span>
                        </li>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Tank</span>
                            <span className={css.detailValue}>No</span>
                        </li>
                        <li className={css.detailItem}>
                            <span className={css.detailLabel}>Consumption</span>
                            <span className={css.detailValue}>No</span>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};