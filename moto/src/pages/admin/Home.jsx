import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { dataset, valueFormatter } from './dataset/weather';
import { PieChart } from '@mui/x-charts/PieChart';
import { Nav } from './customs/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { getUserStats } from '../../redux/slices/admin/adminUserSlice';
import { getProductStats } from '../../redux/slices/admin/adminProductSlice';
import { toast } from '@heroui/react';

export default function Home() {

  const chartSetting = {
    yAxis: [
      {
        label: "Isdifadeci artisi",
        width: 60,
      },
    ],
    series: [
      {
        dataKey: "total",
        label: "",
      },
    ],
    height: 300,
  };

  const data = [
    { label: 'Group A', value: 400, color: '#0088FE' },
    { label: 'Group B', value: 300, color: '#00C49F' },
    { label: 'Group C', value: 300, color: '#FFBB28' },
    { label: 'Group D', value: 200, color: '#FF8042' },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  const dispatch = useDispatch()

  React.useEffect(() => {
    toast.promise(
      dispatch(getUserStats()).unwrap(),
      {
        error: (err) => err.message || 'Xeta oldu'
      }
    )

    toast.promise(
      dispatch(getProductStats()).unwrap(),
      {
        error: (err) => err.message || 'Xeta oldu'
      }
    )
  }, [])

  const { stats } = useSelector(s => s.adminUsers)
  const { productStats } = useSelector(s => s.adminProducts)

  console.log(stats)

  return(

    <div className='flex flex-row'>
      
      <Nav />

      <div className="container mx-auto max-w-[1000px]">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                isdifadeci sayi
                <span className='text-sm text-black'> (Hamisi)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{stats.all}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                isdifadeci sayi
                <span className='text-sm text-black'> (1 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{stats.today}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                isdifadeci sayi
                <span className='text-sm text-black'> (7 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{stats.week}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                isdifadeci sayi
                <span className='text-sm text-black'> (30 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{stats.month}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>


          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                Elan sayi
                <span className='text-sm text-black'> (Hamisi)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{productStats?.all}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                Elan sayi
                <span className='text-sm text-black'> (1 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{productStats?.today}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                Elan sayi
                <span className='text-sm text-black'> (7 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{productStats?.week}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white flex flex-col border">
            <div>
              <span className='text-sm text-gray-500'>
                Elan sayi
                <span className='text-sm text-black'> (30 gun)</span>
              </span>
            </div>
            <div className='flex flex-row items-center pt-2 gap-3'>
              <div className='flex items-center gap-2'>
                <h2 className='text-3xl font-bold'>+{productStats?.month}</h2>
                <div className='border rounded-lg px-1 bg-green-100'>
                  <span className='text-sm text-green-400'>+5%</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className='grid grid-cols-4 gap-5 bg-white mt-4 rounded-xl'>
          <div className='col-span-3'>
            <BarChart
              dataset={dataset}
              xAxis={[
                {
                  dataKey: "month",
                  tickPlacement: "middle",
                },
              ]}
              {...chartSetting}
            />
          </div>
          <div className='flex flex-xol'>
            <PieChart
              series={[{ innerRadius: 50, outerRadius: 100, data, arcLabel: 'value' }]}
              {...settings}
            />
          </div>
        </div>

      </div>


    </div>
    


  )
}