import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import SplitType from "split-type";
import SearchBar from "../../components/searchBar/SearchBar";
import Showcase from "../../components/showcase/Showcase";
import { Link } from "react-router-dom";
import HomeHowItWorks from "../../components/HomeHowItWorks";

gsap.registerPlugin(Flip);

function HomePage() {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Split text into characters, words, and lines
    const splitHeading = new SplitType(headingRef.current, { types: "words" });
    const splitParagraph = new SplitType(paragraphRef.current, {
      types: "lines",
    });

    // Animate split text for heading
    gsap.from(splitHeading.words, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
    });

    // Animate lines for the paragraph
    gsap.from(splitParagraph.lines, {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    // GSAP Flip animation for the image
    const ctx = gsap.context(() => {
      const flipState = Flip.getState(imageRef.current);

      // Initially shrink the image container to simulate a slit
      gsap.set(imageContainerRef.current, {
        height: "0px",
        overflow: "hidden",
      });

      // Expand to full height and reveal the image
      gsap.to(imageContainerRef.current, {
        height: "500px",
        duration: 1.2,
        ease: "power3.out",
        onComplete: () => {
          // Animate the image in its final position with Flip
          Flip.from(flipState, {
            duration: 1.2,
            ease: "power3.out",
          });
        },
      });
    });

    // Cleanup
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-8 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight mb-8"
            >
              Real Estate, Reinvented: Powered by Blockchain
            </h1>
          </div>
          <div className="flex flex-col gap-4">
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl text-gray-600 font-['Mona_Sans']"
            >
              Our blockchain-powered platform enables buying, selling, and
              fractional ownership of tokenized real estate.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Link
                to="/portfolio"
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 font-['Mona_Sans'] transition-colors text-lg text-center"
              >
                Launch Portfolio
              </Link>
              <Link
                to="/how-it-works"
                className="w-full md:w-auto bg-blue-100 text-blue-600 px-6 py-4 rounded-full hover:bg-blue-200 font-['Mona_Sans'] transition-colors text-lg text-center"
              >
                How it works
              </Link>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            ref={imageContainerRef}
            className="relative overflow-hidden rounded-3xl mb-8 w-full"
          >
            <img
              ref={imageRef}
              src="/house-banner.jpeg"
              alt="Modern Houses"
              className="w-full h-[500px] object-cover"
            />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[90%]">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 sm:px-6 lg:px-8">
        <Showcase />
      </div>
      <div className="px-4 md:px-8 sm:px-6 lg:px-8">
        <HomeHowItWorks />
      </div>
    </div>
  );
}

export default HomePage;
