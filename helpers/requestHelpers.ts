// utils/requestHelper.ts

export const requestHelper = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    body?: Record<string, any>, // Specify the type for body
    headers: Record<string, string> = {}
): Promise<any> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL; // Use NEXT_PUBLIC_ prefix for client-side access

        // Check if baseUrl is defined
        if (!baseUrl) {
            throw new Error("Base URL is not defined. Please check your environment variables.");
        }

        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        const response = await fetch(`${baseUrl}${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}), // Only add Authorization if token exists
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        // Check if the response is JSON
        const contentType = response.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            // Handle non-JSON responses
            const text = await response.text();
            throw new Error(`Unexpected response format: ${text}`);
        }

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }

        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error; // Rethrow the error for further handling
    }
};
