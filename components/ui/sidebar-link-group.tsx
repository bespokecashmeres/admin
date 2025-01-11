import { useState } from 'react'

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, openGroup: boolean) => React.ReactNode
  open?: boolean
}

export default function SidebarLinkGroup({
  children,
  open = false
}: SidebarLinkGroupProps) {
  const [openGroup, setOpenGroup] = useState<boolean>(open)

  const handleClick = () => {
    setOpenGroup(!openGroup);
  }

  return (
    <li className={`pl-2 py-1.5 rounded-sm last:mb-0 group is-link-group ${open && 'bg-slate-900'}`}>
      {children(handleClick, openGroup)}
    </li>
  )
}