import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  CheckCircle, 
  CreditCard, 
  FileText, 
  MessageSquare,
  Mic,
  Camera
} from "lucide-react";

const WorkflowVisualization = () => {
  const workflowSteps = [
    {
      id: 1,
      title: "Voice Intake",
      description: "Customer reports: \"Water heater is leaking\"",
      icon: <Mic className="w-5 h-5" />,
      status: "completed",
      component: "Voice Agent (Vapi + ElevenLabs)"
    },
    {
      id: 2,
      title: "Urgency Assessment",
      description: "Emergency check + address + photos via SMS",
      icon: <AlertTriangle className="w-5 h-5" />,
      status: "completed",
      component: "Voice Agent"
    },
    {
      id: 3,
      title: "Slot Query",
      description: "Query next available slot by zone/tech",
      icon: <Calendar className="w-5 h-5" />,
      status: "active",
      component: "Calendar Integration"
    },
    {
      id: 4,
      title: "Present Options",
      description: "Show available time slots to customer",
      icon: <Clock className="w-5 h-5" />,
      status: "pending",
      component: "Calendar"
    },
    {
      id: 5,
      title: "Booking Confirmation",
      description: "Offer earliest window + customer accepts",
      icon: <CheckCircle className="w-5 h-5" />,
      status: "pending",
      component: "Voice Agent"
    },
    {
      id: 6,
      title: "Optional Deposit",
      description: "Take deposit if required",
      icon: <CreditCard className="w-5 h-5" />,
      status: "pending",
      component: "Payments (Stripe)"
    },
    {
      id: 7,
      title: "Job Creation",
      description: "Create job ticket + attach photos",
      icon: <FileText className="w-5 h-5" />,
      status: "pending",
      component: "CRM/Ticketing"
    },
    {
      id: 8,
      title: "SMS Confirmation",
      description: "Send confirmation + prep instructions",
      icon: <MessageSquare className="w-5 h-5" />,
      status: "pending",
      component: "SMS Service"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "active": return "primary";
      case "pending": return "muted";
      default: return "muted";
    }
  };

  return (
    <Card className="bg-gradient-glass backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary-foreground" />
          </div>
          <span>Service Request Workflow</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-success text-success-foreground' :
                  step.status === 'active' ? 'bg-primary text-primary-foreground animate-pulse-glow' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {step.icon}
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className={`w-0.5 h-8 mt-2 ${
                    step.status === 'completed' ? 'bg-success' :
                    step.status === 'active' ? 'bg-primary' :
                    'bg-border'
                  }`} />
                )}
              </div>
              
              <div className="flex-1 pb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <Badge variant={getStatusColor(step.status) as any} className="text-xs">
                    {step.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                <p className="text-xs text-muted-foreground italic">{step.component}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowVisualization;