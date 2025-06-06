import {useEffect, useState} from 'react';
import {NavLink, Outlet, useLocation, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {fetchCamperById} from '../../store/campersSlice';
import {RootState, AppDispatch} from '../../store/store';
import css from './CamperDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import {Icon} from "../../components/Icon/Icon.tsx";
import {formatPrice} from "../../utils/utils.ts";

interface BookingFormValues {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
}

const CamperDetailsPage = () => {
    const location = useLocation();
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const {currentCamper, isLoading} = useSelector((state: RootState) => state.campers);
    const [featuresActive, setFeaturesActive] = useState<boolean>((location.pathname.includes('features')));

    const [formValues, setFormValues] = useState<BookingFormValues>({
        name: '',
        email: '',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchCamperById(id));
        }
    }, [dispatch, id]);

    const handleFeatureToggle = (isFeatureTab: boolean) => {
        setFeaturesActive(isFeatureTab);
    }

    return (
        <div className={css.detailsPage}>
            {isLoading && <Loader/>}
            {!isLoading && currentCamper && (<>
                <div className={css.camperDetails}>
                    <div className={css.nameContainer}>
                        <h2>{currentCamper.name}</h2>
                        <div className={css.locationContainer}>
                            <div className={css.rating}>
                                <Icon name="star" style={{
                                    width: '16px',
                                    height: '16px',
                                    fill: 'currentColor',
                                    color: 'var(--rating-color)'
                                }}/>
                                <span>{currentCamper.rating}</span>
                                <span className={css.reviews}>({currentCamper.reviews?.length ?? 0} Reviews)</span>
                            </div>
                            <div className={css.location}>
                                <Icon name="map" style={{width: '16px', height: '16px', fill: 'currentColor'}}/>
                                <span>{currentCamper.location}</span>
                            </div>
                        </div>
                        <h2 className={css.price}>€{formatPrice(currentCamper.price)}</h2>
                    </div>

                    <div className={css.imageContainer}>
                        {currentCamper.gallery && currentCamper.gallery.length > 0 && currentCamper.gallery.map((image, iter) => (
                                <img
                                    key={iter}
                                    src={image.thumb}
                                    alt={currentCamper.name}
                                    className={css.image}
                                />))}
                    </div>
                    <p className={css.description}>{currentCamper.description}</p>
                </div>
                <div className={css.moreDetails}>
                    <ul className={css.tabs}>
                        <li className={featuresActive ? css.active : ''} onClick={() => handleFeatureToggle(true)}>
                            <NavLink  to={"features"} state={location}>Features</NavLink >
                        </li>
                        <li className={!featuresActive ? css.active : ''} onClick={() => handleFeatureToggle(false)}>
                            <NavLink  to={"reviews"} state={location}>Reviews</NavLink >
                        </li>
                    </ul>
                    <div className="featuresReviewsContainer">
                        <Outlet />
                    </div>
                    <div className="bookingForm"></div>
                </div>
            </>)}

        </div>
    );
};

export default CamperDetailsPage;
