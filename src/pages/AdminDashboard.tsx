import Header from "@/components/Header";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import StatsCard from "@/components/StatsCard";
import IntegrationStatus from "@/components/IntegrationStatus";
import { 
  Phone, 
  Calendar, 
  PoundSterling, 
  Users, 
  TrendingUp,
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const mockServiceRequests = [
    {
      id: "1",
      customer: "James Thompson",
      phone: "07700 900123",
      issue: "Boiler is leaking in the basement",
      address: "15 Victoria Road, Manchester M1 4EX",
      urgency: "Emergency" as const,
      status: "Voice Intake" as const,
      technicianZone: "Zone A"
    },
    {
      id: "2", 
      customer: "Sarah Williams",
      phone: "07812 345678",
      issue: "Central heating not working properly",
      address: "42 High Street, Birmingham B2 5QG",
      urgency: "High" as const,
      status: "Scheduled" as const,
      scheduledTime: "Today 14:00",
      estimatedCost: 185,
      technicianZone: "Zone B"
    },
    {
      id: "3",
      customer: "Michael Davies",
      phone: "07923 456789", 
      issue: "Kitchen tap making strange noise",
      address: "78 Kings Road, London SW3 4NX",
      urgency: "Medium" as const,
      status: "In Progress" as const,
      scheduledTime: "Today 11:00",
      estimatedCost: 120,
      technicianZone: "Zone A"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Requests"
            value="12"
            change="+3 today"
            icon={Phone}
            trend="up"
          />
          <StatsCard
            title="Scheduled Today"
            value="8"
            change="On track"
            icon={Calendar}
            trend="neutral"
          />
          <StatsCard
            title="Revenue Today"
            value="£1,850"
            change="+15%"
            icon={PoundSterling}
            trend="up"
          />
          <StatsCard
            title="Avg Response Time"
            value="2.3 min"
            change="-0.5 min"
            icon={Clock}
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Service Requests */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Active Service Requests</h2>
              <p className="text-muted-foreground mb-6">Current jobs in the workflow pipeline</p>
              
              <div className="space-y-4">
                {mockServiceRequests.map((request) => (
                  <ServiceRequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WorkflowVisualization />
            <IntegrationStatus />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
