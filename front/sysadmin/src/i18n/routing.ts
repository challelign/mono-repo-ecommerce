import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales: ['en', 'de', 'am'],
  defaultLocale: 'en',
  // pathnames: {
  //   "/contact": {
  //     en: "/contact-me",
  //     fr: "/contactez-moi",
  //     de: "/kontaktiere-mich",
  //   },
  // },
});

