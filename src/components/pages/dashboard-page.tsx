'use client';

import { InvestmentProvider } from '@/context/investment-context';
import Header from '@/components/layout/header';
import { Dashboard } from '@/components/dashboard/dashboard';

export default function DashboardPage() {
    return (
        <InvestmentProvider>
            <div className="flex min-h-screen w-full flex-col bg-background">
                <Header />
                <main className="flex-1 p-4 sm:px-6 sm:py-6 md:p-8">
                    <Dashboard />
                </main>
            </div>
        </InvestmentProvider>
    );
}
