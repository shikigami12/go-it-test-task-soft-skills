import {useDispatch, useSelector} from 'react-redux';
import {addToFavorites, removeFromFavorites} from '../../store/favoritesSlice';
import {RootState} from '../../store/store';
import css from './CamperCard.module.css';
import {Camper} from "../../models/Camper.ts";
import {Link} from "react-router-dom";
import {Icon} from "../Icon/Icon.tsx";
import {Category} from "../Category/Category.tsx";
import {MouseEvent, useEffect, useState} from "react";

interface CamperCardProps {
    camper: Camper;
}

const CamperCard = ({camper}: CamperCardProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.items);
    const isFavorite = favorites.some(item => item.id === camper.id);
    const [camperFeaturesState, setCamperFeaturesState] = useState<string[]>([]);

    useEffect(() => {
        if (!camper) {
            return;
        }

        const camperFeatures: string[] = [];

        for (const key in camper) {
            if (Object.prototype.hasOwnProperty.call(camper, key) && Boolean(camper[key as keyof Camper])) {
                switch (key) {
                    case 'AC':
                    case 'bathroom':
                    case 'kitchen':
                    case 'TV':
                    case 'radio':
                    case 'refrigerator':
                    case 'microwave':
                    case 'gas':
                    case 'water':
                        camperFeatures.push(key);
                        break;
                    default:
                        // Skip other properties that are not features
                        break;
                }
            }
        }

        setCamperFeaturesState(camperFeatures);
    }, [camper]);

    const handleFavoriteToggle = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
            dispatch(removeFromFavorites(camper.id));
        } else {
            dispatch(addToFavorites(camper));
        }
    };

    const formatPrice = (price: number) => {
        return price.toString() + '.00';
    };

    return (
        <div className={css.camperCard}>
            <div className={css.imageContainer}>
                <img
                    src={camper.gallery[0].thumb}
                    alt={camper.name}
                    className={css.image}
                />
            </div>

            <div className={css.content}>
                <div className={css.header}>
                    <div className={css.info}>
                        <h2 className={css.title}>{camper.name}</h2>
                    </div>
                    <div className={css.price}>
                        <span>€{formatPrice(camper.price)}</span>
                        <button
                            className={isFavorite ? css.favoriteBtnActive : css.favoriteBtn}
                            onClick={handleFavoriteToggle}
                            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Icon name={'heart'} style={{width: '26px', height: '24px', fill: 'currentColor'}}/>
                        </button>
                    </div>
                    <div className={css.locationContainer}>
                        <div className={css.rating}>
                            <Icon name="star" style={{
                                width: '16px',
                                height: '16px',
                                fill: 'currentColor',
                                color: 'var(--rating-color)'
                            }}/>
                            <span>{camper.rating}</span>
                            <span className={css.reviews}>({camper.reviews?.length ?? 0} Reviews)</span>
                        </div>
                        <div className={css.location}>
                            <Icon name="map" style={{width: '16px', height: '16px', fill: 'currentColor'}}/>
                            <span>{camper.location}</span>
                        </div>
                    </div>
                </div>

                <span className={css.description}>
          {camper.description}
        </span>

                <div className={css.details}>
                    {camperFeaturesState?.length && camperFeaturesState.map((feature, index) => (
                        <Category key={index} icon={feature}/>
                    ))}
                </div>

                <Link className={css.button} to={{pathname: `/catalog/${camper.id}`}}>
                    Show more
                </Link>
            </div>
        </div>
    );
};

export default CamperCard;
