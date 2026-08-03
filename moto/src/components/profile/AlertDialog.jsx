import { AlertDialog as HeroAlertDialog, Button, toast } from "@heroui/react";
import { deleteProduct } from "../../redux/slices/product/productSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function AlertDialog({openAlert, setOpenAlert, deleteId}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const path = location.pathname.split('/', 2)

  return (
    <HeroAlertDialog isOpen={openAlert} onOpenChange={setOpenAlert}>
      <HeroAlertDialog.Backdrop className='z-[10000]'>
        <HeroAlertDialog.Container>
          <HeroAlertDialog.Dialog className="sm:max-w-[400px]">
            <HeroAlertDialog.CloseTrigger />
            <HeroAlertDialog.Header>
              <HeroAlertDialog.Icon status="danger" />
              <HeroAlertDialog.Heading>Silmək isdədiyinizə əminsiniz?</HeroAlertDialog.Heading>
            </HeroAlertDialog.Header>
            <HeroAlertDialog.Body>
              <p>
                Silinən elan birdaha bərpa olunmur.
              </p>
            </HeroAlertDialog.Body>
            <HeroAlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Geri
              </Button>
              <Button
                slot="close"
                onPress={() => {
                  toast.promise(
                    dispatch(deleteProduct(deleteId)).unwrap(),
                    {
                      loading: "Məhsul silinir...",
                      success: () => {
                        if(path[1] == 'elanlarim') {
                          navigate(-1)
                        }
                        return "Məhsul silindi" 
                      },
                      error: (err) => err.message || "Xəta baş verdi.",
                    }
                  );
                }}
              >
                Sil
              </Button>
            </HeroAlertDialog.Footer>
          </HeroAlertDialog.Dialog>
        </HeroAlertDialog.Container>
      </HeroAlertDialog.Backdrop>
    </HeroAlertDialog>
  )
}