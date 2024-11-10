import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";

interface PageProps {
    params: {
        topic: string;
    };
    // to get 'search parameters'
    // searchParams: { [key: string ]: string | string[] | undefined },
}

// here we have to load 'param: topic' asynchronously as it is a dynamic route, because of this the function becomes async, now as the function is async, it must return a 'Promise' and can't return type 'Metadata' directly.
export async function generateMetadata({ params }: { params: Promise<PageProps["params"]> }): Promise<Metadata> {
    const { topic }: PageProps["params"] = await params;

    return {
        title: `${topic} - NextJS 13.4 Image Gallery`,
    }
}

// export function generateStaticParams(): { topic: string }[] {
//     return ["health", "fitness", "coding"].map((topic: string): { topic: string } => ({ topic }));
// }

// export const revalidate = 0;

// export const dynamicParams: boolean = false;

export default async function Page({ params }: { params: Promise<PageProps["params"]> }) {
    // here we have to load 'params' asynchronously because we have a dynamic route.
    const { topic }: PageProps["params"] = await params;
    const response: Response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const images: UnsplashImage[] = await response.json();

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic parameter.
                Pages that are not included in the generateStaticParams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled).
            </Alert>
            <h1>{topic}</h1>
            {
                images.map((image: UnsplashImage) => (
                    <Image
                        className={styles.image}
                        src={image.urls.raw}
                        width={250}
                        height={250}
                        alt={image.description? image.description : "image here"}
                        key={image.urls.raw}
                    />
                ))
            }
        </div>
    );
}