import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Clock, Shield, Calendar, Send } from "lucide-react";
import N8nWhatsApp from "@/components/N8nWhatsApp";
import N8nTelegram from "@/components/N8nTelegram";
import BookingForm from "@/components/BookingForm";

const CustomerLanding = () => {
  const [isWhatsAppFormOpen, setIsWhatsAppFormOpen] = useState(false);
  const [isTelegramFormOpen, setIsTelegramFormOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  const handleWhatsAppClick = () => {
    setIsWhatsAppFormOpen(true);
  };

  const handleTelegramClick = () => {
    setIsTelegramFormOpen(true);
  };

  const handleBookingClick = () => {
    setIsBookingFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-2xl shadow-glow p-8 text-center">
        {/* Company Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ServiceFlow AI</h1>
          <p className="text-muted-foreground">Get instant help or book an appointment</p>
        </div>

        {/* Main Action Buttons */}
        <div className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">How would you like to get help?</h2>
            <p className="text-muted-foreground text-sm">
              Start a conversation via WhatsApp or Telegram, or book a scheduled appointment
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-success hover:bg-success/90 text-success-foreground py-4 text-lg font-semibold rounded-xl shadow-medium transition-all hover:shadow-glow hover:scale-105"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Start WhatsApp Chat
            </Button>

            {/* Telegram Button */}
            <Button
              onClick={handleTelegramClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 text-lg font-semibold rounded-xl shadow-medium transition-all hover:shadow-glow hover:scale-105"
            >
              <Send className="w-6 h-6 mr-3" />
              Start Telegram Chat
            </Button>

            {/* Booking Button */}
            <Button
              onClick={handleBookingClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg font-semibold rounded-xl shadow-medium transition-all hover:shadow-glow hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Appointment
            </Button>
          </div>
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
      
      <N8nWhatsApp 
        isOpen={isWhatsAppFormOpen} 
        onClose={() => setIsWhatsAppFormOpen(false)} 
      />
      
      <N8nTelegram 
        isOpen={isTelegramFormOpen} 
        onClose={() => setIsTelegramFormOpen(false)} 
      />
      
      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={() => setIsBookingFormOpen(false)} 
      />
    </div>
  );
};

export default CustomerLanding;