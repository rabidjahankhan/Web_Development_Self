import Header from "./assets/components/Header.jsx";
import Meals from "./assets/components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";

function  App() {
  return (
    <CartContextProvider>
      <Header />
      <Meals/>
    </CartContextProvider>
  );
}

export default App;
