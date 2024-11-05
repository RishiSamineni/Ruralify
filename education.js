// Import jsPDF from the jsPDF library
const { jsPDF } = window.jspdf;

function generatePDF() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    // Check if title or content is missing
    if (!title || !content) {
        alert('No book found. Please fill in both fields.');
        return;
    }

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add title and content to the PDF
    pdf.setFontSize(20);
    pdf.text(title, 10, 20);
    pdf.setFontSize(12);
    pdf.text(content, 10, 40);

    // Save the PDF with a download prompt
    pdf.save("generated.pdf");
}
