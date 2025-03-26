'use client'
import { 
  Clipboard,
  CreditCard, 
  Home, 
  LineChart, 
  LogOut, 
  Menu, 
  Package, 
  Settings, 
  ShoppingBag, 
  ShoppingCart, 
  Tag, 
  Truck, 
  Users 
} from 'lucide-react'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useRouter, usePathname } from 'next/navigation'

interface SideBarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  navigateToOrders: () => void;
  // navigateToProducts: () => void;
}

const SideBar = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  navigateToOrders, 
  // navigateToProducts 
}: SideBarProps) => {

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div 
      className={`fixed inset-y-0 z-50 hidden md:flex flex-col bg-black/20 backdrop-blur-xl border-r border-white/10 shadow-xl transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-64" : "w-20"}`}
    >
      {/* Sidebar Header */}
      <div className='flex h-16 items-center justify-between px-4 border-b border-white/10'>
        <Link href="/dashboard" className='flex items-center gap-2'>
          <ShoppingBag className="h-6 w-6 text-purple-400" />
          <span
            className={`font-bold text-lg text-white transition-opacity duration-300 
              ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}
          >
            SushantStore
          </span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className='text-gray-200 hover:bg-white/10'
          aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu className='h-5 w-5 text-white/70 hover:bg-white/10 hover:text-white' />
        </Button>
      </div>

      {/* Navigation Menu */}
      <div className='flex-1 overflow-auto py-2'>
        <nav className='grid gap-1 px-2'>
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-purple-400 ${pathname === '/' ? 'border border-purple-500' : ''}`}
          >
            <Home className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Dashboard
            </span>
          </Link>

          <Link
            href="/dashboard/orders"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${pathname === '/orders' ? 'border border-purple-500' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              navigateToOrders();
            }}
          >
            <ShoppingCart className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Orders
            </span>
            <Badge className={`${isSidebarOpen ? "ml-auto" : "absolute right-2"} bg-purple-500 hover:bg-purple-600`}>
              24
            </Badge>
          </Link>

          <Link
            href="/dashboard/products"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${
              pathname === '/products' ? 'border border-purple-500' : ''
            }`}
          >
            <Package className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Products
            </span>
          </Link>

          <Link 
            href="/dashboard/customers"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${
              pathname === '/customers' ? 'border border-purple-500' : ''
            }`}
          >
            <Users className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Customers
            </span>
          </Link>

          <Link 
            href="/dashboard/category"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${
              pathname === '/category' ? 'border border-purple-500' : ''
            }`}          >
            <Tag className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Category
            </span>
          </Link>

          <Link 
            href="/dashboard/payments"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${
              pathname === '/payments' ? 'border border-purple-500' : ''
            }`}          >
            <CreditCard className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Payments
            </span>
          </Link>

          <Link 
            href="/dashboard/shipping"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white/70 transition-all hover:text-purple-400 relative ${
              pathname === '/shipping' ? 'border border-purple-500' : ''
            }`}          >
            <Truck className='h-5 w-5' />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
              Shipping
            </span>
          </Link>
        </nav>
      </div>

      {/* User Profile Section */}
      <div className='mt-auto border-t border-white/10 p-4'>
        <div className='flex items-center gap-3'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-purple-600">CN</AvatarFallback>
          </Avatar>
          
          <div className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0 hidden"}`}>
            <p className='text-sm font-medium text-white'>Sushant</p>
            <p className='text-xs text-white/70'>Admin</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className='ml-auto text-white/70 hover:bg-white/10 hover:text-white'
              >
                <Settings className='h-5 w-5' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align='end' 
              className='w-56 bg-slate-900 border border-white/10 text-white'
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className='bg-white/10'/>
              <DropdownMenuItem className='hover:bg-white/10 focus:bg-white/10 cursor-pointer'>
                <Settings className='h-4 w-4 mr-2' />
                <span className='text-white/70'>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:bg-white/10 focus:bg-white/10 cursor-pointer'>
                <LogOut className='h-4 w-4 mr-2' />
                <span className='text-white/70'>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default SideBar