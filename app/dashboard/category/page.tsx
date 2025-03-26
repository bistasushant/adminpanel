"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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

const CategoriesPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("asc");
    const router = useRouter();

    const categoriesData = [
        { id: "#CAT-001", name: "Electronics", description: "Devices and gadgets", products: 248, status: "Active", createdDate: "2023-01-15" },
        { id: "#CAT-002", name: "Fashion", description: "Clothing & accessories", products: 567, status: "Active", createdDate: "2023-02-20" },
        { id: "#CAT-003", name: "Home & Living", description: "Furniture & decor", products: 189, status: "Inactive", createdDate: "2023-03-05" },
        { id: "#CAT-004", name: "Sports", description: "Sporting goods", products: 432, status: "Active", createdDate: "2023-04-10" },
        { id: "#CAT-005", name: "Books", description: "Physical & digital books", products: 0, status: "Inactive", createdDate: "2023-05-25" },
    ];

    const filteredCategories = categoriesData.filter(category => {
        const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "All" || 
            (filter === "Active" && category.status === "Active") || 
            (filter === "Inactive" && category.status === "Inactive");
        return matchesSearch && matchesFilter;
    });

    const sortedCategories = filteredCategories.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const navigateToOrders = () => {
        router.push('/dashboard/orders');
    };

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
                                    placeholder="Search Categories..."
                                    className="w-full bg-white/5 border border-white/30 rounded-md pl-10 pr-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                                    <DropdownMenuItem onClick={() => setFilter("Active")}>Active</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setFilter("Inactive")}>Inactive</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="flex items-center gap-2 bg-gray-400/20 border hover:bg-gray-900">
                                        <span className="font-normal">Sort by Name</span>
                                        <ArrowUpDown size={16} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-gray-900/90 text-white">
                                    <DropdownMenuItem onClick={() => setSortOrder("asc")}>A → Z</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortOrder("desc")}>Z → A</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button 
                            onClick={() => router.push('/dashboard/category/add')} 
                            className="flex items-center gap-2 bg-emerald-600/30 border border-emerald-500 hover:bg-emerald-600/40 mt-4 md:mt-0"
                        >
                            <Plus size={16} /> 
                            <span className="font-normal">Add Category</span>
                        </Button>
                    </div>

                    <Card className="bg-white/5 border-white/10 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-white font-semibold text-2xl">Category Management</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader className="bg-white/5">
                                        <TableRow className="border-white/10 hover:bg-white/5">
                                            <TableHead className="text-white/70 text-md">Category ID</TableHead>
                                            <TableHead className="text-white/70 text-md">Category Name</TableHead>
                                            <TableHead className="text-white/70 text-md">Description</TableHead>
                                            <TableHead className="text-white/70 text-md">Products</TableHead>
                                            <TableHead className="text-white/70 text-md">Status</TableHead>
                                            <TableHead className="text-white/70 text-md">Created Date</TableHead>
                                            <TableHead className="text-white/70 text-md">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedCategories.length > 0 ? (
                                            sortedCategories.map((category, index) => (
                                                <TableRow key={index} className="border-white/10 hover:bg-white/5">
                                                    <TableCell className="text-white/70 text-md">{category.id}</TableCell>
                                                    <TableCell className="text-white/70 text-md font-medium">
                                                        {category.name}
                                                    </TableCell>
                                                    <TableCell className="text-white/70 text-md max-w-[200px] truncate">
                                                        {category.description}
                                                    </TableCell>
                                                    <TableCell className="text-white/70 text-md">
                                                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                                                            {category.products} items
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={`${
                                                            category.status === "Active" 
                                                            ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" 
                                                            : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                                                        }`}>
                                                            {category.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-white/70 text-md">{category.createdDate}</TableCell>

                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon"
                                                                className="hover:bg-gray-400/20"
                                                                onClick={() => {/* Open edit modal */}}
                                                            >
                                                                <Pencil className="w-4 h-4 text-emerald-400" />
                                                            </Button>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon"
                                                                className="hover:bg-gray-400/20"
                                                                onClick={() => {/* Handle delete */}}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-rose-400" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-white/70">
                                                    No categories found.
                                                </TableCell>
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
                                <PaginationPrevious href="#" className="text-white/60 hover:bg-gray-500/20 hover:text-white/80"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-white/60 hover:bg-gray-500/20 hover:text-white/80">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis className="text-white/60 hover:bg-gray-500/20 hover:text-white/80"/>
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

export default CategoriesPage;
