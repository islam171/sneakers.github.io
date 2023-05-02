import { type } from '@testing-library/user-event/dist/type';
import React from 'react';
import AppContext from "../context";

function Header(props) {


    return (
        <header className="__container">
            <div className="header__item fist-header__item">
                <a href="/">
                    <img width={40} height={40} src="/img/logo.png"  alt="logo"/>
                </a>
                <div className="header__info">
                    <a href="/"><h3>REACT SNEAKERS</h3></a>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className="header__item header__nav">
                <li className="mr-30 nav__item" onClick={props.onCart}>
                    <img width={18} height={18} className='mr-10' src="/img/Cart.svg" alt="Корзина"/>
                    <span>1205 руб.</span>
                </li>
                <li className="mr-30"><a href='/favorite'><img width={18} height={18} src="/img/like.svg" alt="Закладки"/></a></li>
                <li ><a href='/orders'><img width={18} height={18} src="/img/Union.svg" alt="Пользовотель"/></a></li>
            </ul>
        </header>
    )
};

export default Header;