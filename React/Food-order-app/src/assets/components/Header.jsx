import Button from './UI/Button.jsx';
import logoImg from '../logo.jpg';

export default function Header() {
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant" />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>Cart (0)</Button>
        </nav>
    </header>
}