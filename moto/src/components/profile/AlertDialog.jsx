import { AlertDialog as HeroAlertDialog, Button, toast } from "@heroui/react";
import { deleteProduct } from "../../redux/slices/product/productSlice";
import { useDispatch } from "react-redux";

export default function AlertDialog({openAlert, setOpenAlert, deleteId}) {

  const dispatch = useDispatch()

  return (
    <HeroAlertDialog isOpen={openAlert} onOpenChange={setOpenAlert}>
      <HeroAlertDialog.Backdrop className='z-[10000]'>
        <HeroAlertDialog.Container>
          <HeroAlertDialog.Dialog className="sm:max-w-[400px]">
            <HeroAlertDialog.CloseTrigger />
            <HeroAlertDialog.Header>
              <HeroAlertDialog.Icon status="danger" />
              <HeroAlertDialog.Heading>Delete project permanently?</HeroAlertDialog.Heading>
            </HeroAlertDialog.Header>
            <HeroAlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </HeroAlertDialog.Body>
            <HeroAlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                onPress={() => {
                  toast.promise(
                    dispatch(deleteProduct({ id: deleteId })).unwrap(),
                    {
                      loading: "Məhsul silinir...",
                      success: "Məhsul uğurla silindi.",
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