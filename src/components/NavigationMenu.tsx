import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Wrench, AlertCircle, RefreshCw } from 'lucide-react';

interface MenuData {
  tradeRequestsCount: number;
}

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<MenuData>({ tradeRequestsCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch trade requests
      const { data: tradeRequests, error: tradeError } = await supabase
        .from('trade')
        .select('id', { count: 'exact' });

      if (tradeError) console.error('Error fetching trade requests:', tradeError);

      setData({
        tradeRequestsCount: tradeRequests?.length || 0
      });
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Trade Requests</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchData}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Button
          variant={isActive('/admin') ? 'default' : 'outline'}
          className="w-full justify-between"
          onClick={() => navigate('/admin')}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Dashboard
          </div>
          <Badge variant={isActive('/admin') ? 'secondary' : 'default'}>
            {data.tradeRequestsCount}
          </Badge>
        </Button>

        <Button
          variant={isActive('/trade') ? 'default' : 'outline'}
          className="w-full justify-between"
          onClick={() => navigate('/trade')}
        >
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            Trade Requests
          </div>
          <Badge variant={isActive('/trade') ? 'secondary' : 'default'}>
            {data.tradeRequestsCount}
          </Badge>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NavigationMenu;