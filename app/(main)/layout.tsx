'use client';
import Layout from "../../layout/layout";
import { ReactNode } from "react";
import useAuthCheck from "../component/Auth/useAuthCheck";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	const router = useRouter();
  const {loading, user} = useAuthCheck({
	  onError: () => {
			router.replace('/auth/login')
	  }
  })
  return !loading && user && <Layout>{children}</Layout>;
}
