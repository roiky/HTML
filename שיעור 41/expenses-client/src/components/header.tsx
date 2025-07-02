// Header.tsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Using react-icons for cart icon
import './header.css';

interface HeaderProps {
    cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
    return (
        <header className="header">
            <h1 className="logo">My Shop</h1>
            <div className="cart-container">
                <FaShoppingCart size={30} />
                <span className="cart-count">{cartCount}</span>
            </div>
        </header>
    );
};

export default Header;
