import { Metadata } from "next";
import { LayoutProvider } from "../layout/context/layoutcontext";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import { ReactNode } from "react";
import { DataProvider } from "./component/Auth/hooks/DataContext";
import StyledComponentsRegistry from "./lib/styledComponentsRegistry";

interface RootLayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: "go-go-pharma",
	description: "GoGo Pharma",
	robots: { index: false, follow: false },
	viewport: { initialScale: 1, width: "device-width" },
	openGraph: {
		type: "website",
		title: "GoGo Pharmaa",
		url: "https://www.gogo-pharma.com",
		description: "Gogo Pharma.",
		images: '/favicon.ico"',
		ttl: 604800,
	},
	icons: {
		// icon: "/favicon.ico",
		icon: "/",
	},
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
		<head>
			<link
				id="theme-css"
				href={`/themes/lara-light-indigo/theme.css`}
				rel="stylesheet"
			></link>
		</head>
		<body>
			<StyledComponentsRegistry>
				<DataProvider>
					<LayoutProvider>{children}</LayoutProvider>
				</DataProvider>
			</StyledComponentsRegistry>
		</body>
		</html>
	);
}
