import { QRCodeSVG } from "qrcode.react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
import LoadingPage from "./LoadingPage";
import { getActiveBackgrounds } from "./services/backgroundService";
import { supabase } from "./supabaseClient";

function Swap() {
  const navigate = useNavigate();
  const location = useLocation();
  const sourceImageBlob = location.state?.sourceImage;
  const selectedImage = location.state?.selectedImage;
  const userDetails = location.state?.userDetails;
  const [loading, setLoading] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState("https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nimhans/nimhans/1740565316686-result.jpg");
  const [error, setError] = useState(null);
  const printRef = useRef();
  
  // Add state for swap page settings
  const [swapPageSettings, setSwapPageSettings] = useState({
    title_text: "Scan the QR code to download your AI avatar",
    title_color: "#FFFFFF",
    title_font_size: 24,
    button_color: "#8b5cf6",
    qr_border_color: "#e11d48",
    image_width: 40,
    show_print_button: true,
    desktop_layout: "row",
    print_button_text: "PRINT",
    restart_button_text: "RESTART",
    button_text_color: "#FFFFFF",
    button_font_size: 24,
    button_background: "",
    button_height: 86,
    button_width: 314
  });
  
  // Add state for background image
  const [backgroundImage, setBackgroundImage] = useState(null);
  
  // Fetch swap page settings and background image
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch swap page settings
        const { data, error } = await supabase
          .from('swap_page_settings')
          .select('*')
          .order('id', { ascending: true })
          .limit(1)
          .maybeSingle();
          
        if (error) throw error;
        
        if (data) {
          setSwapPageSettings({
            title_text: data.title_text || swapPageSettings.title_text,
            title_color: data.title_color || swapPageSettings.title_color,
            title_font_size: data.title_font_size || swapPageSettings.title_font_size,
            button_color: data.button_color || swapPageSettings.button_color,
            qr_border_color: data.qr_border_color || swapPageSettings.qr_border_color,
            image_width: data.image_width || swapPageSettings.image_width,
            show_print_button: data.show_print_button !== false,
            desktop_layout: data.desktop_layout || "row",
            print_button_text: data.print_button_text || "PRINT",
            restart_button_text: data.restart_button_text || "RESTART",
            button_text_color: data.button_text_color || "#FFFFFF",
            button_font_size: data.button_font_size || 24,
            button_background: data.button_background || "",
            button_height: data.button_height || 86,
            button_width: data.button_width || 314
          });
        }
        
        // Fetch active backgrounds
        const backgrounds = await getActiveBackgrounds();
        const userFormBg = backgrounds.find(bg => bg.name === 'userForm' && bg.is_active);
        if (userFormBg) {
          setBackgroundImage(userFormBg.url);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    
    fetchSettings();
  }, []);
  
  // useEffect(() => {
  //   // Check if we have the required data
  //   if (!sourceImageBlob || !selectedImage || !userDetails) {
  //     console.error("Missing required data:", { sourceImageBlob, selectedImage, userDetails });
  //     navigate("/");
  //     return;
  //   }
   
  //   const processImages = async () => {
  //     setLoading(true);
  //     try {
  //       // Create FormData
  //       const formData = new FormData();
  //       formData.append(
  //         "targetImage",
  //         new File([sourceImageBlob], "sourceImage.jpg", { type: "image/jpeg" })
  //       );

  //       // Fetch the selected image and append it
  //       const response = await fetch(selectedImage);
  //       if (!response.ok) throw new Error("Failed to fetch selected image");
        
  //       const targetImageBlob = await response.blob();
  //       formData.append(
  //         "sourceImage",
  //         new File([targetImageBlob], "targetImage.jpg", { type: "image/jpeg" })
  //       );

  //       // Add user details
  //       formData.append("name", userDetails.name);
  //       formData.append("email", userDetails.email);

  //       // Make API call to swap faces
  //       const swapResponse = await fetch(
  //         "http://localhost:8000/api/swap-face/",
  //         {
  //           method: "POST",
  //           body: formData,
  //         }
  //       );

  //       if (!swapResponse.ok) {
  //         throw new Error(`Swap API error: ${swapResponse.statusText}`);
  //       }

  //       const swappedImageBlob = await swapResponse.blob();
  //       const convertedBlob = await convertImageToJPEG(swappedImageBlob);

  //       // Generate filename with timestamp
  //       const fileName = `swapped-images/nielsen${Date.now()}-result.jpg`;

  //       // Upload to Supabase
  //       const { error: uploadError } = await supabase.storage
  //         .from("nielsen")
  //         .upload(fileName, convertedBlob, {
  //           contentType: "image/jpeg",
  //         });

  //       if (uploadError) throw uploadError;

  //       // Get public URL
  //       const publicURL = `https://fuhqxfbyvrklxggecynt.supabase.co/storage/v1/object/public/nielsen/${fileName}`;
  //       console.log("Public URL:", publicURL);

  //       // // Save user details to database
  //       const { error: insertError } = await supabase
  //         .from("nielsen")
  //         .insert([{ ...userDetails, publicURL }]);

  //       if (insertError) throw insertError;

  //       setResultImageUrl(publicURL);
  //     } catch (err) {
  //       console.error("Error processing images:", err);
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   processImages();
  // }, []); // Empty dependency array since we want this to run once on mount

  // Helper function to convert image to JPEG
 
  // Create a PrintableImage component using forwardRef
  const PrintableImage = forwardRef(({ resultImageUrl }, ref) => {
    return (
      <div ref={ref}>
        <img
          src={resultImageUrl}
          alt="Swapped Result"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    );
  });
  
  const convertImageToJPEG = (blob) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(resolve, "image/jpeg");
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  };

  // Handle navigation back to home
  const goHome = () => {
    navigate("/");
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-500 p-16 rounded-lg shadow-lg text-center">
        <div className="text-white text-3xl mb-4">Something went wrong: {error}</div>
        <button
          onClick={goHome}
          className="bg-white text-3xl  text-blue-900 px-12 py-4 rounded font-bold"
        >
          Try Again
        </button>
      </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingPage />
      </div>
    );
  }

  if (resultImageUrl) {
    // Apply background image from the backgrounds table
    const containerStyle = {
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    };
    
    // Calculate responsive font sizes based on viewport width
    const calculateResponsiveFontSize = (baseSize) => {
      // Get viewport width
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      
      // Scale factor based on viewport width
      let scaleFactor = 1;
      if (vw < 640) { // Small mobile
        scaleFactor = 0.6;
      } else if (vw < 768) { // Mobile
        scaleFactor = 0.7;
      } else if (vw < 1024) { // Tablet
        scaleFactor = 0.8;
      } else if (vw < 1280) { // Small desktop
        scaleFactor = 0.9;
      }
      
      return `${baseSize * scaleFactor}px`;
    };
    
    return (
      <div className="relative min-h-screen w-screen flex items-center justify-center p-4" style={containerStyle}>
        {/* For landscape orientation */}
        <div className="hidden lg:flex flex-col items-center justify-between w-full px-4 md:px-8 gap-8 md:gap-20">
          <div className={`w-full flex ${swapPageSettings.desktop_layout === 'column' ? 'flex-col' : 'flex-row'} items-center justify-between gap-8 md:gap-20`}>
            {/* Image with dynamic width */}
            <div 
              style={{ 
                width: swapPageSettings.desktop_layout === 'column' ? '100%' : `${swapPageSettings.image_width}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: swapPageSettings.desktop_layout === 'column' ? 'center' : 'flex-end'
              }} 
              className="flex items-center justify-center"
            >
              <img
                src={resultImageUrl}
                alt="Swapped Result"
                className="w-full h-auto object-contain max-h-[56vh] animate__animated animate__zoomIn"
              />
            </div>

            {/* QR code, text, and button */}
            <div 
              className={`${swapPageSettings.desktop_layout === 'column' ? 'w-full' : 'flex-1'} flex flex-col items-center justify-center self-center gap-4 md:gap-8`}
            >
              <h1 
                className="font-bold text-center w-full leading-tight"
                style={{ 
                  color: swapPageSettings.title_color,
                  fontSize: calculateResponsiveFontSize(swapPageSettings.title_font_size)
                }}
              >
                {swapPageSettings.title_text}
              </h1>
              
              {/* QR Code */}
              <div 
                className="bg-white p-3 md:p-6 shadow-lg"
                style={{
                  borderWidth: '8px',
                  borderStyle: 'solid',
                  borderColor: swapPageSettings.qr_border_color
                }}
              >
                <QRCodeSVG value={resultImageUrl} size={Math.min(window.innerWidth * 0.15, 200)} />
              </div>

              <div style={{ display: "none" }}>
                <PrintableImage
                  ref={printRef}
                  resultImageUrl={resultImageUrl}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3 md:gap-5 mt-4 md:mt-6 w-full">
                {/* Print button with conditional rendering */}
                {swapPageSettings.show_print_button && (
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                        style={{ 
                          backgroundColor: swapPageSettings.button_color,
                          color: swapPageSettings.button_text_color || "#FFFFFF",
                          maxWidth: "100%",
                          minWidth: "200px",
                          width: `min(${swapPageSettings.button_width || 314}px, 90vw)`,
                          fontSize: calculateResponsiveFontSize(swapPageSettings.button_font_size || 24)
                        }}
                      >
                        {swapPageSettings.print_button_text || "Print"}
                      </button>
                    )}
                    content={() => printRef.current}
                  />
                )}

                <button
                  onClick={goHome}
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  style={{ 
                    backgroundColor: swapPageSettings.button_color,
                    color: swapPageSettings.button_text_color || "#FFFFFF",
                    maxWidth: "100%",
                    minWidth: "200px",
                    width: `min(${swapPageSettings.button_width || 314}px, 90vw)`,
                    fontSize: calculateResponsiveFontSize(swapPageSettings.button_font_size || 24)
                  }}
                >
                  {swapPageSettings.restart_button_text || "RESTART"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* For portrait orientation (mobile and tablets) */}
        <div className="lg:hidden flex flex-col items-center justify-center w-full max-w-4xl mt-2 p-4">
          <img
            src={resultImageUrl}
            alt="Swapped Result"
            className="w-full max-w-[712px] object-contain max-h-[50vh] animate__animated animate__zoomIn"
          />
          
          <div className="flex flex-col md:flex-row justify-center items-center mt-6 gap-6">
            <div 
              className="bg-white p-3 md:p-4"
              style={{
                borderWidth: '8px',
                borderStyle: 'solid',
                borderColor: swapPageSettings.qr_border_color
              }}
            >
              <QRCodeSVG value={resultImageUrl} size={Math.min(window.innerWidth * 0.25, 150)} />
            </div>
            
            <div style={{ display: "none" }}>
              <PrintableImage
                ref={printRef}
                resultImageUrl={resultImageUrl}
              />
            </div>
          
            <div className="flex flex-col items-center">
              <h1 
                className="mb-4 font-semibold text-center"
                style={{ 
                  color: swapPageSettings.title_color,
                  fontSize: calculateResponsiveFontSize(swapPageSettings.title_font_size)
                }}
              >
                {swapPageSettings.title_text}
              </h1>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3 mt-4 w-full">
                {/* Print button with conditional rendering */}
                {swapPageSettings.show_print_button && (
                  <ReactToPrint
                    trigger={() => (
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                        style={{ 
                          backgroundColor: swapPageSettings.button_color,
                          color: swapPageSettings.button_text_color || "#FFFFFF",
                          maxWidth: "100%",
                          minWidth: "200px",
                          width: `min(${swapPageSettings.button_width || 314}px, 90vw)`,
                          fontSize: calculateResponsiveFontSize(swapPageSettings.button_font_size || 24)
                        }}
                      >
                        {swapPageSettings.print_button_text || "Print"}
                      </button>
                    )}
                    content={() => printRef.current}
                  />
                )}

                <button
                  onClick={goHome}
                  className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 text-white font-bold rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                  style={{ 
                    backgroundColor: swapPageSettings.button_color,
                    color: swapPageSettings.button_text_color || "#FFFFFF",
                    maxWidth: "100%",
                    minWidth: "200px",
                    width: `min(${swapPageSettings.button_width || 314}px, 90vw)`,
                    fontSize: calculateResponsiveFontSize(swapPageSettings.button_font_size || 24)
                  }}
                >
                  {swapPageSettings.restart_button_text || "RESTART"}
                </button>
              </div>

              {/* Update mobile/tablet layout buttons */}
             
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Swap;