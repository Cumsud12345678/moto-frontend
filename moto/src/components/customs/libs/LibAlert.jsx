import { AlertDialog as HeroAlertDialog, Button, toast } from "@heroui/react";
import { useEffect, useState } from "react";

export default function LibAlert({openAlert, setOpenAlert, title, label = '', onClick, type}) {

  const [description, setDescription] = useState('')

  useEffect(() => {
    if (openAlert) setDescription('')
  }, [openAlert])

  return (
    <HeroAlertDialog isOpen={openAlert} onOpenChange={setOpenAlert}>
      <HeroAlertDialog.Backdrop className='z-[10000]'>
        <HeroAlertDialog.Container>
          <HeroAlertDialog.Dialog className="sm:max-w-[400px]">
            <HeroAlertDialog.CloseTrigger />
            <HeroAlertDialog.Header>
              <HeroAlertDialog.Icon status="danger" />
              <HeroAlertDialog.Heading>{title}</HeroAlertDialog.Heading>
            </HeroAlertDialog.Header>
            <HeroAlertDialog.Body>
              <p>
                {label}
              </p>
              {
                type == 'delete' && (
                  <div className="mt-4">
                    <span>Aciqlama</span>
                    <textarea 
                      className="border bg-white w-full rounded-xl p-4"
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Aciqlama yazin"
                    ></textarea>
                  </div>
                )
              }
            </HeroAlertDialog.Body>
            <HeroAlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                slot="close"
                onClick={() => {
                  type == 'delete'
                  ? onClick(description)
                  : onClick()
                }}
              >
                Onayla
              </Button>
            </HeroAlertDialog.Footer>
          </HeroAlertDialog.Dialog>
        </HeroAlertDialog.Container>
      </HeroAlertDialog.Backdrop>
    </HeroAlertDialog>
  )
}