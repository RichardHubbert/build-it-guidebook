import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface N8nTelegramProps {
  isOpen: boolean;
  onClose: () => void;
}

const N8nTelegram = ({ isOpen, onClose }: N8nTelegramProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(
    localStorage.getItem('n8n_telegram_webhook_url') || ''
  );
  const { toast } = useToast();
  
  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    telegram_username: "",
    message: ""
  });

  const handleSaveWebhook = () => {
    localStorage.setItem('n8n_telegram_webhook_url', webhookUrl);
    setShowSettings(false);
    toast({
      title: "Telegram Webhook URL Saved",
      description: "Your n8n Telegram webhook URL has been saved locally.",
    });
  };

  const handleTriggerTelegram = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      setShowSettings(true);
      toast({
        title: "Setup Required",
        description: "Please configure your n8n Telegram webhook URL first.",
        variant: "destructive",
      });
      return;
    }

    if (!customerData.name || !customerData.telegram_username) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and Telegram username.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log("Triggering n8n Telegram webhook:", webhookUrl);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          customer_name: customerData.name,
          customer_phone: customerData.phone || "",
          customer_telegram: customerData.telegram_username,
          customer_message: customerData.message || "Customer wants to start Telegram chat",
          source: "Service Flow Trade",
          triggered_from: window.location.origin,
        }),
      });

      toast({
        title: "Telegram Request Sent",
        description: "Your request has been sent to our automation system. You should receive a Telegram message shortly.",
      });

      // Reset form and close
      setCustomerData({ name: "", phone: "", telegram_username: "", message: "" });
      onClose();

    } catch (error) {
      console.error("Error triggering n8n Telegram webhook:", error);
      toast({
        title: "Error",
        description: "Failed to trigger the automation. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showSettings) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Configure n8n Telegram Webhook
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telegramWebhookUrl">n8n Telegram Webhook URL</Label>
              <Input
                id="telegramWebhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-n8n-instance.com/webhook/telegram..."
                type="url"
              />
              <p className="text-xs text-muted-foreground">
                Enter your n8n webhook URL to enable Telegram automation
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowSettings(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveWebhook}
                className="flex-1"
                disabled={!webhookUrl}
              >
                Save & Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-500" />
            Start Telegram Chat
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="ml-auto"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleTriggerTelegram} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Your Name *</Label>
            <Input
              id="customerName"
              value={customerData.name}
              onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telegramUsername">Telegram Username *</Label>
            <Input
              id="telegramUsername"
              value={customerData.telegram_username}
              onChange={(e) => setCustomerData({ ...customerData, telegram_username: e.target.value })}
              placeholder="@yourusername"
              required
            />
            <p className="text-xs text-muted-foreground">
              Your Telegram username (with @)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Phone Number</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={customerData.phone}
              onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
              placeholder="e.g. +44 7700 900123"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerMessage">Initial Message</Label>
            <Textarea
              id="customerMessage"
              value={customerData.message}
              onChange={(e) => setCustomerData({ ...customerData, message: e.target.value })}
              placeholder="Tell us what you need help with..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Start Chat
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default N8nTelegram;