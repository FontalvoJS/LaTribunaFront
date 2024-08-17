import { Metadata } from "next";

export default async function generateMetadata(params: { title: string, description: string, image: string }): Promise<Metadata> {
    return {
        title: params.title,
        description: params.description,
        openGraph: {
            title: params.title,
            description: params.description,
            images: [
                {
                    url: params.image,
                    width: 800,
                    height: 600
                }
            ]
        }
    }
}