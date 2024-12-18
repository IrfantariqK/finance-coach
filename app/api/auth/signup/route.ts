 import { NextResponse } from "next/server";
 import { prisma } from "../../../lib/prisma";
 import * as bcrypt from "bcryptjs";
 import { z } from "zod";
 import { Prisma } from "@prisma/client";

 const signupSchema = z.object({
   name: z.string().min(2),
   email: z.string().email(),
   password: z.string().min(6),
 });

 export async function POST(request: Request) {
   try {
     const body = await request.json();
     console.log("Request body:", body);

     const { name, email, password } = signupSchema.parse(body);

     // Test database connection first
     try {
       await prisma.$connect();
       console.log("Database connected successfully");
     } catch (dbError) {
       console.error("Database connection failed:", dbError);
       return NextResponse.json(
         { message: "Database connection failed" },
         { status: 500 }
       );
     }

     // Create user directly with unique constraint handling
     try {
       const hashedPassword = await bcrypt.hash(password, 10);
       const user = await prisma.user.create({
         data: {
           name,
           email,
           password: hashedPassword,
         },
         select: {
           id: true,
           email: true,
           name: true,
         },
       });

       return NextResponse.json(
         { message: "User created successfully", user },
         { status: 201 }
       );
     } catch (error) {
       if (error instanceof Prisma.PrismaClientKnownRequestError) {
         // P2002 is Prisma's error code for unique constraint violations
         if (error.code === "P2002") {
           return NextResponse.json(
             { message: "Email already exists" },
             { status: 400 }
           );
         }
       }
       console.error("Error creating user:", error);
       return NextResponse.json(
         { message: "Failed to create user" },
         { status: 500 }
       );
     }
   } catch (error) {
     console.error("Signup error:", error);
     return NextResponse.json(
       { message: "Failed to process signup request" },
       { status: 500 }
     );
   }
 }