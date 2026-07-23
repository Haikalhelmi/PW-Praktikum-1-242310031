export function FeaturedSection() {
  return (
    <section id="books" className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col">
            <h2 className="fw-bold text-center">Featured Books</h2>
            <p className="text-center text-muted">
              Handpicked selections just for you
            </p>
          </div>
        </div>

        <div className="row g-4">
          {ListBook.map((book) => (
            <div key={book.id} className="col-md-6 col-lg-3">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ListBook = [
  {
    id: 1,
    title: "One Piece",
    img: "OnePiece.jpg",
    author: "Eiichiro Oda",
    is_free: false,
    sinopsis: "Petualangan Monkey D. Luffy untuk menjadi Raja Bajak Laut dan menemukan harta karun legendaris One Piece.",
    rating: 4.9,
    views: "1.2M",
  },
  {
    id: 2,
    title: "Naruto",
    img: "Naruto.png",
    author: "Masashi Kishimoto",
    is_free: true,
    sinopsis: "Kisah seorang ninja muda bernama Naruto Uzumaki yang bercita-cita menjadi Hokage demi diakui oleh penduduk desanya.",
    rating: 4.8,
    views: "950K",
  },
  {
    id: 3,
    title: "Bleach",
    img: "Bleach.jpg",
    author: "Tite Kubo",
    is_free: false,
    sinopsis: "Ichigo Kurosaki mendapatkan kekuatan Shinigami dan harus melindungi dunia manusia dari roh jahat yang disebut Hollow.",
    rating: 4.7,
    views: "800K",
  },
  {
    id: 4,
    title: "Neon Genesis Evangelion",
    img: "Evangelion.jpg",
    author: "Yoshiyuki Sadamoto",
    is_free: false,
    sinopsis: "Remaja terpilih harus mengendalikan mecha raksasa bernama Evangelion untuk melawan makhluk misterius yang disebut Angel.",
    rating: 4.6,
    views: "500K",
  },
  {
    id: 5,
    title: "Monster",
    img: "Monster.png",
    author: "Naoki Urasawa",
    is_free: false,
    sinopsis: "Seorang dokter bedah jenius terjebak dalam pengejaran psikologis setelah menyelamatkan nyawa seorang anak yang ternyata pembunuh berantai.",
    rating: 4.9,
    views: "450K",
  },
  {
    id: 6,
    title: "20th Century Boys",
    img: "20thCenturyBoys.png",
    author: "Naoki Urasawa",
    is_free: false,
    sinopsis: "Sekelompok teman masa kecil harus bersatu kembali untuk menghentikan sekte misterius yang ingin menghancurkan dunia.",
    rating: 4.8,
    views: "300K",
  }
];

const BookCard = ({ book }) => {
  const { title, author, is_free, rating, img } = book;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`bi bi-star${i < Math.floor(rating) ? "-fill" : ""} text-warning`}
      ></i>
    ));
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <div className="bg-light p-4 mb-3 rounded">
          {img ? (
            <img
              src={`/Images/${img}`}
              alt={title}
              className="img-fluid"
              style={{ maxHeight: "150px", objectFit: "cover" }}
            />
          ) : (
            <i
              className="bi bi-book-half"
              style={{ fontSize: "4rem", color: "#6c757d" }}
            ></i>
          )}
        </div>

        <h5 className="card-title fw-bold">{title}</h5>
        <p className="text-muted small mb-2">by {author}</p>
        <div className="mb-2">
          {renderStars(rating)}
          <span className="ms-2 text-muted small">({rating})</span>
        </div>
      </div>
    </div>
  );
};