import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface ChartBarProps {
  data: { name: string; value: number }[];
  title: string;
  color?: string;
}

export function ChartBar({ data, title, color = 'hsl(200 100% 50%)' }: ChartBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 border border-border"
    >
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
          <XAxis
            dataKey="name"
            stroke="hsl(215 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(215 20% 65%)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220 20% 8%)',
              border: '1px solid hsl(220 15% 18%)',
              borderRadius: '8px',
              color: 'hsl(210 40% 98%)',
            }}
            cursor={{ fill: 'hsl(220 15% 18% / 0.5)' }}
          />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
