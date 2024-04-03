import fitz

def extract_text_from_pdf(pdf_path):
    text = ""
    with fitz.open(pdf_path) as pdf_document:
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            text += page.get_text()
    return text

# Replace "your_pdf_file.pdf" with the path to your PDF file
pdf_text = extract_text_from_pdf("test2.pdf")
print(pdf_text)
