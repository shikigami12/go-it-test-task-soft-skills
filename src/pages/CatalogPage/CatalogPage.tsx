import {ChangeEvent, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers, setLocationFilter, setFormFilter, toggleFeatureFilter, resetCampers } from '../../store/campersSlice';
import { RootState, AppDispatch } from '../../store/store';
import css from './CatalogPage.module.css';
import CamperCard from '../../components/CamperCard/CamperCard';
import Loader from '../../components/Loader/Loader';

const CatalogPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, filters } = useSelector((state: RootState) => state.campers);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLocationFilter(e.target.value));
  };

  const handleFormChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFormFilter(e.target.value));
  };

  const handleFeatureChange = (feature: string) => {
    dispatch(toggleFeatureFilter(feature));
  };

  const handleApplyFilters = () => {
    dispatch(resetCampers());
    dispatch(fetchCampers());
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    // In a real app with pagination, we would pass the page number to fetchCampers
    // For this mockup, we're just showing the same results
    dispatch(fetchCampers());
  };

  return (
    <div className={css.catalogPage}>
      <div className={css.header}>
        <h1 className={css.title}>Our Campervans</h1>
        <p className={css.description}>Find your perfect travel companion for the road</p>
      </div>

      <div className={css.content}>
        <div className={css.filters}>
          <div className={css.filterSection}>
            <h2 className={css.filterTitle}>Filters</h2>

            <div className={css.filterGroup}>
              <label className={css.filterLabel}>Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className={css.input}
                value={filters.location}
                onChange={handleLocationChange}
              />
            </div>

            <div className={css.filterGroup}>
              <label className={css.filterLabel}>Vehicle Type</label>
              <select
                className={css.select}
                value={filters.form}
                onChange={handleFormChange}
              >
                <option value="">All Types</option>
                <option value="Motorhome">Motorhome</option>
                <option value="Campervan">Campervan</option>
                <option value="Trailer">Trailer</option>
              </select>
            </div>

            <div className={css.filterGroup}>
              <label className={css.filterLabel}>Vehicle Features</label>
              <div className={css.checkboxGroup}>
                <label className={css.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={filters.features.includes('AC')}
                    onChange={() => handleFeatureChange('AC')}
                  />
                  Air Conditioning
                </label>
                <label className={css.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={filters.features.includes('kitchen')}
                    onChange={() => handleFeatureChange('kitchen')}
                  />
                  Kitchen
                </label>
                <label className={css.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={filters.features.includes('bathroom')}
                    onChange={() => handleFeatureChange('bathroom')}
                  />
                  Bathroom
                </label>
                <label className={css.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={filters.features.includes('TV')}
                    onChange={() => handleFeatureChange('TV')}
                  />
                  TV
                </label>
                <label className={css.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={filters.features.includes('refrigerator')}
                    onChange={() => handleFeatureChange('refrigerator')}
                  />
                  Refrigerator
                </label>
              </div>
            </div>

            <button className={css.heroButton} onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>

        <div className={css.mainContent}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={css.campersGrid}>
                {items.length > 0 ? (
                  items.map(camper => (
                    <CamperCard key={camper.id} camper={camper} />
                  ))
                ) : (
                  <p>No campers found matching your criteria.</p>
                )}
              </div>
              {items.length > 0 && (
                <button className={css.loadMoreBtn} onClick={handleLoadMore}>
                  Load more
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
