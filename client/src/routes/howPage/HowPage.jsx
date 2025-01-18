import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const containerRef = useRef(null);
  const headingsRef = useRef([]);
  const subHeadingsRef = useRef([]);
  const sectionsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Split text for animations
      const headings = document.querySelectorAll(".reveal-text");
      headings.forEach((heading) => {
        new SplitType(heading, { types: "words" });
      });

      // Hero section parallax
      gsap.from(".hero-content", {
        yPercent: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      // Sections reveal animation
      sectionsRef.current.forEach((section, index) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none",
          },
        });

        // Animate section number
        timeline.from(
          section.querySelector(".section-number"),
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0
        );

        // Animate heading words
        const words = section.querySelectorAll(".word");
        timeline.from(
          words,
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          0.2
        );

        // Animate subheading
        timeline.from(
          section.querySelector(".section-subheading"),
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0.4
        );

        // Animate description
        timeline.from(
          section.querySelector(".section-description"),
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          0.5
        );

        // Animate image
        timeline.from(
          section.querySelector(".section-image"),
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          0.3
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <div className="px-4 md:px-8 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* Hero section with increased spacing */}
        <div className="hero-content grid md:grid-cols-2 gap-12 items-center mb-32 pt-20">
          <div>
            <h1 className="reveal-text text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight mb-8">
              No more scrolling. Just great places. Just Haum.
            </h1>
          </div>
          <div>
            <p className="text-lg md:text-xl text-gray-600 font-['Mona_Sans']">
              With Haum, buying, renting, and investing in real estate has never
              been easier. Discover how blockchain technology ensures secure
              transactions, fractional ownership, and a seamless journey from
              browsing to closing deals—designed to empower you at every step.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div
          ref={(el) => (sectionsRef.current[0] = el)}
          className="grid md:grid-cols-2 gap-12 items-center mb-48"
        >
          <div className="space-y-6">
            <span className="section-number text-xl font-['Mona_Sans']">
              01.
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight">
              First, Connect Your Portfolio
            </h2>
            <p className="section-subheading text-xl text-gray-600">
              It{"'"}s as simple as ABC
            </p>
            <p className="section-description text-lg text-gray-500">
              Creating your Haum account is quick and seamless—just two clicks
              and you{"'"}re set! Your user profile acts as your command center,
              securely storing your listings and keeping all your bids organized
              in one place.
            </p>
            <a
              href="/wallet"
              className="inline-block mt-4 text-lg border-b-2 border-black hover:border-gray-500 transition-colors"
            >
              Connect your wallet →
            </a>
          </div>
          <div className="section-image h-[400px] md:h-[500px]">
            <img
              src="/mobile-login.png"
              alt="Connect portfolio"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Section 2 */}
        <div
          ref={(el) => (sectionsRef.current[1] = el)}
          className="grid md:grid-cols-2 gap-12 items-center mb-48"
        >
          <div className="space-y-6">
            <span className="section-number text-xl font-['Mona_Sans']">
              02.
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight">
              Sell… or Buy?
            </h2>
            <p className="section-subheading text-xl text-gray-600">
              Browse personalized listings or share your own with the world
            </p>
            <p className="section-description text-lg text-gray-500">
              Haum makes it effortless to create listings. Upload stunning
              pictures, provide key details like location, and even set an
              auto-delisting time to manage your properties with ease.
              Meanwhile, our personalized Marketplace is your gateway to
              discovering curated opportunities.
            </p>
            <a
              href="/list"
              className="inline-block mt-4 text-lg border-b-2 border-black hover:border-gray-500 transition-colors"
            >
              Explore marketplace →
            </a>
          </div>
          <div className="section-image h-[400px] md:h-[500px]">
            <img
              src="/house-banner.jpeg"
              alt="Marketplace"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Section 3 */}
        <div
          ref={(el) => (sectionsRef.current[2] = el)}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <span className="section-number text-xl font-['Mona_Sans']">
              03.
            </span>
            <h2 className="reveal-text text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight">
              Place Your Bid
            </h2>
            <p className="section-subheading text-xl text-gray-600">
              One click, endless possibilities
            </p>
            <p className="section-description text-lg text-gray-500">
              Bidding on properties has never been easier. With a single click,
              you can place a bid or save your favorite properties. Our
              streamlined system ensures your real estate journey is both simple
              and stress-free.
            </p>
          </div>
          <div className="section-image h-[400px] md:h-[500px]">
            <img
              src="/house-banner.jpeg"
              alt="Bidding"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
