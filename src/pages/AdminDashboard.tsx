import { useEffect, useState } from "react";
import Header from "@/components/Header";
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

interface TradeRequest {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  service: string | null;
  subject: string | null;
  date: string | null;
  time: string | null;
  treatment: string | null;
  client_notes: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  useEffect(() => {
    fetchTradeRequests();
  }, []);

  const fetchTradeRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('trade')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTradeRequests(data || []);
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
            title="Trade Requests"
            value={tradeRequests.length.toString()}
            change={`${tradeRequests.filter(r => new Date(r.created_at).toDateString() === new Date().toDateString()).length} new today`}
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
                <h2 className="text-2xl font-bold text-foreground">Trade Requests</h2>
                <Button onClick={() => setShowVoiceChat(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Voice Intake
                </Button>
              </div>
              <p className="text-muted-foreground mb-6">Current trade requests from customers</p>
              
              <div className="space-y-4">
                {showVoiceChat && (
                  <div className="mb-6">
                    <VoiceConversation 
                      onClose={() => {
                        setShowVoiceChat(false);
                        fetchTradeRequests(); // Refresh the list when conversation ends
                      }}
                      businessId={user?.id}
                    />
                  </div>
                )}
                
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading trade requests...
                  </div>
                ) : tradeRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No trade requests yet. Use the Voice Intake button above to start taking calls.
                  </div>
                ) : (
                  tradeRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{request.name || 'Unknown Customer'}</h3>
                        <span className="text-sm text-muted-foreground">#{request.id}</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        {request.phone && <p><strong>Phone:</strong> {request.phone}</p>}
                        {request.email && <p><strong>Email:</strong> {request.email}</p>}
                        {request.service && <p><strong>Service:</strong> {request.service}</p>}
                        {request.subject && <p><strong>Subject:</strong> {request.subject}</p>}
                        {request.date && <p><strong>Date:</strong> {request.date}</p>}
                        {request.time && <p><strong>Time:</strong> {request.time}</p>}
                        {request.treatment && <p><strong>Treatment:</strong> {request.treatment}</p>}
                        {request.client_notes && <p><strong>Notes:</strong> {request.client_notes}</p>}
                      </div>
                    </div>
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
