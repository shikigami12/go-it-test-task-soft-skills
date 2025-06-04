import css from './Logo.module.css';
import {Link} from "react-router-dom";
import logo from '../../assets/Logo.svg';

export const Logo = () => {
    return (
        <>
            <Link to="/" className={css.logo}>
                <img src={logo} alt="TravelTrucks" />
            </Link>
        </>
    );
};