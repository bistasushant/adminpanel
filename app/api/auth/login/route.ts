// import { connectToDatabse } from "@/lib/db";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//     await connectToDatabse();

//     const { email, password } = await req.json();

//     if(!email || !password){
//         return Next
//     }
// }
import { NextResponse } from "next/server";

export async function POST (req: NextResponse){
    const body = await req.json();
    const email = body.email;
    const password = body.password;

    if(email === "admin@gmail.com" && password === "admin"){
        return NextResponse.json({
            error: false,
            message: "Login success",
            email: email,
            token: "Bearer " + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toUpperCase(),

        })
    }
    return NextResponse.json({
        error: true,
        message: "Incorrect email or password",
    });

}