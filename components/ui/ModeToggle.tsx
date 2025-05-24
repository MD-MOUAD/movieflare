'use client'

import * as React from 'react'
import { Moon, MoonIcon, Monitor, Sun, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './menubar'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <Menubar className="!size-fit !p-0">
      <MenubarMenu>
        <MenubarTrigger className="flex !size-8 items-center justify-center !bg-transparent !p-0">
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </MenubarTrigger>
        <MenubarContent align="end">
          <MenubarItem
            className="space-x-1.5"
            onClick={() => setTheme('light')}
          >
            <SunIcon />
            <span>Light</span>
          </MenubarItem>
          <MenubarItem className="space-x-1.5" onClick={() => setTheme('dark')}>
            <MoonIcon />
            <span>Dark</span>
          </MenubarItem>
          <MenubarItem
            className="space-x-1.5"
            onClick={() => setTheme('system')}
          >
            <Monitor />
            <span>System</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
