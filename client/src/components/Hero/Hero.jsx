import { useState, useEffect } from 'react';

function Hero() {
  // State för bilder och spots
  const [heroImages, setHeroImages] = useState([]);
  const [spots, setSpots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Hämta hero-bilder och spots när komponenten laddas
  useEffect(() => {
    // Hämta hero-bilder
    fetch('/api/heroImages')
      .then(response => response.json())
      .then(data => {
        setHeroImages(data);
      })
      .catch(error => {
        console.error('Kunde inte hämta hero-bilder:', error);
      });
      
    // Hämta spots
    fetch('/api/spots')
      .then(response => response.json())
      .then(data => {
        setSpots(data);
      })
      .catch(error => {
        console.error('Kunde inte hämta spots:', error);
      });
  }, []);
  
  // Automatisk bildväxling var 5:e sekund
  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        
        setTimeout(() => {
          setCurrentIndex(prevIndex => 
            prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
          );
          
          setTimeout(() => {
            setIsTransitioning(false);
          }, 50);
        }, 500);
      }, 5000);
      
      return () => clearInterval(timer);
    }
  }, [heroImages]);
  
  // Om vi inte har några bilder, visa en platshållare
  if (heroImages.length === 0) {
    return <div className="h-64 bg-gray-200"></div>;
  }
  
  // Aktuell bild som ska visas
  const currentImage = heroImages[currentIndex];
  
  // CSS-klass för transition
  const transitionClass = isTransitioning ? 'opacity-0' : 'opacity-100';
  
  return (
    <div>
      {/* CSS för transition */}
      <style>{`
        .image-transition {
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
      
      {/* Mobil layout (<640px) */}
      <div className="sm:hidden">
        <div className="mb-10">
          <div className="h-64 relative overflow-hidden">
            <img 
              src={currentImage.image} 
              alt={currentImage.altText} 
              className={`w-full h-full object-cover image-transition absolute top-0 left-0 ${transitionClass}`}
            />
          </div>
          
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
            <p className="text-gray-700 mb-4">
              {currentImage.altText}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tablet layout (>=640px och <1024px) */}
      <div className="hidden sm:block lg:hidden">
        <div className="mb-10">
          <div className="h-96 relative overflow-hidden">
            <img 
              src={currentImage.image} 
              alt={currentImage.altText} 
              className={`w-full h-full object-cover image-transition absolute top-0 left-0 ${transitionClass}`}
            />
          </div>
          
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
            <p className="text-gray-700 mb-4">
              {currentImage.altText}
            </p>
          </div>
        </div>
      </div>
      
      {/* Desktop layout (>=1024px) */}
      <div className="hidden lg:block">
        <div className="mb-10">
          {/* Hero-sektion: Text till vänster, bild till höger */}
          <div className="flex flex-row mb-8">
            {/* Text till vänster */}
            <div className="w-1/2 p-8 flex items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
                <p className="text-gray-700 mb-4">
                  {currentImage.altText}
                </p>
              </div>
            </div>
            
            {/* Bild till höger med transition */}
            <div className="w-1/2 h-96 relative overflow-hidden">
              <img 
                src={currentImage.image} 
                alt={currentImage.altText} 
                className={`w-full h-full object-cover image-transition absolute top-0 left-0 ${transitionClass}`}
              />
            </div>
          </div>
          
          {/* Tre spots under hero med data från databasen */}
          <div className="grid grid-cols-3 gap-6">
            {spots.length > 0 ? (
              spots.map(spot => (
                <div key={spot.id} className="bg-gray-200 h-40 relative">
                  <img 
                    src={spot.image} 
                    alt={spot.altText}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{spot.title}</span>
                  </div>
                </div>
              ))
            ) : (
              // Placeholders om spots inte har laddats än
              Array(3).fill().map((_, index) => (
                <div key={index} className="bg-gray-200 h-40"></div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;