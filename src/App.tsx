import "./App.css";

import Button from "remoteApp/Button";
import useStore from "remoteApp/store";

function App() {
    const [count, setCount] = useStore();

    return (
        <div className="App">
            <h1>Host Application</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    Host App: {count}
                </button>
            </div>

            <Button />
        </div>
    );
}

export default App;