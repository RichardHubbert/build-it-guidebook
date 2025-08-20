import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceRequestForm = ({ isOpen, onClose }: ServiceRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    issue: "",
    address: "",
    urgency: "Medium"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phone || !formData.issue || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('service_requests')
        .insert({
          customer_name: formData.customerName,
          phone: formData.phone,
          issue: formData.issue,
          address: formData.address,
          urgency: formData.urgency,
          status: 'Voice Intake'
        });

      if (error) throw error;

      toast({
        title: "Service Request Created",
        description: "Your request has been submitted. We'll contact you shortly via WhatsApp.",
      });

      // Reset form and close dialog
      setFormData({
        customerName: "",
        phone: "",
        issue: "",
        address: "",
        urgency: "Medium"
      });
      onClose();

      // Redirect to WhatsApp with the issue details
      const whatsappMessage = `Hi, I've just submitted a service request for: ${formData.issue}. My name is ${formData.customerName} and my phone is ${formData.phone}.`;
      window.open(`https://wa.me/447700900456?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
      
    } catch (error) {
      console.error('Error creating service request:', error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-success" />
            Service Request Details
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 07700 900123"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue">Issue Description *</Label>
            <Textarea
              id="issue"
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              placeholder="Describe the problem you're experiencing..."
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Full address where service is needed..."
              className="min-h-[60px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Priority Level</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => setFormData({ ...formData, urgency: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low - Can wait a few days</SelectItem>
                <SelectItem value="Medium">Medium - Within 24 hours</SelectItem>
                <SelectItem value="High">High - Today preferred</SelectItem>
                <SelectItem value="Emergency">Emergency - Urgent attention needed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Continue to WhatsApp
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestForm;