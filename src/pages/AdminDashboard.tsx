import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import StatsCard from "@/components/StatsCard";
import IntegrationStatus from "@/components/IntegrationStatus";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  Phone, 
  Calendar, 
  PoundSterling, 
  Users, 
  TrendingUp,
  Clock
} from "lucide-react";

interface ServiceRequest {
  id: string;
  customer: string;
  phone: string;
  issue: string;
  address: string;
  urgency: "Low" | "Medium" | "High" | "Emergency";
  status: "Voice Intake" | "Scheduled" | "In Progress" | "Completed" | "Pending Payment";
  scheduledTime?: string;
  estimatedCost?: number;
  technicianZone?: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database data to match component interface
      const transformedData: ServiceRequest[] = data?.map(request => ({
        id: request.id,
        customer: request.customer_name,
        phone: request.phone,
        issue: request.issue,
        address: request.address,
        urgency: request.urgency as ServiceRequest['urgency'],
        status: request.status as ServiceRequest['status'],
        scheduledTime: request.scheduled_time ? 
          new Date(request.scheduled_time).toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit' 
          }) : undefined,
        estimatedCost: request.estimated_cost ? Number(request.estimated_cost) : undefined,
        technicianZone: request.technician_zone || undefined
      })) || [];

      setServiceRequests(transformedData);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Requests"
            value={serviceRequests.length.toString()}
            change={`${serviceRequests.filter(r => r.status === 'Voice Intake').length} new today`}
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
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading service requests...
                  </div>
                ) : serviceRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No service requests yet. Share the customer landing page to start receiving requests.
                  </div>
                ) : (
                  serviceRequests.map((request) => (
                    <ServiceRequestCard key={request.id} request={request} />
                  ))
                )}
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
