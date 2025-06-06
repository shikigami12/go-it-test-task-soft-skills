import css from './CamperReviewsDetails.module.css';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import {Icon} from "../Icon/Icon.tsx";

export const CamperReviewsDetails = () => {
    const {currentCamper} = useSelector((state: RootState) => state.campers);

    const grayStarStyle = {
        width: '16px',
        height: '16px',
        fill: 'currentColor',
        color: 'var(--gray-light-color)',
    }

    const yellowStarStyle = {
        ...grayStarStyle,
        color: 'var(--rating-color)',
    };

    return (
        <>
            <div className={css.reviewsDetail}>
                {currentCamper?.reviews?.length ? (
                    <ul className={css.reviewsList}>
                        {currentCamper.reviews.map((review, index) => (
                            <li key={index} className={css.reviewItem}>
                                <div className={css.reviewHeader}>
                                    <span className={css.userAvatar}>{review.reviewer_name.slice(0, 1)}</span>
                                    <div className={css.reviewInfo}>
                                        <span className={css.reviewerName}>{review.reviewer_name}</span>
                                        <span className={css.reviewRating}>
                                        {Array.from({length: 5}, (_, i) =>
                                            review.reviewer_rating > i ?
                                                <Icon key={i} name={'star'} style={yellowStarStyle}/> :
                                                <Icon key={i} name={'star'} style={grayStarStyle}/>
                                        )}
                                    </span>
                                    </div>
                                </div>
                                <p className={css.reviewText}>{review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews available for this camper.</p>
                )}
            </div>
        </>
    );
};