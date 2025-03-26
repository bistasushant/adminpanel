"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Plus, ArrowUpDown, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import MobileSideBar from "@/components/MobileSideBar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ProductsPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const router = useRouter();

    const navigateToOrders = () => {
        router.push('/dashboard/orders');
    };

    const productsData = [
        { id: "#PROD-001", name: "iPhone 15 Pro", category: "Smartphones", price: 1299.00, stock: 124, status: "Available" },
        { id: "#PROD-002", name: "MacBook Air M2", category: "Laptops", price: 1199.00, stock: 56, status: "Available" },
        { id: "#PROD-003", name: "AirPods Pro", category: "Audio", price: 249.00, stock: 0, status: "Out of Stock" },
        { id: "#PROD-004", name: "iPad Air", category: "Tablets", price: 599.00, stock: 89, status: "Available" },
        { id: "#PROD-005", name: "Apple Watch Series 8", category: "Wearables", price: 399.00, stock: 112, status: "Available" },
    ];

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || (filter === "In Stock" && product.stock > 0) ||
            (filter === "Out of Stock" && product.stock === 0) ||
            (filter === "On Sale" && product.price < 500);
        return matchesSearch && matchesFilter;
    });

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950">
            <SideBar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                navigateToOrders={navigateToOrders}
            />
            <MobileSideBar />

            <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
                <Header />
                <div className="p-4 md:p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-2 text-white/50" />
                                <Input
                                    type="text"
                                    placeholder="Search Products....."
                                    className="w-full bg-white/5 border border-white/30 rounded-md pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center gap-2 bg-gray-400/20 border hover:bg-gray-900">
                                        <Filter size={16} />
                                        <span className="font-normal">Filter</span>
                                        <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900/90 text-white">
                                    <DropdownMenuItem onClick={() => setFilter("All")}>All</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setFilter("In Stock")}>In Stock</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setFilter("Out of Stock")}>Out of Stock</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setFilter("On Sale")}>On Sale</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center gap-2 bg-gray-400/20 border hover:bg-gray-900">
                                        <span className="font-normal">Sort by Price </span>
                                        <ArrowUpDown size={16} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900/90 text-white">
                                    <DropdownMenuItem onClick={() => setSortOrder("asc")}>Low to High</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOrder("desc")}>High to Low</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button onClick={() => router.push('/dashboard/products/add')}
                            className="flex items-center gap-2 bg-emerald-600/30 border border-emerald-500 hover:bg-emerald-600/40 mt-4 md:mt-0">
                            <Plus size={16} />
                            <span className="font-normal">Add Product</span>
                        </Button>
                    </div>

                    <Card className="bg-white/5 border-white/10 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-white font-semibold text-2xl">Product List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-white/5">
                                        <TableRow className="border-white/10 hover:bg-white/5">
                                            <TableHead className="text-white/70 text-md">Product ID</TableHead>
                                            <TableHead className="text-white/70 text-md">Product Name</TableHead>
                                            <TableHead className="text-white/70 text-md">Category</TableHead>
                                            <TableHead className="text-white/70 text-md">Price</TableHead>
                                            <TableHead className="text-white/70 text-md">Stock</TableHead>
                                            <TableHead className="text-white/70 text-md">Status</TableHead>
                                            <TableHead className="text-white/70 text-md">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedProducts.length > 0 ? (
                                            sortedProducts.map((product, index) => (
                                                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                                                    <TableCell className="text-white/70 text-md">{product.id}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src="/placeholder.svg" alt="Product Image" />
                                                                <AvatarFallback className="bg-purple-600">P</AvatarFallback>
                                                            </Avatar>
                                                            <span className="text-white/70 text-md">{product.name}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-white/70 text-md">{product.category}</TableCell>
                                                    <TableCell className="text-white/70 text-md">Rs {product.price.toFixed(2)}</TableCell>
                                                    <TableCell className="text-white/70 text-md">{product.stock}</TableCell>
                                                    <TableCell>
                                                        <Badge className={`${product.status === "Available"
                                                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                                            : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}>
                                                            {product.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button variant="ghost" size="icon"
                                                                className="hover:bg-gray-400/20"
                                                                onClick={() => {/* Open edit product modal */ }}>
                                                                <span className="text-blue-500">
                                                                    <Pencil />
                                                                </span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon"
                                                                className="hover:bg-gray-400/20"
                                                                onClick={() => {/* Handle delete product */ }}>
                                                                <span className="text-red-500">
                                                                    <Trash2 />
                                                                </span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center text-white/70">No products found.</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                    <Pagination className="mt-3">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" className="text-white/60 hover:bg-gray-500/20 hover:text-white/80" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-white/60 hover:bg-gray-500/20 hover:text-white/80">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis className="text-white/60 hover:bg-gray-500/20 hover:text-white/80" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" className="text-white/60 hover:bg-gray-500/20 hover:text-white/80" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
        </div>
    );
};

export default ProductsPage;
