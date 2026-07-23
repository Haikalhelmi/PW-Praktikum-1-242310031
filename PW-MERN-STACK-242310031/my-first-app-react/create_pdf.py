import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#1E3A8A'),
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'CoverSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#475569'),
        alignment=TA_CENTER
    )
    
    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=12,
        spaceAfter=6
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor('#334155'),
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        alignment=TA_LEFT,
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Code'],
        fontName='Courier',
        fontSize=8,
        leading=10,
        textColor=colors.HexColor('#1E293B'),
        backColor=colors.HexColor('#F1F5F9'),
        borderColor=colors.HexColor('#CBD5E1'),
        borderWidth=0.5,
        borderPadding=6,
        spaceBefore=4,
        spaceAfter=6
    )

    story = []

    # Title Header
    story.append(Paragraph("INSTITUT BISNIS &amp; INFORMATIKA KESATUAN", subtitle_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>DOKUMENTASI PRAKTIKUM 6 - PEMROGRAMAN WEBSITE</b>", title_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Topik: Framework UI React JS (State, Props, Hooks &amp; Modal Forms)</b>", subtitle_style))
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#1E3A8A'), spaceAfter=12))

    # Section 1: Overview
    story.append(Paragraph("1. Identitas &amp; Deskripsi Tugas", h1_style))
    identitas_data = [
        [Paragraph("<b>Mata Kuliah</b>", body_style), Paragraph(": Pemrograman Website (React JS Part 2)", body_style)],
        [Paragraph("<b>Praktikum</b>", body_style), Paragraph(": Bab VI - State, Props, Hooks &amp; Component Form", body_style)],
        [Paragraph("<b>Repository</b>", body_style), Paragraph(": PW-MERN-STACK-NPM", body_style)],
        [Paragraph("<b>Pesan Commit</b>", body_style), Paragraph(": Praktikum 6", body_style)],
    ]
    t = Table(identitas_data, colWidths=[120, 380])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#F1F5F9')),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t)
    story.append(Spacer(1, 10))

    # Section 2: Implementation Steps
    story.append(Paragraph("2. Rincian Implementasi Tugas", h1_style))
    story.append(Paragraph("Pada Praktikum 6 ini, dilakukan implementasi modul CMS Buku (Books Management) berbasis Next.js App Router dengan fitur interaktif lengkap sebagai berikut:", body_style))
    
    steps_list = [
        "<b>Form Modal Buku (<code>form.jsx</code>)</b>: Membuat komponen form input data buku dengan mengintegrasikan komponen UI global (<code>TextInput</code>, <code>TextAreaInput</code>, <code>InputCheckbox</code>, dan <code>InputImage</code>). Form memiliki field: Book Title, Author Name, Type Book (Is Free switch), Sinopsis, Story, dan Cover Image.",
        "<b>Modal Popup Integration (<code>modals.jsx</code>)</b>: Menghubungkan tombol <i>'Add New Book'</i> pada header CMS agar memanggil <code>openModal()</code> dan menampilkan form penambahan buku dalam dialog modal popup secara transparan.",
        "<b>Manajemen State Dinamis (<code>_books/index.jsx</code>)</b>: Menggunakan React <code>useState</code> untuk mengelola daftar buku (<code>books</code>). Ketika data buku baru ditambahkan melalui modal, state <code>books</code> akan ter-update secara realtime sehingga kartu statistik (Total Books, Free Books, Subscribe, Authors) dan tabel data ter-render ulang secara otomatis.",
        "<b>Fitur Edit &amp; Delete (<code>tabledata.jsx</code>)</b>: Memperbaiki aksi pada setiap baris tabel sehingga pengguna dapat mengubah data buku (via modal pre-filled) dan menghapus baris data dari state."
    ]
    for step in steps_list:
        story.append(Paragraph(f"• {step}", body_style))

    story.append(Spacer(1, 10))

    # Section 3: Code Modification Details
    story.append(Paragraph("3. Struktur Kode &amp; Komponen yang Dimodifikasi", h1_style))

    # Code snippet 1: form.jsx
    story.append(Paragraph("A. Komponen Form (<code>src/components/cms/_books/components/form.jsx</code>)", h2_style))
    story.append(Paragraph("Komponen ini menerima prop <code>book</code> (jika mode edit), <code>onSave</code>, dan <code>onClose</code>. Menggunakan <code>FileReader</code> untuk preview gambar dan mengembalikan objek buku baru saat submit:", body_style))
    
    code_form = """const handleSubmit = (e) => {
  e.preventDefault();
  const savedBook = {
    id: book?.id || Date.now(),
    title: formData.title,
    author: formData.author,
    sinopsis: formData.sinopsis,
    story: formData.story,
    is_free: formData.is_free,
    img: imagePreview || "harpot.jpg"
  };
  if (onSave) onSave(savedBook);
  if (onClose) onClose();
};"""
    story.append(Paragraph(code_form.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style))

    # Code snippet 2: MBooks / index.jsx
    story.append(Paragraph("B. Container Main Page (<code>src/components/cms/_books/index.jsx</code>)", h2_style))
    story.append(Paragraph("Mengatur handler peluncuran modal dan pembaruan state buku:", body_style))
    
    code_mbooks = """const handleOpenAddModal = () => {
  openModal({
    header: "Add New Book",
    message: <Form onSave={handleSaveBook} onClose={handleCloseModal} />,
    size: "lg",
    closable: true,
  });
};"""
    story.append(Paragraph(code_mbooks.replace('\n', '<br/>').replace(' ', '&nbsp;'), code_style))

    story.append(Spacer(1, 10))

    # Section 4: Verification & Build
    story.append(Paragraph("4. Pengujian &amp; Verifikasi Build", h1_style))
    story.append(Paragraph("Proses pengujian dilakukan secara komprehensif:", body_style))
    story.append(Paragraph("1. <b>Build Static Next.js</b>: Menjalankan perintah <code>npx next build</code> dan berhasil mengompilasi seluruh route (<code>/</code>, <code>/cms</code>, <code>/cms/books</code>) dengan 0 error.", body_style))
    story.append(Paragraph("2. <b>Pengujian Antarmuka</b>: Pengujian visual tombol Add New Book, popup Modal, preview unggah gambar, pembaruan tabel, dan tombol hapus.", body_style))

    story.append(Spacer(1, 15))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=8))
    story.append(Paragraph("Dokumentasi ini dibuat secara otomatis sebagai bagian dari pemenuhan Tugas Praktikum 6 Pemrograman Website.", ParagraphStyle('Footer', parent=subtitle_style, fontSize=8, alignment=TA_CENTER)))

    doc.build(story)
    print(f"PDF successfully created at: {filename}")

if __name__ == '__main__':
    out_dir = r"c:\Users\kkal\Documents\PW-MERN-STACK-NPM\my-first-app-react\public"
    os.makedirs(out_dir, exist_ok=True)
    pdf_path = os.path.join(out_dir, "Dokumentasi_Praktikum_6.pdf")
    build_pdf(pdf_path)

    # Also save a copy in root folder for convenience
    pdf_root = r"c:\Users\kkal\Documents\PW-MERN-STACK-NPM\my-first-app-react\Dokumentasi_Praktikum_6.pdf"
    build_pdf(pdf_root)
