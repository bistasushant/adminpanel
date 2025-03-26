'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { 
  CreditCard, 
  Home, 
  LineChart, 
  Menu, 
  Package, 
  ShoppingBag, 
  ShoppingCart, 
  Tag, 
  Truck, 
  Users 
} from "lucide-react"
import Link from "next/link"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from 'next/navigation'

interface MobileSideBarProps {
  navigateToOrders?: () => void;
}

const MobileSideBar = ({ navigateToOrders }: MobileSideBarProps = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleOrdersClick = (e: React.MouseEvent) => {
    if (navigateToOrders) {
      e.preventDefault();
      navigateToOrders();
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden fixed top-4 left-4 z-40 text-white hover:bg-white/10"
          aria-label="Open mobile menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="left" 
        className="bg-slate-900/95 backdrop-blur-xl border-white/10 text-white p-0"
      >
        <SheetHeader>
          <div className="flex h-16 items-center px-6 border-b border-white/10">
            <Link href="/dashboard" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-purple-400" />
              <span className="font-bold text-lg">SushantStore</span>
            </Link>
          </div>
        </SheetHeader>
        <SheetTitle />
        <SheetDescription />

        <nav className="grid gap-1 p-4 -mt-16">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-purple-400 ${pathname === '/' ? 'bg-white/10' : 'text-white/70'}`}
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/orders"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/orders' ? 'bg-white/10 text-white' : 'text-white/70'}`}
            onClick={handleOrdersClick}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Orders</span>
            <Badge className="ml-auto bg-purple-500 hover:bg-purple-600">
              24
            </Badge>
          </Link>

          <Link
            href="/dashboard/products"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/products' ? 'bg-white/10 text-white' : 'text-white/70'}`}
          >
            <Package className="h-5 w-5" />
            <span>Products</span>
          </Link>

          <Link
            href="/dashboard/customers"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/customers' ? 'bg-white/10 text-white' : 'text-white/70'}`}
          >
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </Link>

          <Link
            href="/dashboard/category"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/analytics' ? 'bg-white/10 text-white' : 'text-white/70'}`}
          >
            <Tag className="h-5 w-5" />
            <span>Category</span>
          </Link>

          <Link
            href="/dashboard/payments"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/payments' ? 'bg-white/10 text-white' : 'text-white/70'}`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Payments</span>
          </Link>

          <Link
            href="/dashboard/shipping"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-purple-400 ${pathname === '/shipping' ? 'bg-white/10 text-white' : 'text-white/70'}`}
          >
            <Truck className="h-5 w-5" />
            <span>Shipping</span>
          </Link>
        </nav>

        <div className="mt-auto border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-purple-600">CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Sushant</p>
              <p className="text-xs text-white/70">Admin</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar