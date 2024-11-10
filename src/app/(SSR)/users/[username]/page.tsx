import { UnsplashUser } from "@/models/unsplash-user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alert } from "@/components/bootstrap";
// import { cache } from "react";

interface PageProps {
    params: {
        username: string,
    };
};

async function getUser(username: string): Promise<UnsplashUser> {
    const response: Response = await fetch(`https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`);

    if (response.status === 404) {
        notFound();
    }

    return await response.json();
}

// if we don't use 'fetch' then the same 'fetch' calls aren't deduplicated by 'next.js' so we can use this function instead for achieving that functionality.
// const getUserCached = cache(getUser);

export async function generateMetadata({ params }: { params: Promise<PageProps["params"]> }): Promise<Metadata> {
    const { username }: PageProps["params"] = await params;
    const user: UnsplashUser = await getUser(username);

    return {
        title: `${
            [user.first_name, user.last_name]
            .filter((name: string | undefined): boolean => Boolean(name))
            .join(" ") || user.username
        } + NextJS 13.4 Image Gallery`
    };
}

export default async function Page({ params }: { params: Promise<PageProps["params"]> }) {
    const { username }: PageProps["params"] = await params;
    const user: UnsplashUser = await getUser(username);

    return (
        <div>
            <Alert>
                This profile page uses <strong>generateMetaData</strong> to set the <strong>page title</strong> dynamically from the API response.
            </Alert>
            <h1>{user.username}</h1>
            <p>First name: {user.first_name}</p>
            <p>Last name: {user.last_name}</p>
            <a href={`https://unsplash.com/${user.username}`}>Unsplash profile</a>
        </div>
    );
}