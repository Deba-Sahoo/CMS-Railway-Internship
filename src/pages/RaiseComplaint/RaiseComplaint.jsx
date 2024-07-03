import React from "react";
import "./RaiseComplaint.css";

const RaiseComplaint = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        <h1>RAISE NEW COMPLAINT</h1>
        <form className="complaint-form">
          <div className="raise-complaint-input-group">
            <label htmlFor="employeeNo">Enter Employee No.</label>
            <input type="text" id="employeeNo" name="employeeNo" />
          </div>
          <div className="raise-complaint-input-group">
            <label htmlFor="employeeName">Enter Employee Name</label>
            <input type="text" id="employeeName" name="employeeName" />
          </div>
          <div className="dropdown-group">
            <div className="raise-complaint-input-group">
              <label htmlFor="department">Department</label>
              <select id="department" name="department">
                <option value="personnel">Personnel</option>
                <option value="engg">ENGG</option>
                <option value="optg">OPTG</option>
              </select>
            </div>
            <div className="raise-complaint-input-group">
              <label htmlFor="website">Website</label>
              <select id="website" name="website">
                <option value="e-office">e-Office</option>
                <option value="sparrow">Sparrow</option>
                <option value="east-coast-website">East Coast Website</option>
              </select>
            </div>
            <div className="raise-complaint-input-group">
              <label htmlFor="module">Module</label>
              <select id="module" name="module">
                <option value="payroll">Payroll</option>
                <option value="bill-passing">Bill Passing</option>
                <option value="pension">Pension</option>
              </select>
            </div>
            <div className="raise-complaint-input-group">
              <label htmlFor="division">Division</label>
              <select id="division" name="division">
                <option value="kur">KUR</option>
                <option value="sbp">SBP</option>
                <option value="wat">WAT</option>
              </select>
            </div>
          </div>
          <div className="raise-complaint-input-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>
          <div className="raise-complaint-input-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description"></textarea>
          </div>
          <div className="raise-complaint-input-group">
            <label htmlFor="reference">Upload Reference Documents</label>
            <input type="file" name="reference" id="reference"/>
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
