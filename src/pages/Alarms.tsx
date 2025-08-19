import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  Bell, 
  Volume2, 
  Mail, 
  Phone,
  CheckCircle,
  XCircle,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Alarm {
  id: string;
  type: "emergency" | "high_priority" | "response_time" | "system";
  title: string;
  description: string;
  timestamp: string;
  status: "active" | "acknowledged" | "resolved";
  severity: "critical" | "high" | "medium" | "low";
}

const Alarms = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [alarms, setAlarms] = useState<Alarm[]>([
    {
      id: "1",
      type: "emergency",
      title: "Emergency Service Request",
      description: "Boiler leak at 15 Victoria Road - requires immediate attention",
      timestamp: "2025-01-19T10:30:00Z",
      status: "active",
      severity: "critical"
    },
    {
      id: "2", 
      type: "response_time",
      title: "Response Time Exceeded",
      description: "Request #SR-2025-003 has exceeded 15-minute response target",
      timestamp: "2025-01-19T09:45:00Z",
      status: "acknowledged",
      severity: "high"
    },
    {
      id: "3",
      type: "system",
      title: "WhatsApp Integration Issue",
      description: "Unable to connect to WhatsApp API - checking connection",
      timestamp: "2025-01-19T08:15:00Z",
      status: "resolved",
      severity: "medium"
    }
  ]);

  // Alarm Settings
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "warning";
      case "medium": return "secondary";
      default: return "muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "acknowledged": return <Clock className="w-4 h-4 text-warning" />;
      case "resolved": return <CheckCircle className="w-4 h-4 text-success" />;
      default: return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short", 
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleAcknowledge = (alarmId: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === alarmId 
        ? { ...alarm, status: "acknowledged" as const }
        : alarm
    ));
    toast({
      title: "Alarm Acknowledged",
      description: "The alarm has been marked as acknowledged",
    });
  };

  const handleResolve = (alarmId: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === alarmId 
        ? { ...alarm, status: "resolved" as const }
        : alarm
    ));
    toast({
      title: "Alarm Resolved",
      description: "The alarm has been marked as resolved",
    });
  };

  const handleClearAll = () => {
    setAlarms(prev => prev.map(alarm => ({ ...alarm, status: "resolved" as const })));
    toast({
      title: "All Alarms Cleared",
      description: "All active alarms have been resolved",
    });
  };

  const activeAlarms = alarms.filter(alarm => alarm.status === "active");
  const acknowledgedAlarms = alarms.filter(alarm => alarm.status === "acknowledged");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">System Alarms</h1>
              <p className="text-muted-foreground">Monitor and manage system alerts</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {activeAlarms.length > 0 && (
              <Button variant="outline" onClick={handleClearAll}>
                <XCircle className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alarms List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Alarms */}
            {activeAlarms.length > 0 && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Active Alarms ({activeAlarms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeAlarms.map((alarm) => (
                    <div key={alarm.id} className="bg-card p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(alarm.status)}
                          <h4 className="font-semibold text-foreground">{alarm.title}</h4>
                          <Badge variant={getSeverityColor(alarm.severity) as any}>
                            {alarm.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alarm.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{alarm.description}</p>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledge(alarm.id)}
                        >
                          Acknowledge
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleResolve(alarm.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Acknowledged Alarms */}
            {acknowledgedAlarms.length > 0 && (
              <Card className="border-warning/20 bg-warning/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <Clock className="w-5 h-5" />
                    Acknowledged Alarms ({acknowledgedAlarms.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {acknowledgedAlarms.map((alarm) => (
                    <div key={alarm.id} className="bg-card p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(alarm.status)}
                          <h4 className="font-semibold text-foreground">{alarm.title}</h4>
                          <Badge variant={getSeverityColor(alarm.severity) as any}>
                            {alarm.severity}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(alarm.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{alarm.description}</p>
                      <Button 
                        size="sm"
                        onClick={() => handleResolve(alarm.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recent Resolved Alarms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Recent Resolved Alarms
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alarms.filter(alarm => alarm.status === "resolved").map((alarm) => (
                  <div key={alarm.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(alarm.status)}
                      <span className="text-sm text-muted-foreground">{alarm.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(alarm.timestamp)}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Alarm Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Alarm Settings
                </CardTitle>
                <CardDescription>
                  Configure how you receive alarm notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={emailAlerts}
                    onCheckedChange={setEmailAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="sound-alerts">Sound Alerts</Label>
                  </div>
                  <Switch
                    id="sound-alerts"
                    checked={soundAlerts}
                    onCheckedChange={setSoundAlerts}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <Label htmlFor="emergency-only">Emergency Only</Label>
                  </div>
                  <Switch
                    id="emergency-only"
                    checked={emergencyOnly}
                    onCheckedChange={setEmergencyOnly}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Alarm Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Alarm Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active</span>
                    <span className="font-medium text-destructive">{activeAlarms.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Acknowledged</span>
                    <span className="font-medium text-warning">{acknowledgedAlarms.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Resolved Today</span>
                    <span className="font-medium text-success">
                      {alarms.filter(alarm => alarm.status === "resolved").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alarms;