import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";
import { getTranslations } from "next-intl/server";
// import { getMessages } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
// export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
//   const t = await getTranslations({ locale, namespace: 'Common' });

//     //   "defaultTitle": "የእኔ ድር ጣቢያ",
//     // "siteName": "ኮድ ሩኪ",
//     // "description": "የኢ-ኮሜርስ መተግበሪያ የአስተዳዳሪ መቆጣጠሪያ ፓነል"
//   return {
//     title: {
//       default: t('defaultTitle'),
//       template: `%s | ${t('siteName')}`,
//       description: `%s | ${t('description')}`,
//     },
//   };
// }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });
    return {
    title: {
      default: t('defaultTitle'),
      template: `%s | ${t('siteName')}`,
      description: `%s | ${t('description')}`,
    },
  };
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Admin dashboard",
//   description: "Admin dashboard for E-commerce App",
// };

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
// const messages = await getMessages();
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
      <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <main className="w-full">
                <Navbar />
                <div className="px-4">{children}</div>
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
