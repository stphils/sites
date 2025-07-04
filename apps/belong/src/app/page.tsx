import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import { groq } from "next-sanity";
import Link from "next/link";
import { Logo, Person, PersonImage, PersonBio } from "ui";
import { sanityFetch } from "../lib/sanity";
import { SanityImage } from "../components/SanityImage";

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
            Belong Church ...
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
          <Person>
            <PersonImage>
              <SanityImage
                image={author.image}
                width={128}
                height={128}
                alt={`Photo of ${author.name}`}
              />
            </PersonImage>
            <PersonBio name={author.name} role={author.role} />
          </Person>
        </div>
      </main>
    </div>
  );
}

// Main App Component: Renders the Clock component.
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Clock />
    </React.StrictMode>
  );
};

export default App;
