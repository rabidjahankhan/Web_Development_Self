import Button from './UI/Button.jsx';
import logoImg from '../logo.jpg';
import { useContext } from 'react';
import CartContext from '../../store/CartContext.jsx';


export default function Header() {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
        return totalNumberOfItem + item.quantity;
    }, 0);

    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}