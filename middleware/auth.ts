import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Define the type for the handler function
type Handler = (req: NextRequest) => Promise<NextResponse>;

// Update the middleware to use NextRequest and NextResponse
export function authMiddleware(handler: Handler) {
    return async (req: NextRequest) => {
        // Extract the token from the Authorization header
        const token = req.headers.get("authorization")?.split(" ")[1]; // Expecting "Bearer <token>"

        // Check if token exists
        if (!token) {
            return NextResponse.json({ message: "No token provided" }, { status: 401 });
        }

        try {
            // Verify the token
            const decoded = verifyToken(token);
            // Attach the decoded user to the request object
            (req as any).user = decoded;
            // Call the handler with the request
            return await handler(req);
        } catch (error) {
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }
    };
}