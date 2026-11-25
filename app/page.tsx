import Stage from "@/components/Stage";
import ScrollDriver from "@/components/ScrollDriver";

const chapters = [
  ["NOVA", "Daily gel cleanser. Scroll to take it apart."],
  ["Made simple", "A bottle, a pump and a label. Nothing else."],
  ["Four parts", "Cap, pump, body and label sleeve."],
  ["Up close", "The label, in detail."],
  ["Back together", "See how the NOVA store comes together."],
];

export default function Home() {
  return (
    <main>
      <ScrollDriver />
      <div id="story" className="relative">
        <div className="sticky top-0 h-svh">
          <Stage />
        </div>
        <div className="relative z-10 -mt-[100svh]">
          {chapters.map(([h, p]) => (
            <section key={h} className="flex h-svh items-center px-6 md:px-16">
              <div className="max-w-md">
                <h2 className="text-4xl font-semibold md:text-6xl">{h}</h2>
                <p className="mt-4 text-lg">{p}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
