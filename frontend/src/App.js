import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch data from the /documents endpoint
    axios
      .get("http://localhost:9000/documents")
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Documents</h1>
        {documents.map((doc, index) => (
          <pre>{JSON.stringify(doc, null, 2)}</pre>
        ))}
      </header>
    </div>
  );
}

export default App;
