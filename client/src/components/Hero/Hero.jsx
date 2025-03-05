import { useState, useEffect } from 'react';

function Hero() {
  const [heroImages, setHeroImages] = useState([]);
  const [spots, setSpots] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/heroImages')
      .then(response => response.json())
      .then(data => setHeroImages(data))
      .catch(error => {
        console.error('Kunde inte hämta hero-bilder:', error);
        setError('Kunde inte hämta hero-bilder');
      });

    fetch('/api/spots')
      .then(response => response.json())
      .then(data => setSpots(data))
      .catch(error => {
        console.error('Kunde inte hämta spots:', error);
        setError('Kunde inte hämta spots');
      });
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex(prevIndex => (prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1));
          setTimeout(() => setIsTransitioning(false), 50);
        }, 500);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [heroImages]);

  if (error) {
    return <div className="h-64 bg-gray-200 text-red-500">{error}</div>;
  }

  if (heroImages.length === 0) {
    return <div className="h-64 bg-gray-200"></div>;
  }

  const currentImage = heroImages[currentIndex];
  const transitionClass = isTransitioning ? 'opacity-0' : 'opacity-100';

  return (
    <div>
      {/* Mobil layout (<640px) */}
      <div className="sm:hidden">
        <div className="mb-10">
          <div className="h-64 relative overflow-hidden">
            <img
              src={currentImage.image}
              alt={currentImage.altText}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
            />
          </div>
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
            <p className="text-gray-700 mb-4">{currentImage.altText}</p>
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
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
            />
          </div>
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
            <p className="text-gray-700 mb-4">{currentImage.altText}</p>
          </div>
        </div>
      </div>

      {/* Desktop layout (>=1024px) */}
      <div className="hidden lg:block p-4">
        <div className="mb-10">
          {/* Hero-sektion: Text till vänster, bild till höger */}
          <div className="flex flex-row mb-8">
            {/* Text till vänster */}
            <div className="w-1/2 p-8 flex items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">{currentImage.imageDescription}</h1>
                <p className="text-gray-700 mb-4">{currentImage.altText}</p>
              </div>
            </div>
            {/* Bild till höger med transition */}
            <div className="w-1/2 h-96 relative overflow-hidden">
              <img
                src={currentImage.image}
                alt={currentImage.altText}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
              />
            </div>
          </div>
          {/* Tre Spots */}
          <div className="grid grid-cols-3 gap-4">
            {spots.length > 0 &&
              spots.map(spot => (
                <img
                  key={spot.id}
                  src={spot.image}
                  alt={spot.altText || 'Spot image'}
                  className="w-full h-[300px] object-cover"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;