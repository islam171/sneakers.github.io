import React, { useState } from 'react'
import ContentLoader from "react-content-loader"

import styles from './Card.module.scss'

import AppContext from '../../context';

function Card({ id, title, price, ImageUrl, onFavorite, onPlus, Favorited = false, loading = false }) {

    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(Favorited);
    const itemsObj = {title, perentId: id,price, ImageUrl, id}

    const AddActive = () => {
        onPlus(itemsObj)   
    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite)
        onFavorite(itemsObj)
    }


    return (
        <div className={styles.card} >
            {
                loading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={187}
                    viewBox="0 0 150 187"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                    <rect x="0" y="107" rx="3" ry="3" width="150" height="15" />
                    <rect x="0" y="163" rx="8" ry="8" width="93" height="24" />
                    <rect x="0" y="126" rx="3" ry="3" width="93" height="15" />
                    <rect x="120" y="157" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> :
                    <>
                        {onFavorite && (<div className={styles.favorite} onClick={onClickFavorite}>
                            <img src={isFavorite ? "/img/Feature.svg" : "/img/Feature 1.svg"} alt="Заклатки" />
                        </div>)}
                        <img height={112} width={133} src={ImageUrl} alt="Кросовок" />
                        <h5>{title}</h5>
                        <div className={styles.card__info}>
                            <div>
                                <p>Цена:</p>
                                <b>{price}</b>
                            </div>

                            {onPlus && (<button onClick={AddActive} >
                                <img src={isItemAdded(id) ? "./img/Tick.svg" : "/img/plus.svg"} alt="" />
                            </button>)}
                        </div>
                    </>

            }


        </div>

    )
};

export default Card;