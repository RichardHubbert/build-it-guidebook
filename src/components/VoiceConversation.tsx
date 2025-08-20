import { useState } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from './ui/button';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';

interface CustomerData {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  preferredTime?: string;
  notes?: string;
}

interface VoiceConversationProps {
  onClose: () => void;
  businessId?: string;
}

export const VoiceConversation = ({ onClose, businessId }: VoiceConversationProps) => {
  console.log('VoiceConversation component mounted');
  const [isConnected, setIsConnected] = useState(false);
  const [customerData, setCustomerData] = useState<CustomerData>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to ElevenLabs');
      setIsConnected(true);
    },
    onDisconnect: () => {
      console.log('Disconnected from ElevenLabs');
      setIsConnected(false);
    },
    onError: (error) => {
      console.error('ElevenLabs error:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to voice service. Please try again.",
        variant: "destructive",
      });
    },
    onMessage: (message) => {
      console.log('Message received:', message);
      // Parse customer data from conversation
      if (message.source === 'ai') {
        parseCustomerData(message.message);
      }
    },
    clientTools: {
      collectCustomerInfo: (parameters: {
        name?: string;
        email?: string;
        phone?: string;
        service?: string;
        preferredTime?: string;
        notes?: string;
      }) => {
        setCustomerData(prev => ({
          ...prev,
          ...parameters
        }));
        console.log('Customer info collected:', parameters);
        return "Customer information saved successfully";
      },
      createServiceRequest: async (parameters: {
        customerName: string;
        phone: string;
        issue: string;
        address: string;
        urgency?: string;
      }) => {
        try {
          const { error } = await supabase
            .from('service_requests')
            .insert({
              customer_name: parameters.customerName,
              phone: parameters.phone,
              issue: parameters.issue,
              address: parameters.address,
              urgency: parameters.urgency || 'Medium',
              business_id: businessId || null,
              status: 'Voice Intake'
            });

          if (error) throw error;

          toast({
            title: "Service Request Created",
            description: `Service request for ${parameters.customerName} has been created successfully.`,
          });

          return "Service request created successfully";
        } catch (error) {
          console.error('Error creating service request:', error);
          return "Failed to create service request";
        }
      },
      scheduleBooking: async (parameters: {
        customerName: string;
        customerEmail: string;
        customerPhone?: string;
        bookingDate: string;
        startTime: string;
        endTime: string;
        partySize?: number;
        specialRequests?: string;
      }) => {
        try {
          const { error } = await supabase
            .from('bookings')
            .insert({
              customer_name: parameters.customerName,
              customer_email: parameters.customerEmail,
              customer_phone: parameters.customerPhone,
              booking_date: parameters.bookingDate,
              start_time: parameters.startTime,
              end_time: parameters.endTime,
              party_size: parameters.partySize || 1,
              special_requests: parameters.specialRequests,
              business_id: businessId || null,
              status: 'confirmed'
            });

          if (error) throw error;

          toast({
            title: "Booking Confirmed",
            description: `Booking for ${parameters.customerName} on ${parameters.bookingDate} has been confirmed.`,
          });

          return "Booking scheduled successfully";
        } catch (error) {
          console.error('Error creating booking:', error);
          return "Failed to schedule booking";
        }
      }
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are a helpful customer service representative for a local business. Your goal is to:
          
          1. Greet customers warmly and ask how you can help them today
          2. Collect their contact information (name, phone, email)
          3. Understand their needs (service requests, bookings, questions)
          4. For service requests: collect issue description, address, urgency level
          5. For bookings: collect preferred date, time, party size, special requests
          6. Use the provided tools to save customer information and create requests
          7. Always confirm the information back to the customer before creating records
          8. Be friendly, professional, and efficient
          
          Remember to use the collectCustomerInfo, createServiceRequest, and scheduleBooking tools when appropriate.`
        },
        firstMessage: "Hello! Thank you for calling. I'm here to help you with any questions or to schedule a service. How can I assist you today?",
        language: "en"
      }
    }
  });

  const parseCustomerData = (text: string) => {
    // Basic parsing logic for customer data
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    const phoneMatch = text.match(/\b\d{3}-?\d{3}-?\d{4}\b/);
    
    if (emailMatch && !customerData.email) {
      setCustomerData(prev => ({ ...prev, email: emailMatch[0] }));
    }
    if (phoneMatch && !customerData.phone) {
      setCustomerData(prev => ({ ...prev, phone: phoneMatch[0] }));
    }
  };

  const startConversation = async () => {
    try {
      setIsLoading(true);
      
      // Get signed URL from our edge function
      const { data, error } = await supabase.functions.invoke('elevenlabs-session', {
        body: { agentId: "agent_5201k1zbeaqxeyzr3sq4edy6pffn" }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get session URL');
      }

      if (!data?.signedUrl) {
        throw new Error('No signed URL returned from server');
      }

      await conversation.startSession({ signedUrl: data.signedUrl });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: "Connection Failed",
        description: "Could not start voice conversation. Please check your configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
      onClose();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Voice Assistant
        </CardTitle>
        <CardDescription>
          Speak with our AI assistant to get help or make a booking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Status:</span>
          <div className="flex items-center gap-2">
            <div 
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            <span className="text-sm">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {/* Voice Indicator */}
        {conversation.isSpeaking && (
          <div className="flex items-center justify-center p-4 bg-primary/10 rounded-lg">
            <div className="flex items-center gap-2 text-primary">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Assistant is speaking...</span>
            </div>
          </div>
        )}

        {/* Customer Data Display */}
        {Object.keys(customerData).length > 0 && (
          <div className="space-y-2 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium">Collected Information:</h4>
            {customerData.name && (
              <p className="text-sm">Name: {customerData.name}</p>
            )}
            {customerData.email && (
              <p className="text-sm">Email: {customerData.email}</p>
            )}
            {customerData.phone && (
              <p className="text-sm">Phone: {customerData.phone}</p>
            )}
            {customerData.service && (
              <p className="text-sm">Service: {customerData.service}</p>
            )}
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex gap-2">
          {!isConnected ? (
            <Button 
              onClick={startConversation} 
              disabled={isLoading}
              className="flex-1"
            >
              <Mic className="w-4 h-4 mr-2" />
              {isLoading ? 'Connecting...' : 'Start Conversation'}
            </Button>
          ) : (
            <Button 
              onClick={endConversation}
              variant="destructive"
              className="flex-1"
            >
              <PhoneOff className="w-4 h-4 mr-2" />
              End Call
            </Button>
          )}
          
          <Button 
            onClick={onClose}
            variant="outline"
          >
            Close
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Allow microphone access when prompted</p>
          <p>• Speak clearly and wait for responses</p>
          <p>• The assistant can help with bookings and service requests</p>
        </div>
      </CardContent>
    </Card>
  );
};