"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SideBar from "@/components/SideBar";
import MobileSideBar from "@/components/MobileSideBar";
import Header from "@/components/Header";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const AddCategoryForm = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const navigateToOrders = () => {
        router.push('/dashboard/orders');
    };

    // Handle image upload preview


    // Handle form submission (placeholder)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log('Category submitted:', Object.fromEntries(formData));
        // Add your API call or navigation logic here
        router.push('/dashboard/category');
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
                    <h1 className="text-2xl font-bold text-white mb-4">Add New Category</h1>

                    <Card className="bg-gradient-to-br from-slate-950 to-indigo-950 border border-white/40 max-w-3xl mx-auto">
                        <CardHeader>
                            <h2 className="text-lg font-bold text-white">Category Details</h2>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-white/80">Category Name</Label>
                                        <Input 
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white w-full"
                                            placeholder="Enter category name"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-white/80">Description (Optional)</Label>
                                        <Textarea
                                            className="bg-white/5 border-white/20 focus:ring-2 focus:ring-purple-500 text-white h-32 w-full"
                                            placeholder="Describe the category..."
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
                                    >
                                        Add Category
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

export default AddCategoryForm;