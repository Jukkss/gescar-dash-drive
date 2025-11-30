import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Wrench, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { StatCard } from '@/components/Cards/StatCard';
import { cn } from '@/lib/utils';

interface Repair {
  id: string;
  vehicleModel: string;
  vehicleBrand: string;
  description: string;
  estimatedCost: number;
  status: 'em_andamento' | 'concluido';
  entryDate: string;
}

const initialRepairs: Repair[] = [
  {
    id: 'r001',
    vehicleModel: 'HB20',
    vehicleBrand: 'Hyundai',
    description: 'Troca de pastilhas de freio e revisão geral',
    estimatedCost: 850,
    status: 'em_andamento',
    entryDate: '2024-01-14',
  },
  {
    id: 'r002',
    vehicleModel: 'Onix',
    vehicleBrand: 'Chevrolet',
    description: 'Reparo no ar condicionado',
    estimatedCost: 1200,
    status: 'em_andamento',
    entryDate: '2024-01-13',
  },
  {
    id: 'r003',
    vehicleModel: 'Corolla',
    vehicleBrand: 'Toyota',
    description: 'Troca de óleo e filtros',
    estimatedCost: 450,
    status: 'concluido',
    entryDate: '2024-01-10',
  },
];

export function Reparos() {
  const [repairs, setRepairs] = useState<Repair[]>(initialRepairs);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<{
    vehicleModel: string;
    vehicleBrand: string;
    description: string;
    estimatedCost: string;
    status: 'em_andamento' | 'concluido';
  }>({
    vehicleModel: '',
    vehicleBrand: '',
    description: '',
    estimatedCost: '',
    status: 'em_andamento',
  });
  const { toast } = useToast();

  const filteredRepairs = repairs.filter(
    (r) =>
      r.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehicleBrand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inProgressCount = repairs.filter((r) => r.status === 'em_andamento').length;
  const completedCount = repairs.filter((r) => r.status === 'concluido').length;
  const totalCost = repairs.reduce((acc, r) => acc + r.estimatedCost, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleModel || !formData.description) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const newRepair: Repair = {
      id: `r${Date.now().toString(36)}`,
      vehicleModel: formData.vehicleModel,
      vehicleBrand: formData.vehicleBrand,
      description: formData.description,
      estimatedCost: parseFloat(formData.estimatedCost) || 0,
      status: formData.status,
      entryDate: new Date().toISOString().split('T')[0],
    };

    setRepairs((prev) => [newRepair, ...prev]);
    toast({
      title: 'Sucesso',
      description: 'Reparo registrado com sucesso!',
    });

    setFormData({
      vehicleModel: '',
      vehicleBrand: '',
      description: '',
      estimatedCost: '',
      status: 'em_andamento',
    });
    setIsDialogOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: 'em_andamento' | 'concluido') => {
    setRepairs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    toast({
      title: 'Status Atualizado',
      description: newStatus === 'concluido' ? 'Reparo concluído!' : 'Reparo em andamento.',
    });
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
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Reparos</h1>
          <p className="text-muted-foreground">Gerencie os serviços de manutenção</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Novo Reparo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Registrar Reparo</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">Marca *</Label>
                  <Input
                    id="vehicleBrand"
                    value={formData.vehicleBrand}
                    onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                    placeholder="Hyundai"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Modelo *</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    placeholder="HB20"
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Serviço *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o serviço a ser realizado..."
                  className="bg-background border-border min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedCost">Custo Estimado</Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    value={formData.estimatedCost}
                    onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                    placeholder="850"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value as 'em_andamento' | 'concluido' })
                    }
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="em_andamento">Em Andamento</SelectItem>
                      <SelectItem value="concluido">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="hero">
                  Registrar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Em Andamento"
          value={inProgressCount}
          icon={Clock}
          variant="warning"
        />
        <StatCard
          title="Concluídos"
          value={completedCount}
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Custo Total"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCost)}
          icon={Wrench}
          variant="primary"
        />
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por veículo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </motion.div>

      {/* Repairs List */}
      <div className="grid gap-4">
        {filteredRepairs.map((repair, index) => (
          <motion.div
            key={repair.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 border border-border"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">
                    {repair.vehicleBrand} {repair.vehicleModel}
                  </h3>
                  <span
                    className={cn(
                      'px-2 py-0.5 text-xs rounded-full flex items-center gap-1',
                      repair.status === 'em_andamento'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-success/20 text-success'
                    )}
                  >
                    {repair.status === 'em_andamento' ? (
                      <>
                        <Clock className="w-3 h-3" />
                        Em Andamento
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Concluído
                      </>
                    )}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">{repair.description}</p>
                <p className="text-sm text-muted-foreground">
                  Entrada: {new Date(repair.entryDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <p className="text-xl font-bold text-foreground">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(repair.estimatedCost)}
                </p>
                <Select
                  value={repair.status}
                  onValueChange={(value) =>
                    handleStatusChange(repair.id, value as 'em_andamento' | 'concluido')
                  }
                >
                  <SelectTrigger className="w-[150px] bg-background border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredRepairs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          Nenhum reparo encontrado.
        </motion.div>
      )}
    </div>
  );
}
