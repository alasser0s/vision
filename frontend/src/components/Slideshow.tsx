import React, { useState } from "react";

interface Slides {
    image: string;
    url: string;
    content: string;
    alt: string;
    paragraph: string;
}

interface SlideProps {
    slides: Slides[];
}

const Slideshow: React.FC<SlideProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const setSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative w-full max-w-full mx-auto h-[712px] top-28">
            <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-full h-full">
                    <div className="absolute inset-0 transition-transform duration-500 ease-in transform">
                        <a href={slides[currentSlide].url}>
                            <img src={slides[currentSlide].image} alt={slides[currentSlide].alt} className="w-full h-full object-cover" />
                        </a>
                        <div className=" ">
                            <h1 className="text-3xl bottom-20 absolute left-1/2 transform -translate-x-1/2">
                                {slides[currentSlide].content}                            </h1>
                            <p className="text-lg bottom-12 absolute left-1/2 transform -translate-x-1/2">
                                {slides[currentSlide].paragraph}
                            </p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-l from-[#161616] to-transparent flex flex-col justify-center items-start p-10 px-16 py-5">
                        <h1 className="text-white text-4xl mb-5 font-bold">
                            عنوانك للمعرفة 
                        </h1>
                        <h2 className="text-white text-4xl mb-10">موقعك لاكتساب الخبره</h2>
                        <a href={slides[currentSlide].url} className="bg-blue-500 text-white px-4 py-2 rounded">انطلق</a>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex  gap-1 justify-evenly">


                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full flex gap-1 justify-evenly ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`}
                        onClick={() => setSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
