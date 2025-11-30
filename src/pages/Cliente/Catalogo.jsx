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

const mockVehicles = [
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
            whileHover={{ y: -8 }}
          >
            <Card className="bg-card border-border overflow-hidden hover:border-primary/60 hover:shadow-[0_0_30px_hsl(270_80%_55%/0.3)] transition-all duration-300 group">
              <div className="relative h-48 bg-gradient-to-br from-secondary to-background flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent z-10" />
                <Car className="w-24 h-24 text-primary/40 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-500" />
                <Badge className="absolute top-3 right-3 z-20 bg-primary text-primary-foreground border-0 shadow-lg">
                  Disponível
                </Badge>
              </div>
              <CardContent className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{vehicle.brand}</p>
                  <h3 className="text-xl font-bold text-foreground">{vehicle.model}</h3>
                  <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mt-1">
                    {vehicle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>
                
                <div className="flex justify-between items-center py-3 px-4 bg-secondary/50 rounded-lg">
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{vehicle.year}</span>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="flex flex-col items-center gap-1">
                    <Gauge className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{(vehicle.mileage / 1000).toFixed(0)}k km</span>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="flex flex-col items-center gap-1">
                    <Fuel className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{vehicle.fuel}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 border-border hover:border-primary hover:bg-primary/10">
                    Ver Detalhes
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground">
                    Fazer Proposta
                  </Button>
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