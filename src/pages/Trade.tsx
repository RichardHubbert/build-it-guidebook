import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, User, Phone, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

const Trade = () => {
  const [tradeRequests, setTradeRequests] = useState<TradeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Failed to load trade requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'N/A';
    return timeString;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto p-6">
          <div className="text-center">Loading trade requests...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Trade Requests</h1>
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {tradeRequests.length} Total
          </Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tradeRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-primary" />
                    {request.name || 'Unknown Customer'}
                  </CardTitle>
                  <Badge variant="outline">#{request.id}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {request.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${request.phone}`} className="hover:text-primary">
                      {request.phone}
                    </a>
                  </div>
                )}

                {request.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <a href={`mailto:${request.email}`} className="hover:text-primary">
                      {request.email}
                    </a>
                  </div>
                )}

                {request.service && (
                  <div className="flex items-center gap-2 text-sm">
                    <Wrench className="w-4 h-4 text-primary" />
                    <span className="font-medium">{request.service}</span>
                  </div>
                )}

                {request.subject && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{request.subject}</span>
                  </div>
                )}

                {(request.date || request.time) && (
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {request.date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(request.date)}</span>
                      </div>
                    )}
                    {request.time && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formatTime(request.time)}</span>
                      </div>
                    )}
                  </div>
                )}

                {request.treatment && (
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Treatment: </span>
                    <span className="text-muted-foreground">{request.treatment}</span>
                  </div>
                )}

                {request.client_notes && (
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Notes: </span>
                    <span className="text-muted-foreground">{request.client_notes}</span>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    Created: {new Date(request.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {tradeRequests.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Trade Requests</h3>
            <p className="text-muted-foreground">
              Trade requests will appear here when customers submit service requests.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trade;