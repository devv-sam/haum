import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
const steps = [
  {
    number: "01",
    title: "Connect your portfolio",
    image: "/mobile-login.png",
  },
  {
    number: "02",
    title: "Sell and buy on our custom marketplace",
    image: "/marketplace.png",
  },
  {
    number: "03",
    title: "Place bids and build collections",
    image: "/buysell.png",
  },
];

const HomeHowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const progressRefs = useRef([]);
  const timeoutRef = useRef(null);

  const resetInterval = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    timeoutRef.current = setInterval(nextStep, 5000);
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const animateProgressBar = (index) => {
    if (index === currentStep) {
      gsap.fromTo(
        progressRefs.current[index],
        {
          width: "0%",
        },
        {
          width: "100%",
          duration: 5,
          ease: "none",
        }
      );
    } else {
      gsap.set(progressRefs.current[index], { width: "0%" });
    }
  };

  const animateImage = () => {
    gsap
      .timeline()
      .to(imageRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .set(imageRef.current, {
        attr: { src: steps[currentStep].image },
      })
      .to(imageRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
  };

  useEffect(() => {
    steps.forEach((_, index) => {
      animateProgressBar(index);
    });
    animateImage();
  }, [currentStep]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const handleStepClick = (index) => {
    setCurrentStep(index);
    resetInterval();
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8 lg:gap-12 items-start">
          <div>
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <img
                ref={imageRef}
                src={steps[0].image}
                alt="App preview"
                className="w-full h-auto object-cover rounded-lg bg-[#cfd0cf]"
              />
            </div>
          </div>

          <div className="space-y-8 lg:space-y-12 mt-8 lg:mt-0">
            {steps.map((step, index) => (
              <div
                key={index}
                onClick={() => handleStepClick(index)}
                className={`cursor-pointer border-b border-gray-200 pb-8 lg:pb-12 transition-all duration-300 ${
                  index === currentStep
                    ? "opacity-100"
                    : "opacity-30 hover:opacity-50"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-baseline space-x-4 lg:space-x-8">
                    <span className="text-xl lg:text-2xl text-gray-400 font-['Mona_Sans'] font-medium">
                      {step.number}.
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-['Mona_Sans'] font-medium">
                      {step.title}
                    </h3>
                  </div>
                  {index === currentStep && (
                    <div className="ml-12 lg:ml-16">
                      <div className="h-0.5 bg-gray-100 relative w-24">
                        <div
                          ref={(el) => (progressRefs.current[index] = el)}
                          className="absolute top-0 left-0 h-full bg-black"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <a
              href="/how-it-works"
              className="inline-flex items-center space-x-2 text-lg sm:text-xl w-full md:w-auto bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 font-['Mona_Sans'] transition-colors  text-center mt-8"
            >
              <span>Discover how it works</span>
              <span className="text-2xl hidden md:block">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHowItWorks;
