import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Clock, Shield, Calendar, Send, Mic } from "lucide-react";
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

  const handleVoiceClick = () => {
    // Show the ElevenLabs widget
    const widget = document.querySelector('elevenlabs-convai') as any;
    if (widget) {
      widget.show();
    }
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
            <h2 className="text-xl font-semibold text-foreground mb-2">Talk to our AI Assistant</h2>
            <p className="text-muted-foreground text-sm">
              Start a voice conversation with our AI assistant for instant help
            </p>
          </div>

          {/* ElevenLabs ConvAI Widget - Main Feature */}
          <div className="mb-6 p-6 bg-primary/5 rounded-2xl border border-primary/30 min-h-[200px] flex items-center justify-center">
            <div 
              dangerouslySetInnerHTML={{
                __html: '<elevenlabs-convai agent-id="agent_5201k1zbeaqxeyzr3sq4edy6pffn"></elevenlabs-convai>'
              }}
            />
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">Or choose another option below</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              variant="outline"
              className="w-full py-3 text-base font-medium rounded-xl"
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Start WhatsApp Chat
            </Button>

            {/* Telegram Button */}
            <Button
              onClick={handleTelegramClick}
              variant="outline"
              className="w-full py-3 text-base font-medium rounded-xl"
            >
              <Send className="w-5 h-5 mr-3" />
              Start Telegram Chat
            </Button>

            {/* Booking Button */}
            <Button
              onClick={handleBookingClick}
              variant="outline"
              className="w-full py-3 text-base font-medium rounded-xl"
            >
              <Calendar className="w-5 h-5 mr-3" />
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