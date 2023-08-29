import "./App.css";
import DynamicStarRating from "./components/DynamicStarRating/DynamicStarRating";

function App() {
  return (
    <div className="App">
      <DynamicStarRating maximumStars={5} rating={3.3} />
    </div>
  );
}

export default App;
