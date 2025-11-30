import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  status: 'estoque' | 'vendido' | 'reparo';
  color?: string;
  mileage?: number;
}

interface VehicleTableProps {
  vehicles: Vehicle[];
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
  onView?: (vehicle: Vehicle) => void;
}

const statusStyles = {
  estoque: 'bg-success/20 text-success border-success/30',
  vendido: 'bg-primary/20 text-primary border-primary/30',
  reparo: 'bg-warning/20 text-warning border-warning/30',
};

const statusLabels = {
  estoque: 'Estoque',
  vendido: 'Vendido',
  reparo: 'Em Reparo',
};

export function VehicleTable({ vehicles, onEdit, onDelete, onView }: VehicleTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card border border-border overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">ID</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Modelo</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Marca</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Ano</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Preço</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Status</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-muted-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <motion.tr
                key={vehicle.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-4 px-6 text-sm text-muted-foreground font-mono">
                  #{vehicle.id.slice(0, 6)}
                </td>
                <td className="py-4 px-6 text-sm font-medium text-foreground">
                  {vehicle.model}
                </td>
                <td className="py-4 px-6 text-sm text-foreground">
                  {vehicle.brand}
                </td>
                <td className="py-4 px-6 text-sm text-foreground">
                  {vehicle.year}
                </td>
                <td className="py-4 px-6 text-sm text-foreground font-medium">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(vehicle.price)}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium border',
                      statusStyles[vehicle.status]
                    )}
                  >
                    {statusLabels[vehicle.status]}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => onView?.(vehicle)} className="cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(vehicle)} className="cursor-pointer">
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete?.(vehicle.id)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
