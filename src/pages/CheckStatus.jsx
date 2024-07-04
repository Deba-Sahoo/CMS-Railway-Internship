import React, { useState } from "react";
import "./CheckStatus.css";
import axios from "axios";

function CheckStatus() {
  const [statusBy, setStatusBy] = useState("complainID");
  const [statusInput, setStatusInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // fetch the complaint by Id or pf no ---------------------------------------------
  const checkStatus = async () => {
    try {
      let response;
      if (statusBy === "complainID") {
        response = await axios.get(
          `http://localhost:3003/getComplaintByComplaintId/${statusInput}`
        );
      } else if (statusBy === "employeeNo") {
        response = await axios.get(
          `http://localhost:3003/getComplaintDetailsByPfNo/${statusInput}`
        );
      }

      setResults(response.data);
      setError("");
    } catch (error) {
      setError(
        "Error fetching the status. Please check the input and try again."
      );
      setResults([]);
    }
  };

  return (
    <div className="check-status-container">
      <main>
        <div className="content-wrapper">
          <h1>Check Complaint Status</h1>
          <div className="status-check">
            <label htmlFor="statusBy">Check Status By</label>
            <select
              id="statusBy"
              value={statusBy}
              onChange={(e) => setStatusBy(e.target.value)}
            >
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
            <button className="go-button" onClick={checkStatus}>
              Go
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result) => (
                  <tr key={result.complaintID}>
                    <td>{result.complaintID}</td>
                    <td>{result.title}</td>
                    <td>{result.complaint}</td>
                    <td>{result.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No complaints {error && <p className="error">{error}</p>}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default CheckStatus;
