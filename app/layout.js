import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getSEOTags, renderSchemaTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--ds-font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--ds-font-mono", display: "swap" });
const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--ds-font-display",
  display: "swap",
});

export const viewport = {
	// Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
	themeColor: config.colors.main,
	width: "device-width",
	initialScale: 1,
};

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
export const metadata = getSEOTags({
	title: "JustEnvs — Environment Variables Manager for Mac",
	openGraph: {
		title: "JustEnvs — Environment Variables Manager for Mac",
	},
	keywords: [
		"environment variables manager",
		"env manager mac",
		"share env variables",
		"secrets manager for developers",
		"justenvs",
	],
});

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${mono.variable} ${display.variable} ${sans.className}`}
			suppressHydrationWarning
		>
			<body>
				{/* SoftwareApplication structured data for rich results on Google */}
				{renderSchemaTags()}
				{/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
				<ClientLayout>{children}</ClientLayout>
				<Analytics />
			</body>
		</html>
	);
}
