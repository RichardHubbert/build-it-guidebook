import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ServiceRequestCard from "@/components/ServiceRequestCard";
import WorkflowVisualization from "@/components/WorkflowVisualization";
import StatsCard from "@/components/StatsCard";
import IntegrationStatus from "@/components/IntegrationStatus";
import { VoiceConversation } from "@/components/VoiceConversation";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Calendar, 
  PoundSterling, 
  Users, 
  TrendingUp,
  Clock,
  Plus
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
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('trade' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform trade data to match component interface
      const transformedData: ServiceRequest[] = data?.map((request: any) => ({
        id: request.id.toString(),
        customer: request.name || 'Unknown Customer',
        phone: request.phone || 'N/A',
        issue: request.service || 'Service Request',
        address: request.subject || 'N/A',
        urgency: "Medium" as ServiceRequest['urgency'], // Default since trade table doesn't have urgency
        status: "Voice Intake" as ServiceRequest['status'], // Default status
        scheduledTime: request.date && request.time ? 
          `${request.date} ${request.time}` : undefined,
        estimatedCost: undefined, // Not available in trade table
        technicianZone: request.treatment || undefined
      })) || [];

      setServiceRequests(transformedData);
    } catch (error) {
      console.error('Error fetching trade requests:', error);
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
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-2xl font-bold text-foreground">Active Service Requests</h2>
                <Button onClick={() => setShowVoiceChat(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Voice Intake
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">Current jobs in the workflow pipeline</p>
              
              <div className="space-y-4">
                {showVoiceChat && (
                  <div className="mb-6">
                    <VoiceConversation 
                      onClose={() => {
                        setShowVoiceChat(false);
                        fetchServiceRequests(); // Refresh the list when conversation ends
                      }}
                      businessId={user?.id}
                    />
                  </div>
                )}
                
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading service requests...
                  </div>
                ) : serviceRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No service requests yet. Use the Voice Intake button above to start taking calls.
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
