import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import List from "../../components/list/List";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
function Portfolio() {
  const data = useLoaderData();

  return (
    <>
      {/* Saved List Section */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold font-mona_sans">Portfolio</h2>
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
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      {/* My List Section */}
      <div className="bg-white rounded-2xl shadow-sm mb-8">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold font-mona_sans">My Listings</h2>
            <Link to="/add">
              <button className="inline-flex items-center px-8 py-4 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Unit
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
    </>
  );
}

export default Portfolio;
