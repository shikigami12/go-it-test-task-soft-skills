import {Link} from 'react-router-dom';
import styles from './HomePage.module.css';
import heroImage from '../../assets/img/hero.jpg';
import heroImage2x from '../../assets/img/2xhero.jpg';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <section className={styles.heroSection}>
                <img
                    src={heroImage}
                    srcSet={`${heroImage} 1x, ${heroImage2x} 2x`}
                    alt="TravelTrucks Hero"
                    className={styles.heroImage}
                />
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Campers of your dreams
                    </h1>
                    <p className={styles.heroText}>
                        You can find everything you want in our catalog
                    </p>
                    <Link to="/catalog" className={styles.heroButton}>
                        View Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
