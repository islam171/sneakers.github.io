import Info from '../Info'
import React from 'react';

import AppContext from '../../context';
import Axios from 'axios'
import styles from './Saidbar.module.scss'


function Saidbar({ onClose, items = [], onRemove, opened}) {

    const [isComplited, setIsComplited] = React.useState(false)
    const [orederId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const { cartitems, setCartItems } = React.useContext(AppContext)

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await Axios.post(`https://63089f0046372013f5822251.mockapi.io/orders`, {items: cartitems,});
            
            setOrderId(data.id)
            setIsComplited(true)
            setCartItems([])

            for (let i = 0; i < cartitems.length; i++){
                const item = cartitems[i];
                await Axios.delete('https://63089f0046372013f5822251.mockapi.io/cart/' + item.id)
                await delay(1000)
            }

        } catch (error) {
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.saidbar_shadow} ${opened ? styles.saidbar_visible: ''}`}>
            <div className={styles.saidbar}>
                <div className={styles.saidbar__title}>
                    <h2>Корзина</h2>
                    <button onClick={onClose}>
                        <img src={"/img/Button 1.svg"} alt="Кнопка" />
                    </button>
                </div>
                <div className={styles.saidbar__content}>
                    {items.length > 0 ? (
                        <div className={styles.saidbar__block}>
                            <div className={styles.cart}>
                                {items.map((obj) => (
                                    <div key={obj.id} className={styles.cart__item}>
                                        <img width={70} height={70} src={obj.ImageUrl} alt="Картинка товара"></img>
                                        <div className={styles.cart__dict}>
                                            <p>{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        <button onClick={() => onRemove(obj.id)}>
                                            <img src={"/img/Button 1.svg"} alt="Кнопка" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.paymant}>
                                <ul>
                                    <li>
                                        <span>Итого: </span>
                                        <div className={styles.dashed}></div>
                                        <b>21 498 руб. </b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div className={styles.dashed}></div>
                                        <b>1074 руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} className="btn" onClick={onClickOrder}>
                                    <span>Оформить заказ</span>
                                    <img src="/img/Arrow.svg" alt="Стрелка"></img>
                                </button>
                            </div>
                        </div>
                    ) :
                        (
                            isComplited ? (

                                <Info
                                    title='Заказ оформлен!'
                                    desc={`Ваш заказ #${orederId} скоро будет передан курьерской доставке`}
                                    image="/img/image 8.jpg"
                                />
                            ) : (
                                <Info
                                    title='Корзина пустая'
                                    desc="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                                    image="/img/box.svg"
                                />
                            )


                        )

                    }
                </div>
            </div>
        </div>
    )
};

export default Saidbar;