import Loading from "./loading";
import { Suspense } from "react";


interface props {
  params: { scheduleId: string };
}

export default function DetailedLayout({
  children, params
}: {
  children: React.ReactNode;
  params: { scheduleId: string }
}) {
  return (
    <section className="flex bg-Primary relative w-full">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </section>
  );
}
