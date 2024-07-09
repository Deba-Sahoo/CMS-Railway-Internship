import React, { useState } from "react";
import "./RaiseComplaint.css";
import axios from "axios";

const RaiseComplaint = () => {
  const [employeeNo, setEmployeeNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("personnel");
  const [website, setWebsite] = useState("e-office");
  const [module, setModule] = useState("payroll");
  const [division, setDivision] = useState("kur");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate employee number
    if (employeeNo.length !== 11) {
      alert("Please Enter a valid employee number");
      return;
    }
    const formData = new FormData();
    formData.append("createdByName", employeeName);
    formData.append("pfNo", employeeNo);
    formData.append("department", department);
    formData.append("website", website);
    formData.append("module", module);
    formData.append("division", division);
    formData.append("title", subject);
    formData.append("complaint", description);
    formData.append("document", reference);

    try {
      const response = await axios.post(
        "http://localhost:3003/addComplaint",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again later.");
    }
  };

  return (
    <div className="main-container">
      <div className="main-content">
        <h1>RAISE NEW COMPLAINT</h1>
        <form className="complaint-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="employeeNo">Enter Employee No.</label>
            <input
              type="text"
              id="employeeNo"
              name="employeeNo"
              value={employeeNo}
              onChange={(e) => setEmployeeNo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="employeeName">Enter Employee Name</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </div>
          <div className="dropdown-group">
            <div className="input-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="personnel">Personnel</option>
                <option value="engg">ENGG</option>
                <option value="optg">OPTG</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="website">Website</label>
              <select
                id="website"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              >
                <option value="e-office">e-Office</option>
                <option value="sparrow">Sparrow</option>
                <option value="east-coast-website">East Coast Website</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="module">Module</label>
              <select
                id="module"
                name="module"
                value={module}
                onChange={(e) => setModule(e.target.value)}
              >
                <option value="payroll">Payroll</option>
                <option value="bill-passing">Bill Passing</option>
                <option value="pension">Pension</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="division">Division</label>
              <select
                id="division"
                name="division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
              >
                <option value="kur">KUR</option>
                <option value="sbp">SBP</option>
                <option value="wat">WAT</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="reference">Upload Reference Documents</label>
            <input
              type="file"
              name="reference"
              id="reference"
              onChange={(e) => setReference(e.target.files[0])}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
