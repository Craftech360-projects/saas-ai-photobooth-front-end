import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { getActiveBackgrounds } from '../../services/backgroundService';
import { supabase } from '../../supabaseClient';

function SwapPagePreview() {
  const [resolution, setResolution] = useState('desktop');
  const [swapPageSettings, setSwapPageSettings] = useState({
    title_text: "Scan the QR code to download your AI avatar",
    title_color: "#FFFFFF",
    title_font_size: 24,
    button_color: "#8b5cf6",
    qr_border_color: "#e11d48",
    image_width: 40,
    show_print_button: true
  });
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  // Sample image URL for preview
  const sampleImageUrl = "https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nimhans/nimhans/1740565316686-result.jpg";

  useEffect(() => {
    const fetchSettings = async () => {
      // Fetch swap page settings
      const { data } = await supabase
        .from('swap_page_settings')
        .select('*')
        .single();
      if (data) {
        setSwapPageSettings(data);
      }
      
      // Fetch active backgrounds
      const backgrounds = await getActiveBackgrounds();
      const userFormBg = backgrounds.find(bg => bg.name === 'userForm' && bg.is_active);
      if (userFormBg) {
        setBackgroundImage(userFormBg.url);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const handleSwapSettingsUpdate = (e) => {
      setSwapPageSettings(e.detail.settings);
      console.log("Preview updated with swap settings:", e.detail.settings);
    };
  
    window.addEventListener('swapSettingsUpdated', handleSwapSettingsUpdate);
  
    return () => {
      window.removeEventListener('swapSettingsUpdated', handleSwapSettingsUpdate);
    };
  }, []);

  // Get container style based on selected resolution
  const getContainerStyle = () => {
    const baseStyle = {
      transition: 'width 0.3s, height 0.3s',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundColor: '#1f2937' // Default dark background if no image
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

  // Calculate scaled font sizes based on resolution
  const getScaledFontSize = (baseFontSize) => {
    switch(resolution) {
      case 'mobile':
        return baseFontSize * 0.6;
      case 'tablet':
        return baseFontSize * 0.7;
      case 'desktop-vertical':
        return baseFontSize * 0.8;
      case 'desktop':
      default:
        return baseFontSize;
    }
  };

  // Calculate QR code size based on resolution
  const getQRCodeSize = () => {
    switch(resolution) {
      case 'mobile':
        return 80;
      case 'tablet':
        return 100;
      case 'desktop-vertical':
        return 120;
      case 'desktop':
      default:
        return 150;
    }
  };
  // Get button width based on resolution and container size
  const getButtonWidth = () => {
    const containerWidth = (() => {
      switch(resolution) {
        case 'mobile':
          return 375;
        case 'tablet':
          return 768;
        case 'desktop-vertical':
          return 540;
        case 'desktop':
        default:
          return 960;
      }
    })();

    // Calculate button width as a percentage of container width
    const baseWidth = Math.min(containerWidth * 0.3, 300); // 30% of container width, max 300px
    
    switch(resolution) {
      case 'mobile':
        return `${Math.min(baseWidth, 200)}px`;
      case 'tablet':
        return `${Math.min(baseWidth, 250)}px`;
      case 'desktop-vertical':
      case 'desktop':
      default:
        return `${Math.min(baseWidth, 300)}px`;
    }
  };

  // Get button padding based on resolution
  const getButtonPadding = () => {
    switch(resolution) {
      case 'mobile':
        return 'px-4 py-2';
      case 'tablet':
        return 'px-5 py-2.5';
      case 'desktop-vertical':
      case 'desktop':
      default:
        return 'px-6 py-3';
    }
  };

  // Update button styles in desktop layout
  {/* Print button with conditional rendering */}
  {swapPageSettings?.show_print_button !== false && (
    <button
      type="button"
      className={`text-white font-bold rounded-3xl hover:bg-opacity-90 transition-colors ${getButtonPadding()}`}
      style={{ 
        backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
        fontSize: `${getScaledFontSize(24)}px`,
        width: getButtonWidth()
      }}
    >
      Print
    </button>
  )}

  <button
    className={`text-white font-bold rounded-3xl hover:bg-opacity-90 transition-colors ${getButtonPadding()}`}
    style={{ 
      backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
      fontSize: `${getScaledFontSize(24)}px`,
      width: getButtonWidth()
    }}
  >
    RESTART
  </button>
  return (
    <div className="w-full h-full flex flex-col">
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
        <div className="relative overflow-hidden"
          style={getContainerStyle()}
        >
          {resolution === 'desktop' ? (
            // Desktop layout (landscape)
            <div className="flex flex-row items-center justify-center w-full h-full p-4 ">
              {/* Left side - Image with dynamic width */}
              <div style={{ 
                width: `${swapPageSettings?.image_width || 40}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                height: '90%',
                overflow: 'hidden',
                marginTop: '5%',
              }}>
                <img
                  src={sampleImageUrl}                  
                  alt="Result Preview"
                  className="w-full object-contain"
                  style={{ maxHeight: '90%', maxWidth: '100%' }}
                />
              </div>

              {/* Right side - QR code, text, and button */}
              <div className="flex-1 flex flex-col items-center justify-end gap-3">
                <h1 
                  className="font-bold text-center w-full leading-tight"
                  style={{ 
                    color: swapPageSettings?.title_color || "#FFFFFF",
                    fontSize: `${getScaledFontSize(swapPageSettings?.title_font_size || 24)}px`
                  }}
                >
                  {swapPageSettings?.title_text || "Scan the QR code to download your AI avatar"}
                </h1>
                
                {/* QR Code */}
                <div 
                  className="bg-white p-3 shadow-lg"
                  style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
                    borderColor: swapPageSettings?.qr_border_color || "#e11d48"
                  }}
                >
                  <QRCodeSVG value={sampleImageUrl} size={getQRCodeSize()} />
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center gap-3 mt-4 w-full">
                  {/* Print button with conditional rendering */}
                  {swapPageSettings?.show_print_button !== false && (
                    <button
                      type="button"
                      className="text-white px-6 py-3 font-bold rounded-3xl hover:bg-opacity-90 transition-colors"
                      style={{ 
                        backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
                        fontSize: `${getScaledFontSize(24)}px`,
                        width: getButtonWidth()
                      }}
                    >
                      Print
                    </button>
                  )}

                  <button
                    className="text-white py-3 font-bold rounded-3xl hover:bg-opacity-90 transition-colors"
                    style={{ 
                      backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
                      fontSize: `${getScaledFontSize(24)}px`,
                      width: getButtonWidth()
                    }}
                  >
                    RESTART
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Mobile/tablet layout (portrait)
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
              <img
                src={sampleImageUrl}
                alt="Result Preview"
                className="w-full object-contain max-h-[50vh] animate__animated animate__zoomIn"
                style={{ maxWidth: '100%' }}
              />
              
              <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-6">
                <div 
                  className="bg-white p-3"
                  style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
                    borderColor: swapPageSettings?.qr_border_color || "#e11d48"
                  }}
                >
                  <QRCodeSVG value={sampleImageUrl} size={resolution === 'mobile' ? 80 : 100} />
                </div>
                
                <div className="flex flex-col items-center">
                  <h1 
                    className="mb-4 font-semibold text-center"
                    style={{ 
                      color: swapPageSettings?.title_color || "#FFFFFF",
                      fontSize: `${getScaledFontSize(swapPageSettings?.title_font_size || 24)}px`
                    }}
                  >
                    {swapPageSettings?.title_text || "Scan the QR code to download your AI avatar"}
                  </h1>

                  <div className="flex flex-col items-center gap-3">
                    {/* Print button with conditional rendering */}
                    {swapPageSettings?.show_print_button !== false && (
                      <button
                        type="button"
                        className="text-white px-6 py-2 font-bold rounded-3xl hover:bg-opacity-90 transition-colors"
                        style={{ 
                          backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
                          fontSize: `${getScaledFontSize(20)}px`,
                          width: getButtonWidth()
                        }}
                      >
                        Print
                      </button>
                    )}

                    <button
                      className="text-white py-2 font-bold rounded-3xl hover:bg-opacity-90 transition-colors"
                      style={{ 
                        backgroundColor: swapPageSettings?.button_color || "#8b5cf6",
                        fontSize: `${getScaledFontSize(20)}px`,
                        width: getButtonWidth()
                      }}
                    >
                      RESTART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SwapPagePreview;