import React, { useEffect, useState } from 'react';
import "./ClientTable.css";

const mockClients = [
  {
    id: 1,
    firstName: "Margaret",
    lastName: "Curtis",
    company: "Lorem Ipsum Inc.",
    status: "active",
    services: ["GST Filing", "ITR Filing"],
    lastPayment: "2025-08-01",
  },
  {
    id: 2,
    firstName: "Matthew",
    lastName: "Gonzalez",
    company: "Lorem Ipsum Inc.",
    status: "inactive",
    services: ["Accounting"],
    lastPayment: "2024-12-15",
  },
  {
    id: 3,
    firstName: "Amanda",
    lastName: "Reed",
    company: "Lorem Ipsum Inc.",
    status: "active",
    services: ["ITR Filing"],
    lastPayment: "2025-08-10",
  },
];

const ClientTable = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Replace with API call later
    setClients(mockClients);
  }, []);

  // Filtered clients based on search & status
  const filteredClients = clients.filter(client => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const matchesName = fullName.includes(searchTerm.toLowerCase());
    const matchesCompany = client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

    return (matchesName || matchesCompany) && matchesStatus;
  });

  return (
    <div className='clients-table'>
      <h4>Client List</h4>

      {/* Search & Filter */}
      <div className="client-table-controls">
        <input
          type="text"
          placeholder="Search by name or company"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="client-search-input"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="client-status-filter"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Status</th>
              <th>Services Taken</th>
              <th>Last Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.firstName} {client.lastName}</td>
                <td>{client.company}</td>
                <td className={client.status === "active" ? "status-active" : "status-inactive"}>
                  {client.status === "active" ? "Active" : "Inactive"}
                </td>
                <td>{client.services.join(", ")}</td>
                <td>{client.lastPayment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientTable;
