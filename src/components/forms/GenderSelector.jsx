import { useEffect, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { supabase } from '../../supabaseClient';

export function GenderSelector({ onSelect }) {
  const { settings } = useSettings();
  const [genderButtonSettings, setGenderButtonSettings] = useState({});

  // Fetch gender button settings on mount
  useEffect(() => {
    const fetchGenderButtonSettings = async () => {
      try {
        const { data, error } = await supabase
          .from('genderbuttontable')
          .select('*')
          .single();
        
        if (error) throw error;
        
        setGenderButtonSettings(data || {});
        console.log("Loaded gender button settings:", genderButtonSettings);
        console.log("Loaded gender button settings:", genderButtonSettings.gender_button_height);
        console.log("Loaded gender button width:", genderButtonSettings.gender_button_width);
      } catch (error) {
        console.error("Error loading gender button settings:", error);
      }
    };
    
    fetchGenderButtonSettings();
  }, []);
  
  const backgroundStyle = {
    backgroundImage: genderButtonSettings?.gender_background_url ? `url(${genderButtonSettings.gender_background_url})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  const maleButtonStyle = {
  
    color: genderButtonSettings?.gender_button_text_color || '#FFFFFF',
    backgroundImage: genderButtonSettings?.male_button_background ? `url(${genderButtonSettings.male_button_background})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: genderButtonSettings?.gender_button_width ? `${genderButtonSettings.gender_button_width}px` : '250px',
    height: genderButtonSettings?.gender_button_height ? `${genderButtonSettings.gender_button_height}px` : '250px'
  };
  
  const femaleButtonStyle = {
   
    color: genderButtonSettings?.gender_button_text_color || '#FFFFFF',
    backgroundImage: genderButtonSettings?.female_button_background ? `url(${genderButtonSettings.female_button_background})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: genderButtonSettings?.gender_button_width ? `${genderButtonSettings.gender_button_width}px` : '250px',
    height: genderButtonSettings?.gender_button_height ? `${genderButtonSettings.gender_button_height}px` : '250px'
  };
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={backgroundStyle}>
    <h2 
  className=" font-bold mb-8" 
  style={{ 
    color: genderButtonSettings?.gender_title_color || '#FFFFFF',
    fontSize: `${genderButtonSettings?.title_font_size || 24}px`
  }}
>
  {genderButtonSettings?.gender_selection_title || "Select Your Gender"}
</h2>
      
      <div className={`flex ${genderButtonSettings?.button_layout === 'column' ? 'flex-col space-y-6' : 'flex-row space-x-6'}`}>
        <button
          className="px-8 py-4 rounded-lg shadow-lg text-xl font-medium"
          style={maleButtonStyle}
          onClick={() => onSelect('male')}
        >
          {/* {genderButtonSettings?.male_button_text || "Male"} */}
        </button>
        
        <button
          className="px-8 py-4 rounded-lg shadow-lg text-xl font-medium"
          style={femaleButtonStyle}
          onClick={() => onSelect('female')}
        >
          {/* {genderButtonSettings?.female_button_text || "Female"} */}
        </button>
      </div>
    </div>
  );
}