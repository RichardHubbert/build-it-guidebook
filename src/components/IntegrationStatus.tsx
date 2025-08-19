import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mic, 
  Calendar, 
  CreditCard, 
  FileText, 
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const IntegrationStatus = () => {
  const integrations = [
    {
      name: "Voice Agent",
      description: "Vapi + ElevenLabs",
      status: "connected",
      icon: <Mic className="w-5 h-5" />,
      color: "success"
    },
    {
      name: "Calendar System",
      description: "Google/Jobber/Housecall Pro",
      status: "connected",
      icon: <Calendar className="w-5 h-5" />,
      color: "success"
    },
    {
      name: "Payment Processing",
      description: "Stripe Integration",
      status: "setup-required",
      icon: <CreditCard className="w-5 h-5" />,
      color: "warning"
    },
    {
      name: "CRM/Ticketing",
      description: "Job Management System",
      status: "connected",
      icon: <FileText className="w-5 h-5" />,
      color: "success"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "setup-required":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="success">Connected</Badge>;
      case "setup-required":
        return <Badge variant="warning">Setup Required</Badge>;
      default:
        return <Badge variant="muted">Disconnected</Badge>;
    }
  };

  return (
    <Card className="bg-gradient-glass backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>System Integrations</span>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  {integration.icon}
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(integration.status)}
                {getStatusBadge(integration.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationStatus;