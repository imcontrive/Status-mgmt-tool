import React, { Component } from 'react'

export default class GenerateReport extends Component {
  render() {
    return (
      <div className="report-container">
        <div className="user-selection">
          <select name="organisation" onChange={this.handleChange}>
            <option key="cp-01" value="Vidushi">Vidushi</option>
            <option key="cp-02" value="Admin">Admin</option>
          </select>
        </div>
        <div className="input-panel">
          <select>
            <option value="">Date Range</option>
          </select>
          <select>
            <option value="">Project Name</option>
          </select>
          <select>
            <option value="">Employee Name</option>
          </select>
          <button type="submit">Generate Report</button>
        </div>
        {/* 888888888888 */}
        <div className="user-selection reports-conten">
          Hello
        </div>
        <div className="reports-content">
          <h4>Specify a query to generate the report</h4>
        </div>
      </div>
    )
  }
}
