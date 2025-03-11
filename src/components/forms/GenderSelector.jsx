import { useSettings } from '../../contexts/SettingsContext';

export function GenderSelector({ onSelect }) {
  const { settings } = useSettings();
  
  const backgroundStyle = {
    backgroundImage: settings?.gender_background_url ? `url(${settings.gender_background_url})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  
  const maleButtonStyle = {
    backgroundColor: settings?.gender_button_bg_color || '#8b5cf6',
    color: settings?.gender_button_text_color || '#FFFFFF',
    backgroundImage: settings?.male_button_background ? `url(${settings.male_button_background})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minWidth: '150px',
    minHeight: '150px'
  };
  
  const femaleButtonStyle = {
    backgroundColor: settings?.gender_button_bg_color || '#8b5cf6',
    color: settings?.gender_button_text_color || '#FFFFFF',
    backgroundImage: settings?.female_button_background ? `url(${settings.female_button_background})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minWidth: '150px',
    minHeight: '60px'
  };
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={backgroundStyle}>
      <h2 
        className="text-3xl font-bold mb-8" 
        style={{ color: settings?.gender_title_color || '#FFFFFF' }}
      >
        {settings?.gender_selection_title || "Select Your Gender"}
      </h2>
      
      <div className="flex space-x-6">
        <button
          className="px-8 py-4 rounded-lg shadow-lg text-xl font-medium"
          style={maleButtonStyle}
          onClick={() => onSelect('male')}
        >
          {settings?.male_button_text || "Male"}
        </button>
        
        <button
          className="px-8 py-4 rounded-lg shadow-lg text-xl font-medium"
          style={femaleButtonStyle}
          onClick={() => onSelect('female')}
        >
          {settings?.female_button_text || "Female"}
        </button>
      </div>
    </div>
  );
}