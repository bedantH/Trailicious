import React from 'react'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Header = () => {
    return (
        <header className="lyt_header">
            <nav className="header__nav">
                <h1>Trailicious</h1>
                <button className='cart_btn'>
                    <ShoppingBasketIcon fontSize='large' />
                </button>
            </nav>
        </header>
    )
}

export default Header