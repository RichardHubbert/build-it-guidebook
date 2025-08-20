import { useEffect, useRef } from 'react';

interface ElevenLabsWidgetProps {
  agentId: string;
}

const ElevenLabsWidget = ({ agentId }: ElevenLabsWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for the widget script to load
    const checkAndMoveWidget = () => {
      const widget = document.querySelector('elevenlabs-convai') as HTMLElement;
      const widgetContainer = document.querySelector('[data-elevenlabs-widget]') as HTMLElement;
      
      if (widget && containerRef.current) {
        // Try to move the widget to our container
        containerRef.current.appendChild(widget);
        
        // Override any positioning styles
        widget.style.position = 'static';
        widget.style.bottom = 'auto';
        widget.style.right = 'auto';
        widget.style.width = '100%';
        widget.style.height = '100%';
      } else if (widgetContainer && containerRef.current) {
        containerRef.current.appendChild(widgetContainer);
        
        widgetContainer.style.position = 'static';
        widgetContainer.style.bottom = 'auto';
        widgetContainer.style.right = 'auto';
        widgetContainer.style.width = '100%';
        widgetContainer.style.height = '100%';
      }
    };

    // Check multiple times as the widget might load asynchronously
    const timeouts = [100, 500, 1000, 2000];
    timeouts.forEach(delay => {
      setTimeout(checkAndMoveWidget, delay);
    });

    // Also try on window load
    window.addEventListener('load', checkAndMoveWidget);

    return () => {
      window.removeEventListener('load', checkAndMoveWidget);
    };
  }, [agentId]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
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