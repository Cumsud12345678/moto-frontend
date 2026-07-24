import { Box, Skeleton } from "@mui/material";

export default function ProfileSkeleton(){

  const skeletonArr = [1,2,3,4]

  return(
    <div style={{ maxWidth: '1000px', marginTop: '80px' }} className="container mx-auto p-3">
      <div className="flex items-center justify-between bg-white p-3 rounded-sm">
        <div className="flex items-center">
          <div>
            <Skeleton variant="circular" width={45} height={45} />
          </div>
          <div style={{ marginLeft: '10px' }} className="flex flex-col">
            <Skeleton variant="text" sx={{ width: '100px' }} />
            <Skeleton variant="text" sx={{ width: '200px' }} />
          </div>
        </div>
      </div>
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
        {
          skeletonArr.map((sk, index) => {
            return (
              <div className="col">
                <Skeleton variant="rounded" height={170} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <div className="flex justify-between mt-3">
                  <Skeleton variant="rounded" width={100} height={30} />
                  <Skeleton variant="rounded" width={100} height={30} />
                </div>
              </div>
            )

          })
        }
      </Box>
    </div>
  )
}