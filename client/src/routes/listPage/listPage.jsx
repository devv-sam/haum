import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { Await } from "react-router-dom";

function ListPage() {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50 md:px-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 p-4 lg:p-6 lg:overflow-y-auto lg:max-h-screen">
          <div className="max-w-5xl mx-auto">
            <Filter />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Suspense
                fallback={
                  <div className="col-span-2 text-center py-8 text-gray-500 font-[mona_sans]">
                    Loading properties...
                  </div>
                }
              >
                <Await
                  resolve={data.postResponse}
                  errorElement={
                    <div className="col-span-2 text-center py-8 text-red-500 font-[mona_sans]">
                      Error loading properties!
                    </div>
                  }
                >
                  {(postResponse) =>
                    postResponse.data.map((post) => (
                      <Card key={post.id} item={post} />
                    ))
                  }
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/3 h-screen sticky top-0">
          <Suspense fallback={<div className="w-full h-full bg-gray-100" />}>
            <Await
              resolve={data.postResponse}
              errorElement={
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-red-500 font-[mona_sans]">
                  Error loading map!
                </div>
              }
            >
              {(postResponse) => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ListPage;
