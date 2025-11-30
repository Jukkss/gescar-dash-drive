import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Car, Calendar, Gauge, Fuel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Vehicle {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  image: string;
}

const mockVehicles: Vehicle[] = [
  { id: '1', model: 'Civic', brand: 'Honda', year: 2023, price: 125000, mileage: 15000, fuel: 'Flex', image: '/placeholder.svg' },
  { id: '2', model: 'Corolla', brand: 'Toyota', year: 2024, price: 145000, mileage: 8000, fuel: 'Híbrido', image: '/placeholder.svg' },
  { id: '3', model: 'Onix', brand: 'Chevrolet', year: 2023, price: 85000, mileage: 25000, fuel: 'Flex', image: '/placeholder.svg' },
  { id: '4', model: 'HB20', brand: 'Hyundai', year: 2022, price: 72000, mileage: 35000, fuel: 'Flex', image: '/placeholder.svg' },
  { id: '5', model: 'T-Cross', brand: 'Volkswagen', year: 2024, price: 135000, mileage: 5000, fuel: 'Flex', image: '/placeholder.svg' },
  { id: '6', model: 'Compass', brand: 'Jeep', year: 2023, price: 185000, mileage: 12000, fuel: 'Diesel', image: '/placeholder.svg' },
];

export function Catalogo() {
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  
  const uniqueBrands = [...new Set(mockVehicles.map((v) => v.brand))];
  
  const filteredVehicles = mockVehicles.filter((v) => {
    const matchesSearch = v.model.toLowerCase().includes(search.toLowerCase()) ||
                         v.brand.toLowerCase().includes(search.toLowerCase());
    const matchesBrand = brandFilter === 'all' || v.brand === brandFilter;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Catálogo de Veículos</h1>
        <p className="text-muted-foreground">Encontre o carro dos seus sonhos</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por modelo ou marca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[160px] bg-card border-border">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Marcas</SelectItem>
              {uniqueBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, index) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors group">
              <div className="relative h-48 bg-secondary flex items-center justify-center">
                <Car className="w-20 h-20 text-muted-foreground group-hover:text-primary transition-colors" />
                <Badge className="absolute top-3 right-3 bg-primary/20 text-primary border-0">
                  Disponível
                </Badge>
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-foreground">{vehicle.brand} {vehicle.model}</h3>
                  <p className="text-2xl font-bold text-primary">
                    {vehicle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{vehicle.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Gauge className="w-4 h-4" />
                    <span>{(vehicle.mileage / 1000).toFixed(0)}k km</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                    <Fuel className="w-4 h-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Ver Detalhes</Button>
                  <Button variant="hero" className="flex-1">Fazer Proposta</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <div className="text-center py-12">
          <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Nenhum veículo encontrado</p>
        </div>
      )}
    </div>
  );
}
