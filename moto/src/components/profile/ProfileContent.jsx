import { Avatar, Box, IconButton } from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Tabs } from "@heroui/react";
import { useSelector } from "react-redux";
import Dialog from "./Dialog";
import { useEffect, useState } from "react";
import ProductCardProfile from "./ProductCardProfile";
import AlertDialog from "./AlertDialog";
import EmptyData from "../EmptyData";

export default function ProfileContent({products}) {

  const BASE_URL = import.meta.env.VITE_API_URL

  const { id, name, email, profile } = useSelector(s => s.user)

  const [open, setOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setOpen(!open)
  }

  const [openAlert, setOpenAlert] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const clickDelete = (id) => {
    setDeleteId(id)
    setOpenAlert(true)
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // cleanup - komponent unmount olanda da bərpa etsin
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const activeProducts = products.filter(p => p.isActive == true) 
  const deactiveProducts = products.filter(p => p.isActive == false)

  return (
    <div style={{ maxWidth: '1000px', marginTop: '60px' }} className="container mx-auto p-3 mb-29">
      <div className="flex items-center justify-between bg-white p-3 rounded-sm">
        <div className="flex items-center">
          <div>
            <Avatar alt="Remy Sharp" src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'} sx={{ width: 56, height: 56 }} />
          </div>
          <div style={{ marginLeft: '10px' }} className="flex flex-col">
            <span>{name}</span>
            <span>{email}</span>
          </div>
        </div>
        <IconButton onClick={handleDialogOpen}>
          <EditSquareIcon />
        </IconButton>
      </div>

      <Tabs className="w-full mt-4">
        <Tabs.ListContainer>
          <Tabs.List className="w-full lg:w-1/2" aria-label="Options">
            <Tabs.Tab id="overview">
              Aktiv ({activeProducts.length})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="reports">
              İmtina ({deactiveProducts.length})
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="all">
              Hamısı ({products.length})
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-2 w-full" id="overview">
          <div style={{ maxWidth: '1100px' }}>
            {
              activeProducts.length == 0 &&
              <EmptyData />
            }
            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {
                activeProducts.map((p) => (
                  <ProductCardProfile deleteClick={clickDelete} product={p} key={p._id} />
                ))
              }
            </Box>
          </div>
        </Tabs.Panel>
        <Tabs.Panel className="pt-2 w-full" id="reports">
          <div style={{ maxWidth: '1100px' }}>
            {
              deactiveProducts.length == 0 &&
              <EmptyData />
            }
            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {
                deactiveProducts.map((p) => (
                  <ProductCardProfile deleteClick={clickDelete} product={p} key={p._id} />
                ))
              }
            </Box>
          </div>
        </Tabs.Panel>
        <Tabs.Panel className="pt-2 w-full" id="all">
          <div style={{ maxWidth: '1100px' }}>
            {
              products.length == 0 &&
              <EmptyData />
            }
            <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4">
              {
                products.map((p) => (
                  <ProductCardProfile deleteClick={clickDelete} product={p} key={p._id} />
                ))
              }
            </Box>
          </div>
        </Tabs.Panel>
      </Tabs>

      <Dialog open={open} value={name} img={profile} onClose={handleDialogOpen} />

      <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} deleteId={deleteId} />

    </div>
  )
}