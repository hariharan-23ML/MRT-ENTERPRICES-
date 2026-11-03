import React, { useState } from "react";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { DataTable, Column } from "../../components/admin/DataTable";

interface CustomerRecord {
  id: string;
  name: string;
  facility: string;
  email: string;
  phone: string;
  facilityType: string;
  status: string;
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: "CUST-001",
    name: "Dr. Rajesh Kumar",
    facility: "City Multispeciality Hospital",
    email: "dr.rajesh@cityhospital.org",
    phone: "+91 98765 43210",
    facilityType: "Tertiary Hospital",
    status: "Verified",
  },
  {
    id: "CUST-002",
    name: "Dr. Ananya Sen",
    facility: "Metro Diagnostics Laboratory",
    email: "procurement@metrodiagnostics.in",
    phone: "+91 98112 34567",
    facilityType: "Diagnostic Center",
    status: "Verified",
  },
  {
    id: "CUST-003",
    name: "K. Murugan",
    facility: "Southern Healthcare Foundation",
    email: "k.murugan@shf.org",
    phone: "+91 94441 23890",
    facilityType: "Non-Profit Institution",
    status: "Active",
  },
];

export const AdminCustomersPage: React.FC = () => {
  const [customers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);

  const columns: Column<CustomerRecord>[] = [
    {
      header: "Account ID",
      accessor: "id",
      width: "14%",
    },
    {
      header: "Institution & Authority",
      render: (c) => (
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy-900)" }}>{c.facility}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>{c.name}</div>
        </div>
      ),
      width: "36%",
    },
    {
      header: "Contact Details",
      render: (c) => (
        <div>
          <div style={{ fontSize: "0.8125rem" }}>{c.email}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>{c.phone}</div>
        </div>
      ),
      width: "28%",
    },
    {
      header: "Classification",
      accessor: "facilityType",
      width: "22%",
    },
  ];

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader
          title="Institutional Customer Directory"
          subtitle="Registered hospitals, clinics, diagnostic centers, and healthcare buyers."
        />

        <div className="admin-body">
          <DataTable
            columns={columns}
            data={customers}
            keyExtractor={(c) => c.id}
          />
        </div>
      </div>
    </div>
  );
};
