import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Static Fetching: NextJS 13.4 Image Gallery",
};

export default async function Page() {
    // next js, caches data statically, which means that if this file is compiled like this, then after running 'npm run build' we won't see any new images, we'll just see the image that was called when the project was compiled,
    // bigger issue is that the API calls will actually still be made.
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches and caches data at build time.</strong>
                Even though the Unsplash API always returns a new image, we see the same image after refreshing the page until we compile the project again.
            </Alert>

            <Image
                className="rounded shadow mw-100 h-100"
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description? image.description : "image here"}
            />
            by <Link href={`/users/${image.user.username}`}>{image.user.username}</Link>
        </div>
    );
};