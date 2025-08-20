import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Clock, Shield } from "lucide-react";
import ServiceRequestForm from "@/components/ServiceRequestForm";

const CustomerLanding = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleWhatsAppClick = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-glow p-8 text-center">
        {/* Company Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ServiceFlow AI</h1>
          <p className="text-muted-foreground">Get instant help via WhatsApp</p>
        </div>

        {/* Main WhatsApp CTA */}
        <div className="mb-8">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-success rounded-full flex items-center justify-center mb-4 animate-pulse-glow">
              <MessageCircle className="w-10 h-10 text-success-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Need Service?</h2>
            <p className="text-muted-foreground text-sm">
              Chat with us on WhatsApp for instant support and scheduling
            </p>
          </div>

          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-success hover:bg-success/90 text-success-foreground py-4 text-lg font-semibold rounded-xl shadow-medium transition-all hover:shadow-glow hover:scale-105"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Start WhatsApp Chat
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">24/7 instant response</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">Voice messages supported</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <span className="text-muted-foreground">Secure and private</span>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-3">
            Emergency? Call us directly
          </p>
          <Button
            variant="outline"
            className="w-full mb-4"
            onClick={() => window.open("tel:+447700900456")}
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </Button>
          
          {/* Admin Access Link */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => window.location.href = "/auth"}
            >
              Admin Access
            </Button>
          </div>
        </div>
      </div>
      
      <ServiceRequestForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default CustomerLanding;