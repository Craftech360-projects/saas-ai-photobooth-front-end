import { useState } from 'react';
import { UserForm } from '../forms/UserForm';

export function PhotoboothPreview({ settings }) {
  const [resolution, setResolution] = useState('desktop');
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome' or 'form'
  
  // Mock functions
  const handleSubmit = (data) => {
    console.log("Form submitted in preview:", data);
    setCurrentStep('processing');
  };

  const handleStartClick = () => {
    if (settings.enable_data_collection) {
      setCurrentStep('form');
    } else {
      setCurrentStep('processing');
    }
  };

  // Calculate position style based on form_position
  const getPositionStyle = () => {
    switch(settings.form_position) {
      case 'top':
        return { top: '10%' };
      case 'bottom':
        return { bottom: '10%' };
      case 'custom':
        return { top: `${settings.form_position_percent}%` };
      case 'middle':
      default:
        return { top: '50%', transform: 'translateY(-50%) translateX(-50%)' };
    }
  };

  // Get container style based on selected resolution
  const getContainerStyle = () => {
    const baseStyle = {
      transition: 'width 0.3s, height 0.3s',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
    
    switch(resolution) {
      case 'mobile':
        return { ...baseStyle, width: '375px', height: '667px' };
      case 'tablet':
        return { ...baseStyle, width: '768px', height: '1024px' };
      case 'desktop-vertical':
        return { 
          ...baseStyle, 
          width: '540px',
          height: '960px',
          maxWidth: '100%', 
          maxHeight: '90vh'
        };
      case 'desktop':
      default:
        return { 
          ...baseStyle, 
          width: '960px', 
          height: '540px', 
          maxWidth: '100%', 
          maxHeight: '90vh' 
        };
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="bg-gray-800 p-2 flex items-center justify-between">
        <div className="text-white text-sm">Preview Resolution:</div>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'mobile' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('mobile')}
          >
            Mobile (375×667)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'tablet' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('tablet')}
          >
            Tablet (768×1024)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'desktop' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('desktop')}
          >
            Desktop (Full)
          </button>
          <button 
            className={`px-3 py-1 text-xs rounded ${resolution === 'desktop-vertical' ? 'bg-violet-600 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setResolution('desktop-vertical')}
          >
            Desktop (vertical)
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gray-700 overflow-auto p-8">
        <div 
          className="bg-gray-100 relative overflow-hidden shadow-xl"
          style={{
            ...getContainerStyle(),
            backgroundImage: currentStep === 'form' && settings?.userForm_background_url 
              ? `url(${settings.userForm_background_url})` 
              : settings?.background_url 
                ? `url(${settings.background_url})` 
                : 'none',
          }}
        >
          {/* Preview step controls */}
          <div className="absolute top-2 right-2 z-50 bg-gray-800 bg-opacity-70 rounded-md p-1 flex space-x-1">
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'welcome' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('welcome')}
            >
              Welcome
            </button>
            {settings.enable_data_collection && (
              <button 
                className={`px-2 py-1 text-xs rounded ${currentStep === 'form' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
                onClick={() => setCurrentStep('form')}
              >
                Form
              </button>
            )}
            <button 
              className={`px-2 py-1 text-xs rounded ${currentStep === 'processing' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-200'}`}
              onClick={() => setCurrentStep('processing')}
            >
              Processing
            </button>
          </div>
          
      
          
          {/* Welcome screen */}
      
          {currentStep === 'welcome' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <h1 
                className={`font-${settings.start_title_font_weight || 'bold'} mb-6 text-center`}
                style={{
                  fontSize: settings.start_title_font_size ? `${settings.start_title_font_size}rem` : '2.5rem',
                  color: settings.start_title_color || '#000000',
                  marginBottom: settings.start_title_margin_bottom ? `${settings.start_title_margin_bottom}px` : '1.5rem'
                }}
              >
                {settings.app_title || "AI Photobooth"}
              </h1>
              <p 
                className="text-center"
                style={{
                  fontSize: settings.start_message_font_size ? `${settings.start_message_font_size}rem` : '1.25rem',
                  color: settings.start_message_color || '#000000',
                  marginBottom: settings.start_message_margin_bottom ? `${settings.start_message_margin_bottom}px` : '2rem'
                }}
              >
                {settings.welcome_message || "Welcome to the AI Photobooth!"}
              </p>
              
              <button
                className="px-8 py-3 text-white rounded-md shadow-lg"
                style={{
                  backgroundColor: settings.button_style?.backgroundColor || '#8b5cf6',
                  width: settings.button_style?.width || '312px',
                  height: settings.button_style?.height || '86px',
                  borderRadius: settings.button_style?.borderRadius || '8px',
                  backgroundImage: settings.start_button_background ? `url(${settings.start_button_background})` : 'none',
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={handleStartClick}
              >
                {settings.start_button_text || "Start"}
              </button>
            </div>
          )}
          
          {/* User form overlay */}
          {currentStep === 'form' && (
            <UserForm
              onSubmit={handleSubmit}
              requireName={settings.require_name}
              requireEmail={settings.enable_email_collection}
              position={settings.form_position}
              style={getPositionStyle()}
              formFields={settings.custom_form_fields || []}
              formTitle={settings.form_title}
              buttonText={settings.button_text}
              buttonStyle={settings.button_style || {}}
              formStyle={settings.form_style || {}}
              buttonBackgroundUrl={settings.continue_button_background}
            />
          )}
          
          {/* Processing screen */}
          {currentStep === 'processing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gray-100">
              <div className="text-2xl font-bold mb-4">Processing...</div>
              <div className="w-16 h-16 border-t-4 border-violet-600 border-solid rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Your photo is being generated</p>
              <button 
                className="mt-8 px-4 py-2 bg-gray-200 text-gray-700 rounded"
                onClick={() => setCurrentStep('welcome')}
              >
                Reset Preview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}