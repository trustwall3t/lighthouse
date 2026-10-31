import DynamicStyles from '@/components/DynamicStyles';
import { PublicDesktopLockLifecycle } from '@/components/public/PublicDesktopLockLifecycle';
import SmartsuppScript from '@/components/SmartsuppScript';
import { GoogleTranslateProvider } from '@/components/i18n/GoogleTranslateProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { defaultAppViewport } from '@/lib/public/gg-viewport-server';
import { isPublicMarketingRoute } from '@/lib/public/marketing-routes';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { headers } from 'next/headers';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const geistSans = Geist({
	subsets: ['latin'],
	variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-geist-mono',
});

export async function generateViewport(): Promise<Viewport> {
	return defaultAppViewport;
}

export const metadata: Metadata = {
	title: {
		default: 'Light House Wealth',
		template: '%s',
	},
	description:
		'Live trading, forex, stocks, commodities, investment plans, and member dashboard.',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = (await headers()).get('x-pathname') ?? '';
	const isMarketing = isPublicMarketingRoute(pathname);

	if (isMarketing) {
		return (
			<html lang='en' className='berkforte-html' suppressHydrationWarning>
				<body className='berkforte-public' suppressHydrationWarning>
					{children}
				</body>
			</html>
		);
	}

	const bodyClass = [geistSans.variable, geistMono.variable, 'font-sans']
		.filter(Boolean)
		.join(' ');

	return (
		<html lang='en' suppressHydrationWarning>
			<body className={bodyClass} suppressHydrationWarning>
				<ThemeProvider>
					<GoogleTranslateProvider>
						<PublicDesktopLockLifecycle />
						<DynamicStyles />
						<SmartsuppScript />
						{children}
						<Toaster />
					</GoogleTranslateProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
