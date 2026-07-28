import Stack from "@mui/material/Stack";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Alert from '@mui/material/Alert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

export default function DetailsRight({ user, price, city }){
  
  if (user && price && city) {

    const { name, profile, phone } = user

    const DEFAULT_IMAGE = import.meta.env.DEFAULT_IMAGE
    const BASE_URL = import.meta.env.VITE_API_URL;
    
    return (
      <div className="hidden lg:block lg:w-[35%] min-w-0">
        <div className="sticky top-[120px] z-[999] mt-3 rounded-lg border bg-white shadow-sm w-full h-auto">

          <div className="flex items-center justify-between border-b px-4 py-3">
            <h5 className="text-lg font-medium">Qiymət</h5>
            <h3 className="text-2xl font-semibold">{price} ₼</h3>
          </div>

          <div className="p-4">
            <div className="flex">
              <img
                src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'}
                alt="profile"
                className="h-[60px] w-[60px] rounded-full"
              />

              <div className="mx-2 flex flex-col">
                <span className="text-[18px] font-bold">{name}</span>
                <span>{city}</span>
              </div>
            </div>

            <div className="my-3 flex flex-row items-center rounded-lg border p-2">
              <FavoriteBorderIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Bəyən</span>
            </div>

            <div className="my-3 flex flex-row items-center rounded-lg border p-2">
              <ShareIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Paylaş</span>
            </div>

            <div className="my-3 flex flex-row items-center rounded-lg border p-2">
              <OutlinedFlagIcon sx={{ fontSize: "30px" }} />
              <span className="mx-2 text-xl font-medium">Şikayət et</span>
            </div>

            <div className="my-3 flex items-center gap-2 rounded bg-green-600 p-3 text-white">
              <LocalPhoneIcon sx={{ mx: 1 }} />
              <h4 className="m-0 p-0 text-xl font-semibold">
                {phone}
              </h4>
            </div>

            <Alert severity="warning">
              Motosikletə baxış keçirmədən öncə beh göndərməyin.
            </Alert>
          </div>

        </div>
      </div>
    )
  }
  
}