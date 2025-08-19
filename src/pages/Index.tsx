import Header from "@/components/Header";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import StatsCard from "@/components/StatsCard";
import IntegrationStatus from "@/components/IntegrationStatus";
import { 
  Phone, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp,
  Clock
} from "lucide-react";

const Index = () => {
  const mockServiceRequests = [
    {
      id: "1",
      customer: "John Smith",
      phone: "(555) 123-4567",
      issue: "Water heater is leaking in basement",
      address: "123 Oak Street, Downtown",
      urgency: "Emergency" as const,
      status: "Voice Intake" as const,
      technicianZone: "Zone A"
    },
    {
      id: "2", 
      customer: "Sarah Johnson",
      phone: "(555) 987-6543",
      issue: "AC unit not cooling properly",
      address: "456 Pine Avenue, Midtown",
      urgency: "High" as const,
      status: "Scheduled" as const,
      scheduledTime: "Today 2:00 PM",
      estimatedCost: 250,
      technicianZone: "Zone B"
    },
    {
      id: "3",
      customer: "Mike Davis",
      phone: "(555) 456-7890", 
      issue: "Garbage disposal making strange noise",
      address: "789 Maple Drive, Uptown",
      urgency: "Medium" as const,
      status: "In Progress" as const,
      scheduledTime: "Today 11:00 AM",
      estimatedCost: 150,
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
            value="$2,450"
            change="+15%"
            icon={DollarSign}
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

export default Index;
