export const downloadFile = async (url, filename = "download.pdf") => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("File fetch failed");

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error("Download failed, falling back to opening in new tab:", err);
    window.open(url, "_blank");
  }
};