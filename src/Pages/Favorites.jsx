import React from 'react'

import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {

    const {favorits, onToFavorite} = React.useContext(AppContext);


    return (
        <div>
            <div className="content__head">
                <h1>Мои закладки</h1>

            </div>

            <div className="Cards">
                {favorits.map((item, index) => (
                    <Card
                        key={index}
                        Favorited={true}
                        onFavorite={obj => onToFavorite(obj)}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites