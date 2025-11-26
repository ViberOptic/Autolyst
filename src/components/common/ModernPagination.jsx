// src/components/common/ModernPagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ModernPagination({ currentPage, totalPages, onPageChange }) {
  // Jika halaman cuma 1, tidak perlu tampilkan pagination
  if (totalPages <= 1) return null;

  // Helper untuk membuat array angka halaman
  const getPageNumbers = () => {
    const pages = [];
    // Logika sederhana: Tampilkan semua jika halaman sedikit (< 7)
    // Jika halaman banyak, logika "..." bisa ditambahkan nanti. 
    // Karena data cuma 20 (4 halaman), kita tampilkan semua.
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Tombol Prev */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Angka Halaman */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all
            ${currentPage === page 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-110' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Tombol Next */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-full text-blue-600 hover:bg-blue-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}