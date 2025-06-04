import { NavLink } from 'react-router-dom';
import css from './Header.module.css';
import {Logo} from "../Logo/Logo.tsx";

const Header = () => {
  return (
    <header className={css.header}>
      <Logo />
      <nav className={css.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${css.navLink} ${css.active}` : css.navLink
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
