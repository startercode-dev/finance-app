import SideNav from '@/app/(portal)/SideNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full border-b border-black bg-background py-1 text-lg">
        stocks
      </div>

      <div className="flex h-[calc(100vh-37px)] max-md:flex-col">
        <SideNav />

        <div className="flex-grow bg-background">{children}</div>
      </div>
    </div>
  );
}
