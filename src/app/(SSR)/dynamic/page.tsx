import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Dynamic Fetching: NextJS 13.4 Image Gallery",
};

// used to tell next js do that doesn't display do static fetching,
// here the value of revalidate are the seconds that it takes before it makes a fresh call,
// i.e. if it were set to 10 seconds, and someone reloads the page every 9 seconds, they will see the same image as before, but it will change at every 10th second.
// export const revalidate = 0;

export default async function Page() {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
        // same purpose as revalidate above,
        // the difference is that if you state 'revalidate' above, it affects this whole page, whereas, here in the 'fetch config' it is only affecting this element's functionality.
        // cache: "no-cache"
        next: { revalidate: 0 }
    });
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return (
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page <strong>fetches data dynamically</strong>.
                Every time you refresh the page, you get a new image from the Unsplash API.
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