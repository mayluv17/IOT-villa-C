'use client';
import { NegativeBarChar } from '@/components/bar-chart';
import Occupancy from '@/components/occupancy';
import { RadialChart } from '@/components/radial-chart';
import { WaterLeakage } from '@/components/waterLeakage';
import { getDashboardData } from '@/lib/services/request.service';
import { useQuery } from '@tanstack/react-query';
export default function Dashboard() {
  const { data: requestsData = [] } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: () => getDashboardData(),
  });

  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols md:grid-cols-3 ">
      <div className="max-w-screen-sm">
        <WaterLeakage moisture={requestsData?.data?.moisture} />
      </div>

      <div className="max-w-screen-sm">
        <RadialChart woodLevel={requestsData?.data?.distance} />
      </div>
      <div className="max-w-screen-sm">
        <NegativeBarChar chartData={requestsData?.data?.temperature} />
      </div>
      <div className="max-w-screen-sm">
        <Occupancy
          motion={[
            requestsData?.data?.motion1,
            requestsData?.data?.motion2,
            requestsData?.data?.motion3,
            requestsData?.data?.motion4,
          ]}
        />
      </div>
    </div>
  );
}
