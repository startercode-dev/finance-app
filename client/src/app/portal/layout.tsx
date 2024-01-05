import SideNav from '@/app/portal/SideNav';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full border-b border-black bg-background py-1 text-lg">
        <div className="group flex overflow-hidden">
          <ul className="animate-scroll flex min-w-full flex-shrink-0 justify-around group-hover:[animation-play-state:paused]">
            <li>SPY 492.39 +0.3%</li>
            <li>SPY 492.39 +0.4%</li>
            <li>SPY 492.39 +0.56%</li>
            <li>SPY 492.39 +0.7%</li>
            <li>SPY 492.39 +0.81%</li>
          </ul>

          <ul
            aria-hidden="true"
            className="animate-scroll flex min-w-full flex-shrink-0 justify-around group-hover:[animation-play-state:paused]"
          >
            <li>SPY 492.39 +0.3%</li>
            <li>SPY 492.39 +0.4%</li>
            <li>SPY 492.39 +0.56%</li>
            <li>SPY 492.39 +0.7%</li>
            <li>SPY 492.39 +0.81%</li>
          </ul>
        </div>
      </div>

      <div className="mobile:flex-col flex h-[calc(100vh-37px)]">
        <SideNav />

        <div className="flex-grow bg-background">{children}</div>
      </div>
    </div>
  );
}
