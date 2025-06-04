import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  MapPin,
  CheckCircle,
  XCircle,
  Star,
  UserCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import { fetchCamperById } from '../../store/campersSlice';
import { RootState, AppDispatch } from '../../store/store';
import styles from './CamperDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';

interface BookingFormValues {
  name: string;
  email: string;
  startDate: string;
  endDate: string;
}

const CamperDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { currentCamper, isLoading } = useSelector((state: RootState) => state.campers);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    const isFormValid = Object.values(formValues).every(value => value.trim() !== '');

    if (!isFormValid) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real application, this would send the booking data to an API
    toast.success('Your booking has been successfully submitted!');

    // Reset form
    setFormValues({
      name: '',
      email: '',
      startDate: '',
      endDate: '',
    });
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ',00';
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!currentCamper) {
    return <div className={styles.detailsPage}>Camper not found</div>;
  }

  const {
    name,
    location,
    price,
    description,
    gallery,
    adults,
    children,
    transmission,
    engine,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water
  } = currentCamper;

  // Mock reviews data (in a real app, this would come from the API)
  const reviews = [
    {
      id: '1',
      author: 'John Doe',
      rating: 5,
      text: 'Amazing camper! Very clean and comfortable. The owner was very helpful and responsive.'
    },
    {
      id: '2',
      author: 'Jane Smith',
      rating: 4,
      text: 'Great experience! The camper was well maintained and had all the amenities we needed.'
    }
  ];

  return (
    <div className={styles.detailsPage}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{name}</h1>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
        <div className={styles.price}>€{formatPrice(price)}</div>
      </div>

      <div className={styles.gallery}>
        <img
          src={gallery[0]}
          alt={`${name} - Main`}
          className={styles.mainImage}
        />
        {gallery.slice(1, 5).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${name} - ${index + 1}`}
            className={styles.smallImage}
          />
        ))}
      </div>

      <div className={styles.content}>
        <div>
          <p className={styles.description}>{description}</p>

          <div className={styles.features}>
            <h2 className={styles.featureHeading}>Features & Amenities</h2>

            <div className={styles.featuresList}>
              <div className={AC ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {AC ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Air Conditioning</span>
              </div>
              <div className={kitchen ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {kitchen ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Kitchen</span>
              </div>
              <div className={bathroom ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {bathroom ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Bathroom</span>
              </div>
              <div className={TV ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {TV ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>TV</span>
              </div>
              <div className={radio ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {radio ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Radio</span>
              </div>
              <div className={refrigerator ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {refrigerator ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Refrigerator</span>
              </div>
              <div className={microwave ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {microwave ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Microwave</span>
              </div>
              <div className={gas ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {gas ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Gas</span>
              </div>
              <div className={water ? styles.feature : `${styles.feature} ${styles.inactive}`}>
                {water ? <CheckCircle className={styles.featureIcon} size={20} /> : <XCircle className={styles.featureIcon} size={20} />}
                <span>Water</span>
              </div>
            </div>

            <h2 className={styles.featureHeading}>Vehicle Details</h2>

            <div className={styles.detailsList}>
              {form && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Form</span>
                  <span className={styles.detailValue}>{form}</span>
                </div>
              )}
              {length && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Length</span>
                  <span className={styles.detailValue}>{length} m</span>
                </div>
              )}
              {width && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Width</span>
                  <span className={styles.detailValue}>{width} m</span>
                </div>
              )}
              {height && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Height</span>
                  <span className={styles.detailValue}>{height} m</span>
                </div>
              )}
              {tank && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Tank</span>
                  <span className={styles.detailValue}>{tank} L</span>
                </div>
              )}
              {consumption && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Consumption</span>
                  <span className={styles.detailValue}>{consumption} L/100km</span>
                </div>
              )}
              {transmission && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Transmission</span>
                  <span className={styles.detailValue}>{transmission}</span>
                </div>
              )}
              {engine && (
                <div className={styles.detail}>
                  <span className={styles.detailLabel}>Engine</span>
                  <span className={styles.detailValue}>{engine}</span>
                </div>
              )}
              <div className={styles.detail}>
                <span className={styles.detailLabel}>Capacity</span>
                <span className={styles.detailValue}>{adults} adults, {children} children</span>
              </div>
            </div>

            <div className={styles.reviews}>
              <h2 className={styles.reviewsTitle}>Reviews</h2>

              <div className={styles.reviewsList}>
                {reviews.map(review => (
                  <div key={review.id} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.reviewer}>
                        <UserCircle size={40} />
                        <span className={styles.reviewerName}>{review.author}</span>
                      </div>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < review.rating ? '#E44848' : 'transparent'}
                            stroke={i < review.rating ? '#E44848' : '#DADDE1'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className={styles.reviewText}>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className={styles.bookingForm} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Book your campervan now</h2>

            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.formInput}
                placeholder="Enter your full name"
                value={formValues.name}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.formInput}
                placeholder="Enter your email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="startDate" className={styles.formLabel}>Pick-up Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className={styles.formInput}
                value={formValues.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="endDate" className={styles.formLabel}>Drop-off Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className={styles.formInput}
                value={formValues.endDate}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
