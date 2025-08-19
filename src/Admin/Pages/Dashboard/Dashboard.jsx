import React from 'react';
import './Dashboard.css';
import AdminServiceRequests from '../../Components/ServiceRequests/AdminServiceRequests';
import StatsCards from '../../../Component/StatsCards/StatsCards';
import ClientTable from '../../../Component/ClientTable/ClientTable';

const Dashboard = () => {
  return (
    <div className="">

      <StatsCards />

      <AdminServiceRequests />

      <ClientTable />

     

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