import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const name = fname + " " + lname;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await apiRequest.post("/api/auth/register", {
        name,
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen max-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative">
        <img
          src="/modernhouse.jpg"
          alt="Background"
          className="object-cover w-full h-full brightness-75"
        />
        <div className="absolute bottom-20 left-10 z-10">
          <div className="relative">
            <div className="absolute inset-0 "></div>
            <h2 className="relative z-10 text-4xl font-[mona_sans] font-medium leading-tight max-w-md text-white p-6">
              Experience the future of real estate with blockchain technology.
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-[mona_sans] font-medium text-gray-900">
              Create an account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-1">
                <input
                  name="fname"
                  type="text"
                  placeholder="First name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex-1">
                <input
                  name="lname"
                  type="text"
                  placeholder="Last name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-[mona_sans] rounded-lg transition-colors duration-200"
            >
              Create account
            </button>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm text-center">
                {error}
              </p>
            )}

            <div className="text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-[mona_sans]"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
