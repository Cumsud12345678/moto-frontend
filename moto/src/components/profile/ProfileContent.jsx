import { Avatar, Badge, Box, IconButton } from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { Tabs } from "@heroui/react";
import { useSelector } from "react-redux";
import ProfileDialog from "./ProfileDialog";
import MessageDialog from "./MessageDialog";
import { useEffect, useState } from "react";
import ProductCardProfile from "./ProductCardProfile";
import AlertDialog from "./AlertDialog";
import EmptyData from "../EmptyData";
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function ProfileContent({products, activeProducts, deactiveProducts}) {

  const BASE_URL = import.meta.env.VITE_API_URL
  const { id, name, email, profile } = useSelector(s => s.user)

  const [openProfile, setOpenProfile] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  const [messagesCount, setMessagesCount] = useState(0)

  const {
    systemMessages
  } = useSelector(s=> s.product)

  useEffect(() => {
    if(systemMessages) {
      const count = systemMessages.filter(msg => !msg.views)
      setMessagesCount(count.length)
    }
  }, [systemMessages])
  
  const handleDialogOpenProfile = () => {
    setOpenProfile(!openProfile)
  }
  const handleDialogOpenMessage = () => {
    setOpenMessage(!openMessage)
  }

  const [openAlert, setOpenAlert] = useState(false)
  const [deleteId, setDeleteId] = useState('')

  const clickDelete = (id) => {
    setDeleteId(id)
    setOpenAlert(true)
  }

  useEffect(() => {
    if (openProfile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // cleanup - komponent unmount olanda da bərpa etsin
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openProfile]);

  return (
    <div style={{ maxWidth: '1000px', marginTop: '60px' }} className="container mx-auto p-3 mb-29">
      <div className="flex items-center justify-between bg-white p-3 rounded-sm">
        <div className="flex items-center w-full max-w-[70%]">
          <div>
            <Avatar alt="Remy Sharp" src={profile ? `${BASE_URL}/uploads/${profile}` : '/profile.jpg'} sx={{ width: 56, height: 56 }} />
          </div>
          <div style={{ marginLeft: '10px' }} className="flex flex-col w-full min-w-[100px]">
            <span>{name}</span>
            <span className="truncate">{email}</span>
          </div>
        </div>
        <div className="flex">
          <IconButton onClick={handleDialogOpenProfile}>
            <EditSquareIcon />
          </IconButton>
          <IconButton onClick={handleDialogOpenMessage}>
              <Badge badgeContent={messagesCount} color="error">
                <NotificationsIcon />
              </Badge>
          </IconButton>
        </div>
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
                  <ProductCardProfile deleteClick={clickDelete} product={p} type={p.is_active} key={p._id} />
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
                  <ProductCardProfile deleteClick={clickDelete} product={p} type={p.is_active} key={p._id} />
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
                  <ProductCardProfile deleteClick={clickDelete} product={p} type={p.is_active} key={p._id} />
                ))
              }
            </Box>
          </div>
        </Tabs.Panel>
      </Tabs>

      <ProfileDialog open={openProfile} value={name} img={profile} onClose={handleDialogOpenProfile} />
      <MessageDialog open={openMessage} onClose={handleDialogOpenMessage} messages={systemMessages} />


      <AlertDialog openAlert={openAlert} setOpenAlert={setOpenAlert} deleteId={deleteId} />

    </div>
  )
}