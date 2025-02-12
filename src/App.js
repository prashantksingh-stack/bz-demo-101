import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [apiResponse, setApiResponse] = useState("Loading...!");

  const fetchData = () => {
    setApiResponse("Loading...!");

    fetch("https://s52ww2xtz0.execute-api.us-west-2.amazonaws.com/dev/bz-test-api-12-feb")
    .then((response) => response.json())
    .then((data) => {
      setApiResponse(JSON.stringify(data, null, 2));
    })
    .catch((err) => {
      console.error("Error occured");
      setApiResponse("Having issues with API call");
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Being Zero first session is about to start. But before that...
        </p>
        <pre>{apiResponse}</pre>
      
        <button onClick={fetchData} style={{padding: "10px", cursor: "pointer"}}>
          Click here
        </button>


      </header>
    </div>
  );
}

export default App;
