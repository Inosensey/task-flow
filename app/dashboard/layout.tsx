import Sidebar from "@/components/ReusableComponents/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex bg-Primary">
      <Sidebar />
      {children}
    </section>
  );
}
