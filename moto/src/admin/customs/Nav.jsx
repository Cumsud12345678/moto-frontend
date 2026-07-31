import { useLocation, useNavigate } from 'react-router-dom';
import { DatabaseFill, Rocket, Persons, Cube, ChevronDown,  } from '@gravity-ui/icons';
import {Accordion} from "@heroui/react";

export function Nav() {

  const navigate = useNavigate()
  const location = useLocation()

  const metadataList = [
    {
      label: 'Marka, Model',
      path: 'make&model'
    },
    {
      label: 'Model',
      path: 'model'
    },
    {
      label: 'Kateqoriya',
      path: 'category'
    },
    {
      label: 'Şəhər',
      path: 'city'
    },
    {
      label: 'Rəng',
      path: 'color'
    },
    {
      label: 'Yanacaq',
      path: 'fuel'
    },
    {
      label: 'Sürətlər qutusu',
      path: 'speed'
    },
    {
      label: 'Vəziyyəti',
      path: 'status'
    },
    {
      label: 'Təchizat',
      path: 'equipment'
    }
  ]

  const items = [
    {
      content:
        <div className='flex flex-col'>
          {
            metadataList.map(data => (
              <button
                key={data.path}
                onClick={() => navigate(`/admin/metadata#${data.path}`)}
                className={`mt-2 flex items-center gap-2 p-2 w-full
                cursor-pointer hover:bg-gray-200 rounded-xl
                 ${location.pathname == `/admin/metadata/${data.path}` && 'border border-green-500 bg-green-200'}`}
              >
                <span>{data.label}</span>
              </button>
            ))
          }
        </div>,
      icon: <DatabaseFill />,
      title: "Metadata",
    }
  ];

  return (
    <div className='bg-white h-[100vh] p-5 overflow-auto w-[300px]'>
      <h2 className='text-xl font-bold'>Admin panel</h2>
      <div
        onClick={() => navigate('/admin')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin' && 'border border-green-500 bg-green-200'}`}
      >
        <Rocket className='text-muted' />
        <span>Statistica</span>
      </div>
      <div
        onClick={() => navigate('/admin/users')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin/users' && 'border border-green-500 bg-green-200'}`}
      >
        <Persons className='text-muted' />
        <span>Users</span>
      </div>
      <div
        onClick={() => navigate('/admin/products')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin/products' && 'border border-green-500 bg-green-200'}`}
      >
        <Cube className='text-muted' />
        <span>Elanlar</span>
      </div>
      <div
        onClick={() => navigate('/admin/deleted/users')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin/deleted/users' && 'border border-green-500 bg-green-200'}`}
      >
        <Cube className='text-muted' />
        <span>Silinen isdifadəçilər</span>
      </div>
      <div
        onClick={() => navigate('/admin/deleted/products')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin/deleted/products' && 'border border-green-500 bg-green-200'}`}
      >
        <Cube className='text-muted' />
        <span>Silinən elanlar</span>
      </div>

      <div
        onClick={() => navigate('/admin/adsense')}
        className={`mt-3 flex items-center gap-2 p-2 w-[180px] 
        cursor-pointer hover:bg-gray-200 rounded-xl
        ${location.pathname == '/admin/adsense' && 'border border-green-500 bg-green-200'}`}
      >
        <Cube className='text-muted' />
        <span>Adsense</span>
      </div>

      <Accordion className="w-full max-w-md" variant="surface">
        {items.map((item, index) => (
          <Accordion.Item key={index}>
            <Accordion.Heading>
              <Accordion.Trigger 
                style={{fontSize: '17px'}}
                className='p-0 m-0 mt-3 flex items-center gap-2 p-2 
                w-[180px] cursor-pointer hover:bg-gray-200 rounded-xl'
              >
                {item.icon ? (
                  <span className="mr-0 size-4 shrink-0 text-muted">{item.icon}</span>
                ) : null}
                {item.title}
                <Accordion.Indicator>
                  <ChevronDown />
                </Accordion.Indicator>
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>{item.content}</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      


    </div>
  )
}