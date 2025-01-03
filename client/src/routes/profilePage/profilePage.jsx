import React, { useContext, Suspense } from "react";
import { Link, useNavigate, useLoaderData, Await } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { UserCircle, LogOut, Edit, PlusCircle } from "lucide-react";
import List from "../../components/list/List";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Profile Card */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold font-mona_sans">Profile</h1>
              <Link to="/profile/update">
                <button className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle className="w-24 h-24 text-gray-400" />
                )}

                <div className="flex-1 space-y-4 text-center sm:text-left">
                  <div>
                    <p className="text-sm text-gray-500 font-mona_sans">
                      Full Name
                    </p>
                    <p className="text-lg font-medium font-mona_sans">
                      {currentUser.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 font-mona_sans">
                      Username
                    </p>
                    <p className="text-lg font-medium font-mona_sans">
                      {currentUser.username}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 font-mona_sans">
                      Email
                    </p>
                    <p className="text-lg font-medium font-mona_sans">
                      {currentUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* My List Section */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-mona_sans">My Posts</h2>
              <Link to="/add">
                <button className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create New Post
                </button>
              </Link>
            </div>
            <Suspense
              fallback={
                <div className="text-center py-8 text-gray-500 font-mona_sans">
                  Loading posts...
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={
                  <div className="text-center py-8 text-red-500 font-mona_sans">
                    Error loading posts!
                  </div>
                }
              >
                {(postResponse) => <List posts={postResponse.data.userPosts} />}
              </Await>
            </Suspense>
          </div>
        </div>

        {/* Saved List Section */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold font-mona_sans">Saved Posts</h2>
            </div>
            <Suspense
              fallback={
                <div className="text-center py-8 text-gray-500 font-mona_sans">
                  Loading saved posts...
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={
                  <div className="text-center py-8 text-red-500 font-mona_sans">
                    Error loading saved posts!
                  </div>
                }
              >
                {(postResponse) => (
                  <List posts={postResponse.data.savedPosts} />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
