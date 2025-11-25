import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MyButton from "./components/MyButton";
import Counter from "./components/Counter";
import Toggle from "./components/Toggle";
import InputForm from "./components/InputForm";

function App() {

	function handleClick() {
		alert("Button Clicked!");
	}

  return (
    <>
      <Header />

      <InputForm/>

      <Counter/>

      <Toggle/>

      <MyButton text="Click Me" onClick={handleClick} />
      <MyButton text="Learn More" onClick={() => alert("Learning...")} />
      <MyButton text="Submit" onClick={() => console.log("Submitted")} />

      <Card
        title="Learn React"
        message="Understand components, props, and state."
      />
      <Card
        title="Practice Everyday"
        message="Building small projects improves memory."
      />
      <Card
        title="Build Real Apps"
        message="Use your knowledge to create real-world apps."
      />
      <Card
        title="Learn Swimming"
        message="Swmming make you healthy and confident"
      />

      <Footer />
    </>
  );
}

export default App;
