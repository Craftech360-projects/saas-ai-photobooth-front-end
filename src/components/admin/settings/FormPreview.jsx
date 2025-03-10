import React from "react";
import { UserForm } from "../../forms/UserForm"; // Changed from default import to named import

function FormPreview({ settings, showFormPreview, toggleFormPreview }) {
  console.log("Form style in preview:", settings.form_style); // Add this to debug
  
  return (
    <div className="mb-8 border-b pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Form Preview</h2>
        <button
          type="button"
          onClick={toggleFormPreview}
          className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
        >
          {showFormPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>
      
      {showFormPreview && (
        <div className="relative h-[500px] border border-gray-300 rounded-lg bg-gray-100 overflow-hidden">
          <UserForm
            onSubmit={() => {}}
            initialValues={{}}
            requireName={settings.require_name}
            requireEmail={settings.enable_email_collection}
            formFields={settings.custom_form_fields || []}
            formTitle={settings.form_title}
            buttonText={settings.button_text}
            buttonStyle={settings.button_style || {}}
            formStyle={settings.form_style || {}}
            buttonBackgroundUrl={settings.continue_button_background}
            style={{
              position: "absolute",
              top: settings.form_position === "top" ? "10%" : 
                   settings.form_position === "bottom" ? "auto" : 
                   settings.form_position === "custom" ? `${settings.form_position_percent}%` : "50%",
              bottom: settings.form_position === "bottom" ? "10%" : "auto",
              transform: settings.form_position === "middle" ? "translate(-50%, -50%)" : "translateX(-50%)"
            }}
          />
        </div>
      )}
    </div>
  );
}

export default FormPreview;