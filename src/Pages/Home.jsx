import React from 'react'

import Card from '../components/Card'
import AppContext from '../context';

function Home({ SearchValue, onChangeSearchInput, AddCartItems, onToFavorite, setSearchValue, isLoading}) {

    const {items} = React.useContext(AppContext);

    const renderItems = () => {
        const filtredItems = items.filter((item) => item.title.toLowerCase().includes(SearchValue.toLowerCase()),);

        return (
            isLoading ? [...Array(12)] : filtredItems)
            .map((item, index) => (
                <Card
                    key={index}
                    onPlus={(obj) => AddCartItems(obj)}
                    onFavorite={(obj) => onToFavorite(obj)}
                    loading={isLoading}
                    {...item}
                />
            ));
    }

    return (
        <div>
            <div className="content__head">
                <h1>{SearchValue ? `Поиск по запросу: "${SearchValue}"` : "Все кросовки"}</h1>
                <div className="search">
                    <img src="/img/Search.svg" alt="search" />
                    {SearchValue && <img onClick={() => setSearchValue('')} className='clear' src={"/img/Button 1.svg"} alt='clear' />}
                    <input placeholder="Поиск..." value={SearchValue} onChange={onChangeSearchInput} />
                </div>
            </div>

            <div className="Cards">
                {renderItems()}
            </div>
        </div>
    )
}

export default Home