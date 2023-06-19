import dynamic from 'next/dynamic';
import { siteConfig } from '@/config/site';

export default function MainNavDynamic() {
  // @ts-ignore
  const MainNavPage = dynamic(() => import("./main-nav"), {
    ssr: false,
  });

  // @ts-ignore
  return <MainNavPage items={siteConfig.mainNav} />
}
