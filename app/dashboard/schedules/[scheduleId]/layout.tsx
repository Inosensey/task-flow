import Loading from "./loading";
import { Suspense } from "react";

export default function DetailedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-Primary">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
