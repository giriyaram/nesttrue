import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getCityMeta } from "@/data/cities";

export default async function CityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const meta = getCityMeta(city);
  if (!meta) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar city={city} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
