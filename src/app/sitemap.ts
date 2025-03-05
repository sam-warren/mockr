import { headers } from "next/headers";

export default async function Sitemap() {
    const headersList = await headers();
    console.log("Got headers: ", headersList);
    const domain =
        headersList
            .get("host")
            ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) ??
        "vercel.pub";

    console.log("Domain: ", domain);
    return [
        {
            url: `https://${domain}`,
            lastModified: new Date(),
        },
    ];
}