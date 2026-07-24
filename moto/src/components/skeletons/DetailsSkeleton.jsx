import {Skeleton} from "@heroui/react";
import Header from "../header/Header";

export function DetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-[1000px] px-4">

      <Header dur={true} />

      <Skeleton className="h-10 rounded-xl mt-18" />
     
      <div className="flex gap-3 flex-col lg:flex-row">

        <div className="flex flex-col w-full mt-3">
          <div className="lg:hidden fixed top-0 bg-gray-500 text-white">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center">
                <Skeleton className="h-14 rounded-xl" />
              </div>
            </div>
          </div>

          <div className="flex">
            <Skeleton className="h-100 w-full rounded-xl" />
          </div>
          <div className="flex gap-1 my-2">
            <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
            <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
            <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
          </div>

          <div className="border-y py-3 my-1 flex flex-col lg:gap-2 text-lg">
          {
            [...Array(3)].map((_, index) => (
              <div key={index} className="flex flex-col gap-2 w-full">
                {
                  [...Array(2)].map((_, index) => (
                    <div key={index} className="grid grid-cols-2">
                      <Skeleton className="h-4 w-4/6 rounded" />
                      <Skeleton className="h-4 w-4/6 rounded" />
                    </div>
                  ))
                }
              </div>
            ))
          }
          </div>

          <div className="flex flex-col border-b py-3 gap-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <Skeleton className="h-4 w-4/6 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/6 rounded" />
          </div>

          <div className="lg:hidden border-y py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-36 rounded-lg" />
                <Skeleton className="h-3 w-24 rounded-lg" />
              </div>
            </div>

            <Skeleton className="h-14 rounded-xl my-3" />
           
            <Skeleton className="h-4 w-full rounded" />
          </div>

        </div>


        <div className="hidden lg:block w-[60%]">
          <div className="sticky top-[120px] z-[999] mt-3 rounded-lg border bg-white shadow-sm w-full h-auto">

            <div className="flex items-center justify-between border-b px-4 py-3">
              <Skeleton className="h-8 w-full rounded" />
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-14 w-14 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-36 rounded-lg" />
                  <Skeleton className="h-3 w-24 rounded-lg" />
                </div>
              </div>

              {
                [...Array(2).map((_, index) => (
                  <div key={index} className="my-3 flex flex-row items-center rounded-lg border p-2">
                    <Skeleton className="h-4 w-2/6 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                ))]
              }

              <Skeleton className="h-10 rounded-xl my-3" />
             
              <Skeleton className="h-4 w-full rounded" />
            </div>

          </div>
        </div>



      </div>

    </div>
  );
}