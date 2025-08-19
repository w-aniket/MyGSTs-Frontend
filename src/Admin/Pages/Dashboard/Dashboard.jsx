import React from 'react';
import './Dashboard.css';
import AdminServiceRequests from '../../Components/ServiceRequests/AdminServiceRequests';
import StatsCards from '../../../Component/StatsCards/StatsCards';
import ClientTable from '../../../Component/ClientTable/ClientTable';
import ServiceOverviewChart from '../../../Component/ServiceOverviewChart/ServiceOverviewChart';
import RecentInvoicesTable from '../../../Component/RecentInvoicesTable/RecentInvoicesTable';

const Dashboard = () => {
  return (
    <div className="">

      <StatsCards />

     <ServiceOverviewChart />
      <AdminServiceRequests />


      <ClientTable />

    <RecentInvoicesTable />
      
    </div>
  );
};

export default Dashboard;