import {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCamperById} from '../../store/campersSlice';
import {AppDispatch, RootState} from '../../store/store';
import css from './CamperDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import {Icon} from "../../components/Icon/Icon.tsx";
import {formatPrice} from "../../utils/utils.ts";
import BookingForm, {BookingFormValues} from "../../components/BookingForm/BookingForm.tsx";
import {toast} from "react-toastify";

const CamperDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const {currentCamper, isLoading} = useSelector((state: RootState) => state.campers);
    const [featuresActive, setFeaturesActive] = useState<boolean>(() => !location.pathname.includes('reviews'));

    useEffect(() => {
        if (id) {
            dispatch(fetchCamperById(id))
                .unwrap()
                .catch(() => navigate('/not-found'));
        }
    }, [dispatch, id, navigate]);

    useEffect(() => {
        if (!featuresActive) {
            navigate('reviews');
            return;
        }

        navigate('features');
    }, [featuresActive, navigate]);

    useEffect(() => {
        if (!currentCamper) {
            return;
        }

        // update the document title with camper name
        document.title = `TravelTrucks - Campervan Rental in Ukraine - ${currentCamper.name} - €${formatPrice(currentCamper.price)}`;
    }, [currentCamper]);

    const handleFeatureToggle = (isFeatureTab: boolean) => {
        setFeaturesActive(isFeatureTab);
    }

    const handleFormSubmit = (values: BookingFormValues) => {
        // show notification from react-toastify the submit logic is not implemented yet
        console.log('Booking form submitted with values:', values);
        toast.info('Booking form submitted! Thank you for the reservation!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

    };

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
                            Features
                        </li>
                        <li className={!featuresActive ? css.active : ''} onClick={() => handleFeatureToggle(false)}>
                            Reviews
                        </li>
                    </ul>
                    <div className={css.detailsContent}>
                        <Outlet/>
                    </div>
                    <div className={css.bookingForm}>
                        <h3 className={css.bookingTitle}>Book your campervan now</h3>
                        <p className={css.bookingSubtitle}>Stay connected! We are always ready to help you.</p>
                        <BookingForm onSubmit={handleFormSubmit}/>
                    </div>
                </div>
            </>)}

        </div>
    );
};

export default CamperDetailsPage;

