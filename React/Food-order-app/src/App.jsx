import Header from "./assets/components/Header.jsx";
import Meals from "./assets/components/Meals.jsx";
import Cart from "./assets/components/UI/Cart.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
