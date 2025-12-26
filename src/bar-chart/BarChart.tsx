import Card from '../Card';
import './BarChart.scss';
import { useMemo } from 'react';

interface BarData {
  val: number;
  color: string;
  label: string;
}

const BARS: BarData[] = [
  { val: 10, color: '#123456', label: 'a_label' },
  { val: 25, color: '#ff5733', label: 'revenue' },
  { val: 15, color: '#33c3ff', label: 'expenses' },
  { val: 30, color: '#4caf50', label: 'profit' },
  { val: 12, color: '#ff9800', label: 'growth' },
  { val: 8, color: '#9c27b0', label: 'overhead' },
  { val: 20, color: '#e91e63', label: 'marketing' },
  { val: 18, color: '#00bcd4', label: 'operations' },
  { val: 22, color: '#ffeb3b', label: 'research' },
  { val: 14, color: '#795548', label: 'development' },
];

function Bar({ data, maxVal }: { data: BarData; maxVal: number }) {
  return (
    <div
      className='bars'
      style={{ height: `${(100 * data.val) / maxVal}%`, backgroundColor: data.color }}
    >
      <div className='tooltip'>{data.val}</div>
    </div>
  );
}

export default function BarChart() {
  const maxVal = useMemo(() => {
    return Math.max(...BARS.map((bar) => bar.val));
  }, []);

  return (
    <Card header='Bar Chart' id='BarChart'>
      <div className='bar-chart'>
        <div className='y-axis'>y axis</div>
        <div className='plot'>
          {BARS.map((bar: BarData) => (
            <Bar key={bar.label} data={bar} maxVal={maxVal} />
          ))}
        </div>
        <div className='x-axis'>x axis</div>
      </div>
    </Card>
  );
}
