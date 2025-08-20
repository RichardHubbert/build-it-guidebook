import { useEffect, useRef } from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
}

const ElevenLabsWidget = ({ agentId }: ElevenLabsWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add CSS to override ElevenLabs widget positioning
    const style = document.createElement('style');
    style.textContent = `
      elevenlabs-convai {
        position: static !important;
        bottom: auto !important;
        right: auto !important;
        left: auto !important;
        top: auto !important;
        transform: none !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        z-index: auto !important;
      }
      
      elevenlabs-convai > * {
        position: relative !important;
        width: 100% !important;
        height: 100% !important;
      }
      
      [data-elevenlabs-widget] {
        position: static !important;
        bottom: auto !important;
        right: auto !important;
        left: auto !important;
        top: auto !important;
        transform: none !important;
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        max-height: none !important;
        z-index: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Also try to force move and style the widget
    const checkAndMoveWidget = () => {
      const widget = document.querySelector('elevenlabs-convai') as HTMLElement;
      
      if (widget && containerRef.current) {
        // Force move the widget to our container
        containerRef.current.appendChild(widget);
        
        // Override all positioning styles with !important
        widget.style.setProperty('position', 'static', 'important');
        widget.style.setProperty('bottom', 'auto', 'important');
        widget.style.setProperty('right', 'auto', 'important');
        widget.style.setProperty('left', 'auto', 'important');
        widget.style.setProperty('top', 'auto', 'important');
        widget.style.setProperty('transform', 'none', 'important');
        widget.style.setProperty('width', '100%', 'important');
        widget.style.setProperty('height', '100%', 'important');
        widget.style.setProperty('z-index', 'auto', 'important');
      }
    };

    // Check multiple times as the widget might load asynchronously
    const timeouts = [100, 500, 1000, 2000, 5000];
    timeouts.forEach(delay => {
      setTimeout(checkAndMoveWidget, delay);
    });

    // Also check periodically for a bit to catch late loading
    const interval = setInterval(checkAndMoveWidget, 1000);
    setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, [agentId]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative"
      style={{ minHeight: '200px' }}
    >
      <div 
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
        }}
      />
    </div>
  );
};

export default ElevenLabsWidget;