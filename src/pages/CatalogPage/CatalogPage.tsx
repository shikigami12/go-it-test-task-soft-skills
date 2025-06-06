import {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    fetchCampers,
    setLocationFilter,
    setFormFilter,
    toggleFeatureFilter,
    resetCampers,
    setPage
} from '../../store/campersSlice';
import {RootState, AppDispatch} from '../../store/store';
import css from './CatalogPage.module.css';
import CamperCard from '../../components/CamperCard/CamperCard';
import Loader from '../../components/Loader/Loader';
import {InputField} from "../../components/InputField/InputField.tsx";
import {FilterItem} from "../../components/FilterItem/FilterItem.tsx";
import {FeatureItem} from "../../models/CamperFeatures.ts";

const CatalogPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items, isLoading, filters} = useSelector((state: RootState) => state.campers);
    const [page, setCatalogPage] = useState(1);
    const [camperFormFilter, setCamperFormFilter] = useState<FeatureItem[]>(() => {
        const initialFilter: FeatureItem[] = [
            {name: 'Alcove', active: false, icon: 'alcove', value: 'alcove'},
            {name: 'Van', active: false, icon: 'van', value: 'panelTruck'},
            {name: 'Fully Integrated', active: false, icon: 'integrated', value: 'fullyIntegrated'}
        ];
        for (const filter of initialFilter) {
            if (filters.form === filter.value) {
                filter.active = true;
                break;
            }
        }
        return initialFilter;
    });
    const [camperEquipmentFilter, setCamperEquipmentFilter] = useState<FeatureItem[]>(() => {
        const initialFilter: FeatureItem[] = [
            {name: 'AC', active: false, icon: 'ac', value: 'AC'},
            {name: 'Kitchen', active: false, icon: 'kitchen', value: 'kitchen'},
            {name: 'Bathroom', active: false, icon: 'bathroom', value: 'bathroom'},
            {name: 'TV', active: false, icon: 'tv', value: 'TV'},
            {name: 'Refrigerator', active: false, icon: 'refrigerator', value: 'refrigerator'},
            {name: 'Microwave', active: false, icon: 'microwave', value: 'microwave'},
            {name: 'Petrol', active: false, icon: 'gas', value: 'gas'},
            {name: 'Water', active: false, icon: 'water', value: 'water'},
            {name: 'Radio', active: false, icon: 'radio', value: 'radio'}
        ];
        for (const filter of initialFilter) {
            if (filters.features.includes(filter.value)) {
                filter.active = true;
            }
        }
        return initialFilter;
    });

    useEffect(() => {
        dispatch(setPage(1));
        dispatch(resetCampers());
        dispatch(fetchCampers());
    }, [dispatch]);

    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        dispatch(setLocationFilter(e.target.value));
    };

    const handleCamperFormChange = (e: MouseEvent<HTMLButtonElement>, val: string) => {
        e.preventDefault();
        dispatch(setFormFilter(val));
        setCamperFormFilter(prev => {
            return prev.map(form => ({
                ...form,
                active: form.value === val
            }));
        });
    };

    const handleFeatureChange = (e: MouseEvent<HTMLButtonElement>, feature: string) => {
        e.preventDefault();
        dispatch(toggleFeatureFilter(feature));
        setCamperEquipmentFilter(prev => {
            return prev.map(item => ({
                ...item,
                active: item.value === feature ? !item.active : item.active
            }));
        });
    };

    const handleApplyFilters = () => {
        dispatch(setPage(1));
        dispatch(resetCampers());
        dispatch(fetchCampers());
    };

    const handleLoadMore = () => {
        const newPage = page + 1;
        setCatalogPage(newPage);
        dispatch(setPage(newPage));
        dispatch(fetchCampers());
    };

    return (
        <div className={css.catalogPage}>
            <div className={css.content}>
                <div className={css.filters}>
                    <div className={css.filterSection}>
                        <div className={css.filterGroup}>
                            <label className={css.filterLabel}>Location</label>
                            <InputField icon="map" onChange={handleLocationChange} value={filters.location}
                                        palaceHolder={"Enter location"}/>
                        </div>

                        <label className={css.filterLabel}>Filters</label>

                        <div className={css.filterGroup}>
                            <h2 className={css.filterTitle}>Vehicle equipment</h2>
                            <hr/>
                            <div className={css.checkboxGroup}>
                                {camperEquipmentFilter.map((feature, iter) => (
                                    <FilterItem
                                        key={iter}
                                        text={feature.name}
                                        onClick={handleFeatureChange}
                                        value={feature.value}
                                        active={feature.active}
                                        icon={feature.icon}/>
                                ))}
                            </div>
                        </div>

                        <div className={css.filterGroup}>
                            <h2 className={css.filterTitle}>Vehicle type</h2>
                            <hr/>
                            <div className={css.checkboxGroup}>
                                {camperFormFilter.map((form, iter) => (
                                    <FilterItem
                                        key={iter}
                                        text={form.name}
                                        onClick={handleCamperFormChange}
                                        value={form.value}
                                        active={form.active}
                                        icon={form.icon}/>)
                                )}
                            </div>
                        </div>

                        <button className={css.filtersButton} onClick={handleApplyFilters}>
                            Search
                        </button>
                    </div>
                </div>

                <div className={css.mainContent}>
                    {isLoading ? (
                        <Loader/>
                    ) : (
                        <>
                            <div className={css.campersGrid}>
                                {items.length > 0 ? (
                                    items.map(camper => (
                                        <CamperCard key={camper.id} camper={camper}/>
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
