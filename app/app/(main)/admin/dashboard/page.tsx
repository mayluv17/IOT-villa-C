import { ShadBarChart } from '@/components/bar-chart';
import Occupancy from '@/components/occupancy';
import { RadialChart } from '@/components/radial-chart';
import { WaterLeakage } from '@/components/waterLeakage';
export default function Dashboard() {
  return (
    <div className="grid auto-rows-min gap-4 sm:grid-cols md:grid-cols-3 ">
      <div className="max-w-screen-sm">
        <WaterLeakage />
      </div>

      <div className="max-w-screen-sm">
        <RadialChart />
      </div>
      <div className="max-w-screen-sm">
        <ShadBarChart />
      </div>
      <div className="max-w-screen-sm">
        <Occupancy />
      </div>
    </div>
  );
}
