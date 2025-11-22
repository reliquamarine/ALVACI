// GalleryWallsController.jsx (File yang menggabungkan logika)

import React, { useState } from 'react';

// --- Data Karya Seni ---
const allArtworks = [
  { id: 1, title: 'Girl with a Pearl Earring', artist: 'Johannes Vermeer', yearCreated: 'c. 1665', category: 'Painting', description: 'Girl with a Pearl Earring (Dutch: Meisje met de parel) is an oil painting by Dutch Golden Age painter Johannes Vermeer. It is a tronie, the Dutch 17th-century description of a head not meant to be a specific portrait.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Vermeer' },
  { id: 2, title: 'The Scream', artist: 'Edvard Munch', yearCreated: '1893', category: 'Expressionism', description: 'The iconic painting depicting a figure against a turbulent red sky, representing an existential scream.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Munch' },
  { id: 3, title: 'Mona Lisa', artist: 'Leonardo Da Vinci', yearCreated: '1503–1506', category: 'Portrait', description: 'The best known, the most visited, the most written about, the most sung about, the most parodied work of art in the world.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Da+Vinci' },
  { id: 4, title: 'The Starry Night', artist: 'Vincent van Gogh', yearCreated: '1889', category: 'Post-Impressionism', description: 'The scene depicts the view outside his asylum room window at Saint-Rémy-de-Provence.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Van+Gogh' },
  { id: 5, title: 'The Persistence of Memory', artist: 'Salvador Dalí', yearCreated: '1931', category: 'Surrealism', description: 'One of the most recognizable works of Surrealism, depicting melting pocket watches.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Dalí' },
  { id: 6, title: 'Whistler\'s Mother', artist: 'James Whistler', yearCreated: '1871', category: 'Realism', description: 'A Victorian-era painting of an elderly woman dressed in black, generally viewed as an American icon.', imageUrl: 'https://placehold.co/300x400/f0e6d6/5d4037?text=Whistler' },
];

const CARDS_PER_VIEW = 3; 

// --- Komponen Navbar (Digunakan di kedua tampilan) ---
const CustomNavbar = () => (
    <header className="sticky top-0 z-10 flex justify-between items-center px-10 py-6 border-b border-gray-300 w-full bg-[#F4EFEB] shadow-md">
        <div className="text-5xl font-extrabold text-[#442D1D] font-montserrat px-8">
            Artzy
        </div>
        <nav className="flex items-center font-medium text-[#442D1D] px-8 text-2xl font-montserrat">
            <a href="/beranda" className="hover:text-amber-700 transition duration-150 mr-8">Home</a>
            <a href="/gallery-walls" className="hover:text-amber-700 transition duration-150 mr-8">Gallery Walls</a>
            <a href="/add-artwork" className="hover:text-amber-700 transition duration-150 mr-8">Add Artwork</a>
            <a href="/profile" className="hover:text-amber-700 transition duration-150 mr-8">Profile</a>
        </nav>
    </header>
);

