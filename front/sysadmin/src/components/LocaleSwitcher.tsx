// 'use client';

// import { usePathname, useRouter } from '@/i18n/navigation';
// import { useLocale } from 'next-intl';
// // import styles from './LocaleSwticher.module.css';

// export default function LocaleSwitcher() {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   console.log('Current locale:', locale);
//   console.log('Current pathname:', pathname);
//   console.log("pathname:", pathname);
//   const switchLocale = (newLocale: string) => {
//     if (newLocale !== locale) {
//       router.replace(pathname, { locale: newLocale });
//       router.refresh();
//     }
//   };

//   return (
//     <select
//     //   className={styles.localeSelect}
//       value={locale}
//       onChange={e => switchLocale(e.target.value)}>
//       <option value="am">አማርኛ</option>
//       <option value="en">EN</option>
//       <option value="de">DE</option> 
//     </select>
//   );
// }

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

    console.log('Current locale:', locale);
  console.log('Current pathname:', pathname);
  console.log("pathname:", pathname);
  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    // Extract current path parts
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace locale (first segment)
    const newPath = segments.join('/');

    // Preserve query parameters
    const query = searchParams.toString();
    const finalUrl = query ? `${newPath}?${query}` : newPath;

    startTransition(() => {
      router.push(finalUrl);
    });
  };

  return (
    <Select onValueChange={handleChange} defaultValue={locale} disabled={isPending}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="am">አማርኛ</SelectItem>
          <SelectItem value="de">GERMENY</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
