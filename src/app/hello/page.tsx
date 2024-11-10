export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // throw Error("Boom");
    return (
        <div>Hello, NextJs 14!</div>
    );
};