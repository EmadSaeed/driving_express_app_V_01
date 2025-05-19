'use client';

import { PageLoader } from '@/components/ui/page-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, BarChart } from '@/components/ui/chart';

export default function AnalyticsPage() {
  return (
    <>
      <PageLoader />
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed analytics and insights for your application.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-1">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <AreaChart />
            </CardContent>
          </Card>
          
          <Card className="p-1">
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>Monthly user acquisition</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}