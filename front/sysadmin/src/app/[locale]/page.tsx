
import AppAreaChart from "@/components/AppAreaChart";
import AppBarChart from "@/components/AppBarChart";
import AppPieChart from "@/components/AppPieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
const Homepage = ({
  params
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('home');
  const t1 = useTranslations('sideNavgation');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
              <h1 className="bg-green-300">{t('header')}</h1>
              <h1 className="bg-green-300">{t1('home')}</h1>


        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg"><TodoList/></div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Products" />
      </div>
    </div>
  );
};

export default Homepage;
