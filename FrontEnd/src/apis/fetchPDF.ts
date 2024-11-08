export const fetchPDF = async () => {
  try {
    const response = await fetch('/api/generate-pdf', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify({ url: 'http://k11s205.p.ssafy.io/pdf/1' }),
      body: JSON.stringify({ url: 'http://localhost:3000/pdf/1' }),
    });

    if (!response.ok) throw new Error('PDF generation failed');

    // PDF Blob 다운로드
    const blob = await response.blob();
    const pdfUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'download.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(pdfUrl);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    alert('Failed to download PDF');
  }
};
