import { Metadata } from "next";
import Page from "./page";
export async function generateMetadata({
  params,
}: {
  params: { view: string };
}): Promise<Metadata> {
  const { view } = params;
  const res = await fetch(
    `http://18.207.127.28/LaTribunaBack/public/api/articles/get-one-post/${view}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  if (res.ok) {
    let post = await res.json();
    return {
      title: post.Slug.title,
      description: post.Slug.description,
      openGraph: {
        title: post.Slug.title,
        description: post.Slug.description,
        images: [
          {
            url: `http://18.207.127.28/LaTribunaBack/storage/app/public/${post.Slug.image}`,
            alt: post.Slug.title,
          },
        ],
      },
    };
  } else {
    return {
      title: "La Tribuna",
      description: "La Tribuna",
    };
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Page />
}
