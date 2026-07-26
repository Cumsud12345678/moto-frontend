import { Nav } from './customs/Nav';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "@heroui/react";
import { createMetadata, getMetadata, setData } from '../../redux/slices/admin/adminMetadataSlice';
import { useLocation } from 'react-router-dom';
import MakeModel from './metadata/MakeModel';
import Model from './metadata/Model';
import Category from './metadata/Category';
import City from './metadata/City';
import Color from './metadata/Color';
import Fuel from './metadata/Fuel';
import Speed from './metadata/Speed';
import Status from './metadata/Status';
import Equipment from './metadata/Equipment';

export default function Metadata() {

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    toast.promise(
      dispatch(getMetadata()).unwrap(),
      {
        loading: 'Yuklenir...',
        success: 'Yuklendi',
        error: (err) => err.message || 'Bir xeta oldu!'
      }
    )
  }, [])

  const {
    makes,
    models,
    fuels,
    speeds,
    cities,
    colors,
    categories,
    statuses,
    equipments,
  } = useSelector(s => s.adminMetadata)

  const setForm = (data, type) => {
    const firstValue = Object.values(data)[0];
    toast.promise(
      dispatch(createMetadata(data)).unwrap(),
      {
        loading: 'Kayit etklenir',
        success: () => {
          dispatch(setData({
            type: type,
            label: firstValue
          }))
          return 'Kayit eklendi.'
        },
        error: (err) => err.message || 'Xeta bas verdi'
      }
    )
  }

  return(
    <div className='flex flex-row'>
      <Nav />
      <div className="container mx-auto max-w-[1100px] h-[100vh] overflow-auto p-5">
        <div className="grid lg:grid-cols-2 gap-5 my-20">

          {
            location.hash === '#make&model' 
              &&  <MakeModel makes={makes} models={models} />
          }

          {
            location.hash === '#model'
              && <Model makes={makes} models={models} />
          }

          {
            location.hash === '#category'
              && <Category categories={categories} setForm={setForm} />
          }

          {
            location.hash == '#city'
              && <City cities={cities} setForm={setForm} />
          }

          {
            location.hash == '#color'
              && <Color colors={colors} setForm={setForm} />
          }

          {
            location.hash == '#fuel'
              && <Fuel fuels={fuels} setForm={setForm} />
          }

          {
            location.hash == '#speed'
              && <Speed speeds={speeds} setForm={setForm} />
          }

          {
            location.hash == '#status'
              && <Status statuses={statuses} setForm={setForm} />
          }

          {
            location.hash == '#equipment'
              && <Equipment equipments={equipments} setForm={setForm} />
          }
          
        </div>
      </div>
    </div>
  )
}