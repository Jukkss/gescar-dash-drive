import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, ShoppingCart, Wrench, Users, TrendingUp, Filter } from 'lucide-react';
import { StatCard } from '@/components/Cards/StatCard';
import { ChartPie } from '@/components/Charts/ChartPie';
import { ChartLine } from '@/components/Charts/ChartLine';
import { ChartBar } from '@/components/Charts/ChartBar';
import { VehicleTable, Vehicle } from '@/components/Tables/VehicleTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data
const statsData = [
  { title: 'Veículos em Estoque', value: 124, icon: Car, trend: { value: 12, isPositive: true }, variant: 'primary' as const },
  { title: 'Vendidos este Mês', value: 23, icon: ShoppingCart, trend: { value: 8, isPositive: true }, variant: 'success' as const },
  { title: 'Em Reparo', value: 7, icon: Wrench, trend: { value: 2, isPositive: false }, variant: 'warning' as const },
  { title: 'Clientes Ativos', value: 342, icon: Users, trend: { value: 15, isPositive: true }, variant: 'accent' as const },
];

const statusChartData = [
  { name: 'Estoque', value: 124, color: 'hsl(142 76% 36%)' },
  { name: 'Vendido', value: 89, color: 'hsl(250 80% 60%)' },
  { name: 'Em Reparo', value: 7, color: 'hsl(38 92% 50%)' },
];

const salesChartData = [
  { name: 'Jan', value: 12 },
  { name: 'Fev', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Abr', value: 22 },
  { name: 'Mai', value: 28 },
  { name: 'Jun', value: 23 },
];

const stockChartData = [
  { name: 'SUV', value: 45 },
  { name: 'Sedan', value: 38 },
  { name: 'Hatch', value: 22 },
  { name: 'Pickup', value: 12 },
  { name: 'Esportivo', value: 7 },
];

const mockVehicles: Vehicle[] = [
  { id: 'v001abc', model: 'Civic', brand: 'Honda', year: 2023, price: 125000, status: 'estoque' },
  { id: 'v002def', model: 'Corolla', brand: 'Toyota', year: 2024, price: 145000, status: 'estoque' },
  { id: 'v003ghi', model: 'Onix', brand: 'Chevrolet', year: 2023, price: 85000, status: 'vendido' },
  { id: 'v004jkl', model: 'HB20', brand: 'Hyundai', year: 2022, price: 72000, status: 'reparo' },
  { id: 'v005mno', model: 'T-Cross', brand: 'Volkswagen', year: 2024, price: 135000, status: 'estoque' },
  { id: 'v006pqr', model: 'Compass', brand: 'Jeep', year: 2023, price: 185000, status: 'vendido' },
];

export function Dashboard() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>('all');

  const filteredVehicles = vehicles.filter((v) => {
    if (statusFilter !== 'all' && v.status !== statusFilter) return false;
    if (brandFilter !== 'all' && v.brand !== brandFilter) return false;
    return true;
  });

  const uniqueBrands = [...new Set(vehicles.map((v) => v.brand))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da sua concessionária</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            variant={stat.variant}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <ChartPie data={statusChartData} title="Status dos Veículos" />
        <ChartLine data={salesChartData} title="Vendas por Mês" />
        <ChartBar data={stockChartData} title="Estoque por Categoria" />
      </div>

      {/* Vehicles Table */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">Veículos Recentes</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filtros:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-card border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="estoque">Estoque</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
                <SelectItem value="reparo">Em Reparo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-[140px] bg-card border-border">
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="all">Todas</SelectItem>
                {uniqueBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <VehicleTable
          vehicles={filteredVehicles}
          onEdit={(v) => console.log('Edit', v)}
          onDelete={(id) => console.log('Delete', id)}
          onView={(v) => console.log('View', v)}
        />
      </div>
    </div>
  );
}
