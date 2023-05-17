import { Metadata } from "next";
import { Logo } from "ui";

export const metadata: Metadata = {
  title: "Belong Church",
};

export default function Home() {
  return (
    <div>
      <main className="mx-auto max-w-lg px-4 pt-16 pb-16 sm:pt-24 lg:px-8">
        <div className="mx-auto w-16 pb-14">
          <Logo />
        </div>
        <h1 className="text-center text-6xl font-sans font-semibold text-grey-500 pb-10">
          Belong Church
        </h1>
        <div className="prose">
          <p>
            Belong Church is a welcoming group in Sydney, dedicated to creating
            inclusive Christian communities that celebrate diversity and embrace
            people from various cultures and languages. Our mission is to foster
            an environment where individuals from all walks of life can find
            acceptance, love, and a sense of belonging.
          </p>

          <p>
            With two vibrant churches, St Phil's in Eastwood and St Mark's in
            Ermington, Belong Church opens its doors to people of different
            cultural backgrounds, languages, and traditions. We believe in the
            power of unity and the strength that comes from embracing our
            differences. At Belong Church, you'll find a warm and accepting
            community that celebrates the rich tapestry of cultures within our
            congregation.
          </p>

          <p>
            Our churches are committed to breaking down language barriers and
            ensuring that everyone feels valued and understood. We offer
            resources and support to help individuals from diverse linguistic
            backgrounds engage in our services and connect with the wider church
            community. At Belong Church, language should never be a barrier to
            experiencing God's love and grace.
          </p>

          <p>
            Join us at Belong Church as we strive to create a safe and welcoming
            space for people of all cultures and languages. Together, we can
            build bridges of understanding, celebrate diversity, and journey
            towards a deeper unity in Christ.
          </p>

          <p>
            <span className="font-semibold">Pastor Bruce Stanley</span> <br />{" "}
            Senior Pastor, Belong Church
          </p>
        </div>
      </main>
    </div>
  );
}
