import { Line, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, BarChart as RechartsBarChart, AreaChart as RechartsAreaChart } from 'recharts';

const data = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 2000 },
  { month: 'Mar', value: 1500 },
  { month: 'Apr', value: 3000 },
  { month: 'May', value: 2500 },
  { month: 'Jun', value: 4000 },
  { month: 'Jul', value: 3500 },
  { month: 'Aug', value: 5000 },
  { month: 'Sep', value: 4500 },
  { month: 'Oct', value: 6000 },
  { month: 'Nov', value: 5500 },
  { month: 'Dec', value: 7000 },
];

export function AreaChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsAreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.2} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--chart-2))" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}