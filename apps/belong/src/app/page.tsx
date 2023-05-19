import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import { Logo } from "ui";
import { Author } from "../components/Author";
import { sanityFetch } from "../lib/sanity";

export const metadata: Metadata = {
  title: "Belong Church",
};

const query = groq`*[_type == "belongSite"][0] { author->{ "name": name.en, "role": role.en, image }, landingPageContent }`;

export default async function Home() {
  const { author, landingPageContent } = await sanityFetch(query);

  return (
    <div>
      <main className="mx-auto max-w-xl px-4 pt-16 pb-16 sm:pt-24 lg:px-8 space-y-14">
        <div className="mx-auto w-16">
          <Logo />
        </div>
        <div className="space-y-9">
          <h1 className="font-sans text-center text-5xl font-semibold text-grey-500">
            Belong Church
          </h1>
          <div className="prose">
            <PortableText
              value={landingPageContent}
              components={{
                marks: {
                  link: ({ children, value }) => {
                    return (
                      <Link
                        className="font-semibold text-blue-400 no-underline hover:underline"
                        href={value.href}
                      >
                        {children}
                      </Link>
                    );
                  },
                },
              }}
            />
          </div>
          {/* @ts-expect-error Server Component */}
          <Author name={author.name} role={author.role} image={author.image} />
        </div>
      </main>
    </div>
  );
}
