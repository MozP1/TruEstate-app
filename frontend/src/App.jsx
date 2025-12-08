import { useState, useEffect } from "react";
import { fetchSales } from "./services/api";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchSales({ page: 1 }).then(setData);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>TruEstate Sales Dashboard</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
