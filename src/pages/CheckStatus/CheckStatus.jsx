import React, { useState } from "react";
import './CheckStatus.css';

function CheckStatus() {
  const [statusBy, setStatusBy] = useState("complainID");
  const [statusInput, setStatusInput] = useState("");
  const [results, setResults] = useState([]);
  const checkStatus = () => {
    const data = [
      {
        id: "1",
        status: "Pending",
        description: "Complaint is being processed",
      },
      {
        id: "2",
        status: "Resolved",
        description: "Complaint has been resolved",
      },
    ];

    const filterResults = data.filter(
      (item) =>
        (statusBy === "complainID" && item.id === statusInput) ||
        (statusBy === "employeeNo" && item.id === statusInput)
    );

    setResults(filterResults);
  };

  return (
    <div className="check-status-container">
        <main>
          <div className="content-wrapper">
            <h1>Check Complaint Status</h1>
            <div className="status-check">
              <label htmlFor="statusBy">Check Status By</label>
              <select id="statusBy" value={statusBy} onChange={(e) => setStatusBy(e.target.value)}>
                <option value="complainID">Complain ID</option>
                <option value="employeeNo">Employee No.</option>
              </select>
              <input
                type="text"
                id="statusInput"
                value={statusInput}
                onChange={(e) => setStatusInput(e.target.value)}
                placeholder="Complain ID/ Employee No."
              />
              <button className="go-button" onClick={checkStatus}>Go</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.id}</td>
                    <td>{result.status}</td>
                    <td>{result.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
    </div>
  )
}

export default CheckStatus;
