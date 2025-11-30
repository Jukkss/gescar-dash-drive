import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VehicleTable } from '@/components/Tables/VehicleTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const initialVehicles = [
  { id: 'v001abc', model: 'Civic', brand: 'Honda', year: 2023, price: 125000, status: 'estoque' },
  { id: 'v002def', model: 'Corolla', brand: 'Toyota', year: 2024, price: 145000, status: 'estoque' },
  { id: 'v003ghi', model: 'Onix', brand: 'Chevrolet', year: 2023, price: 85000, status: 'estoque' },
  { id: 'v004jkl', model: 'HB20', brand: 'Hyundai', year: 2022, price: 72000, status: 'reparo' },
  { id: 'v005mno', model: 'T-Cross', brand: 'Volkswagen', year: 2024, price: 135000, status: 'estoque' },
  { id: 'v006pqr', model: 'Compass', brand: 'Jeep', year: 2023, price: 185000, status: 'estoque' },
  { id: 'v007stu', model: 'Kicks', brand: 'Nissan', year: 2023, price: 115000, status: 'estoque' },
  { id: 'v008vwx', model: 'Creta', brand: 'Hyundai', year: 2024, price: 140000, status: 'estoque' },
];

const initialFormData = {
  model: '',
  brand: '',
  year: '',
  price: '',
  status: 'estoque',
  color: '',
};

export function Estoque() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);
  const { toast } = useToast();

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.model || !formData.brand || !formData.year || !formData.price) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    if (editingId) {
      setVehicles((prev) =>
        prev.map((v) =>
          v.id === editingId
            ? {
                ...v,
                model: formData.model,
                brand: formData.brand,
                year: parseInt(formData.year),
                price: parseFloat(formData.price),
                status: formData.status,
                color: formData.color,
              }
            : v
        )
      );
      toast({
        title: 'Sucesso',
        description: 'Veículo atualizado com sucesso!',
      });
    } else {
      const newVehicle = {
        id: `v${Date.now().toString(36)}`,
        model: formData.model,
        brand: formData.brand,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        status: formData.status,
        color: formData.color,
      };
      setVehicles((prev) => [newVehicle, ...prev]);
      toast({
        title: 'Sucesso',
        description: 'Veículo cadastrado com sucesso!',
      });
    }

    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (vehicle) => {
    setFormData({
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year.toString(),
      price: vehicle.price.toString(),
      status: vehicle.status,
      color: vehicle.color || '',
    });
    setEditingId(vehicle.id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    toast({
      title: 'Sucesso',
      description: 'Veículo removido com sucesso!',
    });
  };

  const handleCloseDialog = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Estoque de Veículos</h1>
          <p className="text-muted-foreground">Gerencie seu estoque de veículos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" onClick={() => { setFormData(initialFormData); setEditingId(null); }}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Veículo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? 'Editar Veículo' : 'Cadastrar Veículo'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Honda"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="Civic"
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Ano *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="125000"
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    placeholder="Preto"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="estoque">Estoque</SelectItem>
                      <SelectItem value="vendido">Vendido</SelectItem>
                      <SelectItem value="reparo">Em Reparo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button type="submit" variant="hero">
                  {editingId ? 'Salvar' : 'Cadastrar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por modelo ou marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </motion.div>

      {/* Table */}
      <VehicleTable
        vehicles={filteredVehicles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={(v) => console.log('View', v)}
      />

      {filteredVehicles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          Nenhum veículo encontrado.
        </motion.div>
      )}
    </div>
  );
}