import React, { useState } from "react";

function Admin() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFilenameChange = (event) => {
    setFilename(event.target.value);
  };

  const handleFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setMessage(`File uploaded: ${result.filename}`);
    } catch (error) {
      setMessage("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <h1>Hello Admin!</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter new filename"
        value={filename}
        onChange={handleFilenameChange}
      />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Admin;