// --- Komponen ArtworkCard yang telah dimodifikasi ---
// Menerima prop onSelect untuk menangani klik tombol
const ArtworkCard = ({ artwork, onSelect }) => {
    const { title, artist, imageUrl } = artwork;
    return (
        <div className="bg-[#f0e6d6] shadow-xl rounded-xl p-4 flex flex-col items-center mx-4 transition duration-300 hover:shadow-2xl flex-shrink-0 w-72">
            <div className="relative w-full h-80 mb-4">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                />
            </div>
            <div className="text-center text-[#442D1D]">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-lg mb-2">by {artist}</p>
                {/* Menambahkan onClick handler untuk berpindah ke detail */}
                <button 
                    onClick={() => onSelect(artwork)}
                    className="text-sm font-medium text-amber-700 hover:text-amber-900 transition duration-150"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

// --- Komponen ArtworkDetails (Dari permintaan sebelumnya) ---
const ArtworkDetails = ({ artwork, onGoBack }) => {
    const { title, artist, yearCreated, category, description, imageUrl } = artwork;

    return (
        <div className="flex-grow flex flex-col items-center pt-10"
            style={{ 
                background: 'linear-gradient(to bottom, #f0e6d6 0%, #d4c2a5 100%)',
            }}
        >
            <div className="flex items-center w-full max-w-5xl mb-10 px-10">
                <button 
                    onClick={onGoBack} 
                    className="text-[#5d4037] text-4xl font-bold mr-6 hover:opacity-75 transition duration-150"
                >
                    &larr;
                </button>
                <h1 className="text-5xl font-bold text-[#5d4037] pt-5 mx-auto">
                    Gallery Walls
                </h1>
                <div className="w-10"></div>
            </div>

            <div className="bg-[#f0e6d6] shadow-2xl rounded-xl p-8 w-full max-w-5xl flex text-[#333] mb-20">
                <div className="flex-shrink-0 w-80 mr-12">
                    <img 
                        src={imageUrl} 
                        alt={title} 
                        className="w-full h-auto rounded-lg shadow-xl"
                    />
                </div>
                <div className="flex-grow text-xl">
                    <p className="mb-4">
                        <span className="font-bold text-2xl text-[#5d4037]">Title</span>
                        <br />{title}
                    </p>
                    <p className="mb-4">
                        <span className="font-bold text-2xl text-[#5d4037]">Artist Name</span>
                        <br />{artist}
                    </p>
                    <p className="mb-4">
                        <span className="font-bold text-2xl text-[#5d4037]">Year Created</span>
                        <br />{yearCreated}
                    </p>
                    <p className="mb-4">
                        <span className="font-bold text-2xl text-[#5d4037]">Category</span>
                        <br />{category}
                    </p>
                    <p className="mt-6">
                        <span className="font-bold text-2xl text-[#5d4037]">Description</span>
                        <br />{description}
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Komponen GalleryWalls yang telah dimodifikasi (Tampilan Geser) ---
const GalleryView = ({ setDetailArtwork }) => {
    const [startIndex, setStartIndex] = useState(0);

    const totalPages = Math.ceil(allArtworks.length / CARDS_PER_VIEW);
    const currentPage = Math.floor(startIndex / CARDS_PER_VIEW);

    const handleNext = () => {
        if (startIndex + CARDS_PER_VIEW < allArtworks.length) {
            setStartIndex(prevIndex => prevIndex + CARDS_PER_VIEW);
        }
    };

    const handlePrev = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => Math.max(0, prevIndex - CARDS_PER_VIEW));
        }
    };

    const artworksToShow = allArtworks.slice(startIndex, startIndex + CARDS_PER_VIEW);

    return (
        <main className="flex-grow flex flex-col items-center pt-10"
            style={{ 
                background: 'linear-gradient(to bottom, #f0e6d6 0%, #d4c2a5 100%)',
            }}
        >
            <h1 className="text-5xl font-bold text-[#5d4037] mb-16 pt-5">
                Gallery Walls
            </h1>

            <div className="flex items-center justify-center w-full max-w-7xl pb-20">
                <button 
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    className={`text-[#5d4037] text-5xl p-2 mr-6 transition duration-150 
                               ${startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'}`}
                >
                    &lt;
                </button>
                
                <div className="flex space-x-8 overflow-hidden">
                    {artworksToShow.map(artwork => (
                        <ArtworkCard 
                            key={artwork.id} 
                            artwork={artwork} 
                            // Meneruskan fungsi untuk beralih tampilan
                            onSelect={setDetailArtwork} 
                        />
                    ))}
                </div>

                <button 
                    onClick={handleNext}
                    disabled={startIndex + CARDS_PER_VIEW >= allArtworks.length}
                    className={`text-[#5d4037] text-5xl p-2 ml-6 transition duration-150 
                               ${startIndex + CARDS_PER_VIEW >= allArtworks.length ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-75'}`}
                >
                    &gt;
                </button>
            </div>

            <p className="text-lg text-[#5d4037] mb-5">
                Halaman {currentPage + 1} dari {totalPages}
            </p>
        </main>
    );
};


// --- Komponen Utama Pengendali Navigasi ---
function GalleryWallsController() {
    // State untuk menyimpan data karya seni yang akan ditampilkan di halaman detail
    // Jika null, tampilkan tampilan galeri geser.
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    // Fungsi untuk kembali ke tampilan galeri
    const handleGoBack = () => {
        setSelectedArtwork(null);
    };

    return (
        <div className="bg-[#F4EFEB] min-h-screen flex flex-col scroll-smooth">
            <CustomNavbar />
            
            {/* Logika Kondisional: Tampilkan Detail atau Galeri */}
            {selectedArtwork ? (
                // Tampilkan halaman detail
                <ArtworkDetails artwork={selectedArtwork} onGoBack={handleGoBack} />
            ) : (
                // Tampilkan halaman galeri geser
                <GalleryView setDetailArtwork={setSelectedArtwork} />
            )}
        </div>
    );
}

export default GalleryWallsController;