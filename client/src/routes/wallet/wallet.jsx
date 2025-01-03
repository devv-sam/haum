import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";
import List from "../../components/list/List";

function Wallet() {
  const data = useLoaderData();

  return (
    <>
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
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Wallet;
