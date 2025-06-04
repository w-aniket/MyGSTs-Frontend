import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="">
      <div className="cards">
        <div className="card"><h4>Total Clients</h4><p>120</p></div>
        <div className="card"><h4>Invoices</h4><p>$8,250</p></div>
        <div className="card"><h4>GST Filings</h4><p>25</p></div>
        <div className="card"><h4>ITR Filings</h4><p>18</p></div>
      </div>

      <div className="clients-table">
        <h4>Client List</h4>
        <table>
          <thead>
            <tr><th>Name</th><th>Company</th><th>Status</th></tr>
          </thead>
          <tbody>
            <tr><td>Margaret Curtis</td><td>Lorem Ipsum Inc.</td><td className="status-active">Active</td></tr>
            <tr><td>Matthew Gonzalez</td><td>Lorem Ipsum Inc.</td><td className="status-inactive">Inactive</td></tr>
            <tr><td>Amanda Reed</td><td>Lorem Ipsum Inc.</td><td className="status-active">Active</td></tr>
            <tr><td>Brian Porter</td><td>Lorem Ipsum Inc.</td><td className="status-active">Active</td></tr>
            <tr><td>Nicole Bell</td><td>Lorem Ipsum Inc.</td><td className="status-inactive">Inactive</td></tr>
          </tbody>
        </table>
      </div>

      <div className="chart-section">
        <h4>Services Overview</h4>
        <p>[Insert Pie Chart Placeholder]</p>
      </div>

      <div className="invoices-table">
        <h4>Recent Invoices</h4>
        <table>
          <thead>
            <tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Amount</th></tr>
          </thead>
          <tbody>
            <tr><td>1001</td><td>Amanda Reed</td><td>04/01/2024</td><td>$1,200</td></tr>
            <tr><td>1002</td><td>Brian Porter</td><td>04/02/2024</td><td>$800</td></tr>
            <tr><td>1003</td><td>William Reed</td><td>04/03/2024</td><td>$1,000</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;