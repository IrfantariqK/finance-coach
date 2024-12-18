import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error")
  
  console.error("Auth Error:", {
    error,
    env: {
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      nodeEnv: process.env.NODE_ENV,
    }
  })

  if (error === "Configuration") {
    return NextResponse.json(
      { 
        error: "NextAuth Configuration Error", 
        message: "Check your environment variables and auth configuration.",
        details: process.env.NODE_ENV === "development" ? {
          missingEnvVars: [
            !process.env.NEXTAUTH_URL && "NEXTAUTH_URL",
            !process.env.NEXTAUTH_SECRET && "NEXTAUTH_SECRET",
            !process.env.GOOGLE_CLIENT_ID && "GOOGLE_CLIENT_ID",
            !process.env.GOOGLE_CLIENT_SECRET && "GOOGLE_CLIENT_SECRET",
          ].filter(Boolean)
        } : undefined
      },
      { status: 500 }
    )
  }

  return NextResponse.json({ error }, { status: 400 })
} 