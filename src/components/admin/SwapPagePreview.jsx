import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

function SwapPagePreview() {
  const [resolution, setResolution] = useState('desktop');
  const [swapPageSettings, setSwapPageSettings] = useState({
    title_text: "Scan the QR code to download your AI avatar",
    title_color: "#FFFFFF",
    title_font_size: 24,
    button_color: "#8b5cf6",
    qr_border_color: "#e11d48",
    background_image: "",
    image_width: 40,
    show_print_button: true
  });
  
  // Sample result image URL for preview
  const sampleImageUrl = "https://placehold.co/400x600/png";

  useEffect(() => {
    const fetchSwapPageSettings = async () => {
      const { data } = await supabase
        .from('swap_page_settings')
        .select('*')
        .single();
      if (data) {
        setSwapPageSettings(data);
      }
    };
    fetchSwapPageSettings();
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
      backgroundImage: swapPageSettings?.background_image ? `url(${swapPageSettings.background_image})` : 'none',
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
        <div className="relative overflow-hidden shadow-xl"
          style={getContainerStyle()}
        >
          {resolution === 'desktop' ? (
            // Desktop layout (landscape)
            <div className="flex flex-row items-center justify-between w-full h-full p-8 gap-20">
              {/* Left side - Image with dynamic width */}
              <div style={{ width: `${swapPageSettings?.image_width || 40}%` }}>
                <img
                  src={sampleImageUrl}
                  alt="Result Preview"
                  className="w-full"
                />
              </div>

              {/* Right side - QR code, text, and button */}
              <div className="flex-1 flex flex-col items-center justify-center self-center gap-8">
                <h1 
                  className="font-bold text-center w-full leading-tight"
                  style={{ 
                    color: swapPageSettings?.title_color || "#FFFFFF",
                    fontSize: `${swapPageSettings?.title_font_size || 24}px`
                  }}
                >
                  {swapPageSettings?.title_text || "Scan the QR code to download your AI avatar"}
                </h1>
                
                {/* QR Code */}
                <div 
                  className="bg-white p-6 shadow-lg mt-4"
                  style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
                    borderColor: swapPageSettings?.qr_border_color || "#e11d48"
                  }}
                >
                  <QRCodeSVG value={sampleImageUrl} size={150} />
                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center gap-5 mt-6 w-full">
                  {/* Print button with conditional rendering */}
                  {swapPageSettings?.show_print_button !== false && (
                    <button
                      type="button"
                      className="text-white w-full max-w-[314px] px-8 py-4 text-xl font-bold rounded-3xl"
                      style={{ backgroundColor: swapPageSettings?.button_color || "#8b5cf6" }}
                    >
                      Print
                    </button>
                  )}

                  <button
                    className="text-white w-full max-w-[314px] py-4 text-xl font-bold rounded-3xl"
                    style={{ backgroundColor: swapPageSettings?.button_color || "#8b5cf6" }}
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
                className="w-full max-w-[712px]"
              />
              
              <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-6">
                <div 
                  className="bg-white p-4"
                  style={{
                    borderWidth: '8px',
                    borderStyle: 'solid',
                    borderColor: swapPageSettings?.qr_border_color || "#e11d48"
                  }}
                >
                  <QRCodeSVG value={sampleImageUrl} size={100} />
                </div>
                
                <div className="flex flex-col items-center">
                  <h1 
                    className="mb-4 font-semibold text-center"
                    style={{ 
                      color: swapPageSettings?.title_color || "#FFFFFF",
                      fontSize: `${(swapPageSettings?.title_font_size || 24) * 0.8}px`
                    }}
                  >
                    {swapPageSettings?.title_text || "Scan the QR code to download your AI avatar"}
                  </h1>

                  <div className="flex flex-col items-center gap-3">
                    {/* Print button with conditional rendering */}
                    {swapPageSettings?.show_print_button !== false && (
                      <button
                        type="button"
                        className="text-white w-[200px] px-6 py-2 text-lg font-bold rounded-3xl"
                        style={{ backgroundColor: swapPageSettings?.button_color || "#8b5cf6" }}
                      >
                        Print
                      </button>
                    )}

                    <button
                      className="text-white w-[200px] py-2 text-lg font-bold rounded-3xl"
                      style={{ backgroundColor: swapPageSettings?.button_color || "#8b5cf6" }}
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