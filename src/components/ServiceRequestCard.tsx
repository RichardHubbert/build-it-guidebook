import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, PoundSterling, User, Phone } from "lucide-react";

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

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

const ServiceRequestCard = ({ request }: ServiceRequestCardProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Emergency": return "destructive";
      case "High": return "warning";
      case "Medium": return "secondary";
      default: return "muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "In Progress": return "primary";
      case "Scheduled": return "secondary";
      case "Pending Payment": return "warning";
      default: return "muted";
    }
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-300 hover:-translate-y-1 bg-gradient-glass backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">{request.customer}</h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="w-3 h-3" />
              <span>{request.phone}</span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <Badge variant={getUrgencyColor(request.urgency) as any}>
              {request.urgency}
            </Badge>
            <Badge variant={getStatusColor(request.status) as any}>
              {request.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-foreground mb-1">Issue</h4>
          <p className="text-sm text-muted-foreground">{request.issue}</p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{request.address}</span>
        </div>
        
        {request.scheduledTime && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Scheduled: {request.scheduledTime}</span>
          </div>
        )}
        
        {request.estimatedCost && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <PoundSterling className="w-4 h-4" />
            <span>Est. £{request.estimatedCost}</span>
          </div>
        )}
        
        {request.technicianZone && (
          <div className="text-xs text-muted-foreground">
            Zone: {request.technicianZone}
          </div>
        )}
        
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Update Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestCard;