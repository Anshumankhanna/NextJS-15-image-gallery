import { UnsplashImage, UnsplashSearchResponse } from "@/models/unsplash-image";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse<{
    error: string;
}> | NextResponse<UnsplashImage[]>> {
    const { searchParams }: { searchParams: URLSearchParams } = new URL(request.url);
    const query: string | null = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    const response: Response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const { results }: UnsplashSearchResponse = await response.json();

    return NextResponse.json(results);
}