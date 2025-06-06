import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <h2 className={css.subtitle}>Page Not Found</h2>
      <p className={css.text}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className={css.link}>
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
