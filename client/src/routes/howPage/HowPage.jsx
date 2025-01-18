const howitworks = () => {
  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="px-4 md:px-8 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-['Mona_Sans'] font-medium leading-tight mb-8">
                No more scrolling. Just great places: Haum.
              </h1>
            </div>
            <div>
              <p className="text-lg md:text-xl text-gray-600 font-['Mona_Sans']">
                With Haum, buying, renting, and investing in real estate has
                never been easier. Discover how blockchain technology ensures
                secure transactions, fractional ownership, and a seamless
                journey from browsing to closing deals—designed to empower you
                at every step.
              </p>
            </div>
          </div>
          <div className="w-full h-[500px]">
            <img
              src="/house-banner.jpeg"
              alt="banner"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default howitworks;
