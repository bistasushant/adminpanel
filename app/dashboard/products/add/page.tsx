"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, ArrowLeft, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SideBar from "@/components/SideBar";
import MobileSideBar from "@/components/MobileSideBar";
import Header from "@/components/Header";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; 

const AddProductForm = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navigateToOrders = () => {
        router.push('/dashboard/orders');
    };

    // Handle image upload preview
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert('File size exceeds 2MB limit.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle category selection
    const handleCategoryToggle = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append('categories', JSON.stringify(selectedCategories));
        console.log('Form submitted:', Object.fromEntries(formData));
        // Add your API call or navigation logic here
        router.push('/dashboard/products');
    };

    // List of available categories
    const categories = [
        { value: "electronics", label: "Electronics" },
        { value: "fashion", label: "Fashion" },
        { value: "home", label: "Home & Kitchen" },
        { value: "beauty", label: "Beauty" },
    ];

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
                    <div className="flex items-center mb-4">
                        <Button
                            type="button"
                            variant="secondary"
                            className="bg-white/10 hover:bg-white/20 text-white"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-4">Add New Product</h1>

                    <Card className="bg-gradient-to-br from-slate-950 to-indigo-950 border border-white/40 max-w-3xl mx-auto">
                        <CardHeader>
                            <h2 className="text-lg font-bold text-white">Product Details</h2>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label className="text-white/80">Product Image</Label>
                                    <div className="relative group w-full max-w-md mx-auto">
                                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                                            {selectedImage ? (
                                                <div className="relative w-full h-full">
                                                    <img 
                                                        src={selectedImage} 
                                                        alt="Preview" 
                                                        className="object-cover w-full h-full rounded-lg"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedImage(null)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full hover:bg-red-400 transition-colors"
                                                    >
                                                        <X className="h-4 w-4 text-white" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="h-12 w-12 text-white/50 mb-2 group-hover:text-purple-400" />
                                                    <span className="text-white/70 group-hover:text-purple-400">
                                                        Click to upload or drag and drop
                                                    </span>
                                                    <span className="text-sm text-white/50">
                                                        PNG, JPG (max. 2MB)
                                                    </span>
                                                </>
                                            )}
                                        </label>
                                        <input
                                            id="image-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-white/80">Product Name</Label>
                                        <Input 
                                            name="productName"
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white w-full"
                                            placeholder="Enter product name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white/80">Categories</Label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                className="flex items-center justify-between w-full bg-white/5 border-white/20 focus:ring-2 focus:ring-gray-500 text-white rounded-lg px-4 py-2"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            >
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedCategories.length > 0 ? (
                                                        selectedCategories.map((category) => (
                                                            <span
                                                                key={category}
                                                                className="bg-purple-600 text-white text-sm px-2 py-1 rounded flex items-center"
                                                            >
                                                                {categories.find((cat) => cat.value === category)?.label}
                                                                <span
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleCategoryToggle(category);
                                                                    }}
                                                                    className="ml-1 text-white/80 hover:text-white cursor-pointer"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </span>
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-white/50">Select categories</span>
                                                    )}
                                                </div>
                                                <ChevronDown className={`h-5 w-5 text-white/50 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 mt-1 w-full bg-slate-900 border border-white/20 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                                    {categories.map((category) => (
                                                        <div
                                                            key={category.value}
                                                            className={`px-4 py-2 cursor-pointer hover:bg-white text-white hover:text-gray-900/90 flex items-center justify-between ${
                                                                selectedCategories.includes(category.value) ? 'bg-purple-600/70' : ''
                                                            }`}
                                                            onClick={() => handleCategoryToggle(category.value)}
                                                        >
                                                            <span>{category.label}</span>
                                                            {selectedCategories.includes(category.value) && (
                                                                <span className="text-green-400">✓</span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white/80">Price (Rs)</Label>
                                        <Input
                                            name="price"
                                            type="number"
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white w-full"
                                            placeholder="0.00"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white/80">Stock Quantity</Label>
                                        <Input
                                            name="stockQuantity"
                                            type="number"
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white w-full"
                                            placeholder="Enter quantity"
                                            required
                                            min="0"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white/80">Description</Label>
                                        <Textarea
                                            name="description"
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white h-32 w-full"
                                            placeholder="Describe the product..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 justify-end">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="bg-white/10 hover:bg-white/20 text-white"
                                        onClick={() => router.back()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit"
                                        className="bg-purple-600 hover:bg-purple-700 text-white"
                                        disabled={selectedCategories.length === 0}
                                    >
                                        Add Product
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default AddProductForm;