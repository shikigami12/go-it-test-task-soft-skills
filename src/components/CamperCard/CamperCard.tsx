import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { MapPin, Users } from 'lucide-react';
import { addToFavorites, removeFromFavorites } from '../../store/favoritesSlice';
import { RootState } from '../../store/store';
import styles from './CamperCard.module.css';
import {Camper} from "../../models/Camper.ts";

interface CamperCardProps {
  camper: Camper;
}

const CamperCard = ({ camper }: CamperCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === camper.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFromFavorites(camper.id));
    } else {
      dispatch(addToFavorites(camper));
    }
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ',00';
  };

  const handleShowMore = () => {
    // Open in a new tab
    window.open(`/catalog/${camper.id}`, '_blank');
  };

  return (
    <div className={styles.camperCard}>
      <div className={styles.imageContainer}>
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={styles.image}
        />
        <button
          className={styles.favoriteBtn}
          onClick={handleFavoriteToggle}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={24}
            fill={isFavorite ? '#E44848' : 'transparent'}
            stroke={isFavorite ? '#E44848' : '#101828'}
          />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.info}>
            <h2 className={styles.title}>{camper.name}</h2>
            <div className={styles.location}>
              <MapPin size={16} />
              <span>{camper.location}</span>
            </div>
          </div>
          <div className={styles.price}>
            €{formatPrice(camper.price)}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <Users className={styles.icon} />
            <span className={styles.label}>{camper.adults + camper.children} people</span>
          </div>
          {camper.form && (
            <div className={styles.detail}>
              <span className={styles.label}>{camper.form}</span>
            </div>
          )}
          {camper.transmission && (
            <div className={styles.detail}>
              <span className={styles.label}>{camper.transmission}</span>
            </div>
          )}
        </div>

        <button className={styles.button} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
