import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store/store';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CamperDetailsPage from './pages/CamperDetailsPage/CamperDetailsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import './App.css';
import {CamperFeaturesDetails} from "./components/CamperFeaturesDetails/CamperFeaturesDetails.tsx";
import {CamperReviewsDetails} from "./components/CamperReviewsDetails/CamperReviewsDetails.tsx";

function App() {
  return (
    <Provider store={store}>
        <div className="app">
          <Header />
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:id" element={<CamperDetailsPage />} >
                <Route path="features" element={<CamperFeaturesDetails />} />
                <Route path="reviews" element={<CamperReviewsDetails />} />
            </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Provider>
  );
}

export default App;
