import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';

import './elementsFilters.scss';



const ElementsFilters = () => {

    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state); // из state получаем и диструктуриризируем поля
    const dispatch = useDispatch(); // получение функции dispatch
    const {request} = useHttp(); // получение функции, которая делает запрос

    // Запрос на сервер для получения фильтров и последовательной смены состояния
    useEffect(() => {
        dispatch(filtersFetching());                       // отправка в store(получение фильтров)
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))  // тогда, отправка в store(фильтры загружены)
            .catch(() => dispatch(filtersFetchingError())) // ловим, отправка в store(ошибка при загрузке)
        // eslint-disable-next-line
    }, []);

    // условная проверка, если оба не выполнятся, то код идёт дальше
    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h4 className="">loading error</h4>
    }


    // Функция для рендаринга фильтров
    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h4 className="">Filters not found</h4>
        }

        // перебор массива
        return arr.map(({name, label, className}) => {

            // Используем библиотеку classnames и формируем классы динамически
            const btnClass = classNames('elements-filters__button', className, {
                'active': name === activeFilter
            });

            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }


    const items = renderFilters(filters);

    return (
        <div className="elements-filters">
            <div className="elements-filters__block">
                <h3 className="elements-filters__title">Filter elements by category</h3>
                <div className="elements-filters__group">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default ElementsFilters;