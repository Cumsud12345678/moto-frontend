import * as React from 'react';
import {
  IconHome2,
  IconHeart,
  IconPlus,
  IconUser,
} from '@tabler/icons-react';

import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const isScroll = useScrollTrigger();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: 'Ana səhifə',
      path: '/',
      icon: IconHome2,
    },
    {
      label: 'Seçilmişlər',
      path: '/bookmarks',
      icon: IconHeart,
    },
    {
      label: 'Əlavə et',
      path: '/new',
      icon: IconPlus,
      special: true,
    },
    {
      label: 'Profil',
      path: '/profile',
      icon: IconUser,
    },
  ];

  return (
    <Slide direction="up" in={!isScroll}>
      <div
        className="
          lg:hidden
          fixed bottom-[10px] left-[10px] right-[10px] z-[1000]
          rounded-3xl border border-gray-200 bg-white
          shadow-md px-1.5 py-2.5
        "
      >
        <div className="flex w-full items-center justify-between flex-nowrap">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            const Icon = item.icon;

            const iconColorClasses = item.special
              ? 'bg-green-600 text-white'
              : active
              ? 'bg-gray-900 text-white'
              : 'bg-transparent text-gray-500';

            return (
              <a
                key={item.path}
                href={item.path}
                className="flex flex-1 cursor-pointer flex-col items-center gap-1"
              >
                <div
                  className={`
                    flex h-[42px] w-[42px] items-center justify-center
                    rounded-full transition-colors
                    ${iconColorClasses}
                  `}
                >
                  <Icon size={24} stroke={2} />
                </div>

                <span
                  className={`
                    text-xs
                    ${active ? 'font-bold text-gray-900' : 'font-medium text-gray-500'}
                  `}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </Slide>
  );
}