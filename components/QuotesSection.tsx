
import { useState, useEffect } from 'react';

const quotes = [
  {
    text: "Setiap cerita adalah bukti bahwa kita berjuang, bertahan, dan berharga.",
    author: "Kita Berharga"
  },
  {
    text: "Dalam kelemahan kita, tersimpan kekuatan yang belum kita sadari.",
    author: "Anonim"
  },
  {
    text: "Kisah terbaikmu mungkin berawal dari titik terendahmu.",
    author: "Anonim" 
  },
  {
    text: "Saat kau berbagi cerita, kau memberi harapan pada orang lain.",
    author: "Kita Berharga"
  },
  {
    text: "Ketika kita mendengarkan cerita orang lain, kita belajar melihat dunia dengan mata yang berbeda.",
    author: "Anonim"
  }
];

const QuotesSection = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      
      // Change quote after fade out animation
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-10 px-4 sm:px-6 bg-gradient-to-r from-kb-mint/10 to-kb-blue/10">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl text-center px-6 py-10 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm border border-kb-mint/20">
            <div className="relative h-32 flex items-center justify-center overflow-hidden">
              <div 
                className={`absolute transition-all duration-500 ease-in-out ${
                  isAnimating ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'
                }`}
              >
                <p className="text-xl md:text-2xl font-serif text-gray-800 mb-3 italic">
                  "{quotes[currentQuoteIndex].text}"
                </p>
                <p className="text-sm font-medium text-primary-foreground">
                  — {quotes[currentQuoteIndex].author}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-2">
              {quotes.map((_, index) => (
                <span 
                  key={index} 
                  className={`block w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentQuoteIndex === index ? 'bg-primary' : 'bg-kb-mint/30'
                  }`}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;
