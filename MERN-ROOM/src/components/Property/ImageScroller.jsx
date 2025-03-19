import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";
import img5 from "../../assets/img5.jpeg";

export default function ImageScroller() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [img1, img2, img3, img4, img5];

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
      const newIndex = Math.round(scrollRef.current.scrollLeft / 300);
      setActiveIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
    }
  };
  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = index * 300;
      setActiveIndex(index);
    }
  };
  return (
    <div className="w-[70%]  p-0 m-10 flex-start">
      <div className="relative w-full">
        <button
          onClick={() => scroll(-300)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-scroll scroll-smooth py-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((src, index) => (
            <div 
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${
                activeIndex === index 
                  ? "scale-100 opacity-100" 
                  : "scale-95 opacity-80"
              }`}
              onClick={() => scrollToIndex(index)}
            >
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="w-72 h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll(300)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white p-3 rounded-full z-10 hover:bg-black/80 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === index 
                ? "bg-blue-600 w-4" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}