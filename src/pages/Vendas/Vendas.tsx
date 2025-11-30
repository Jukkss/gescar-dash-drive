import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, DollarSign, Calendar, User } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { StatCard } from '@/components/Cards/StatCard';

interface Sale {
  id: string;
  vehicleModel: string;
  vehicleBrand: string;
  buyerName: string;
  buyerEmail: string;
  salePrice: number;
  paymentMethod: string;
  date: string;
}

const initialSales: Sale[] = [
  {
    id: 's001',
    vehicleModel: 'Civic',
    vehicleBrand: 'Honda',
    buyerName: 'João Silva',
    buyerEmail: 'joao@email.com',
    salePrice: 125000,
    paymentMethod: 'Financiamento',
    date: '2024-01-15',
  },
  {
    id: 's002',
    vehicleModel: 'Corolla',
    vehicleBrand: 'Toyota',
    buyerName: 'Maria Santos',
    buyerEmail: 'maria@email.com',
    salePrice: 145000,
    paymentMethod: 'À Vista',
    date: '2024-01-12',
  },
  {
    id: 's003',
    vehicleModel: 'Compass',
    vehicleBrand: 'Jeep',
    buyerName: 'Pedro Costa',
    buyerEmail: 'pedro@email.com',
    salePrice: 185000,
    paymentMethod: 'Financiamento',
    date: '2024-01-10',
  },
];

export function Vendas() {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleModel: '',
    vehicleBrand: '',
    buyerName: '',
    buyerEmail: '',
    salePrice: '',
    paymentMethod: 'Financiamento',
  });
  const { toast } = useToast();

  const filteredSales = sales.filter(
    (s) =>
      s.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.buyerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSales = sales.reduce((acc, s) => acc + s.salePrice, 0);
  const averageSale = sales.length > 0 ? totalSales / sales.length : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleModel || !formData.buyerName || !formData.salePrice) {
      toast({
        title: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    const newSale: Sale = {
      id: `s${Date.now().toString(36)}`,
      vehicleModel: formData.vehicleModel,
      vehicleBrand: formData.vehicleBrand,
      buyerName: formData.buyerName,
      buyerEmail: formData.buyerEmail,
      salePrice: parseFloat(formData.salePrice),
      paymentMethod: formData.paymentMethod,
      date: new Date().toISOString().split('T')[0],
    };

    setSales((prev) => [newSale, ...prev]);
    toast({
      title: 'Sucesso',
      description: 'Venda registrada com sucesso!',
    });

    setFormData({
      vehicleModel: '',
      vehicleBrand: '',
      buyerName: '',
      buyerEmail: '',
      salePrice: '',
      paymentMethod: 'Financiamento',
    });
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
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Vendas</h1>
          <p className="text-muted-foreground">Gerencie suas vendas e histórico</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Registrar Venda</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleBrand">Marca *</Label>
                  <Input
                    id="vehicleBrand"
                    value={formData.vehicleBrand}
                    onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                    placeholder="Honda"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicleModel">Modelo *</Label>
                  <Input
                    id="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    placeholder="Civic"
                    className="bg-background border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerName">Nome do Comprador *</Label>
                <Input
                  id="buyerName"
                  value={formData.buyerName}
                  onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                  placeholder="João Silva"
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyerEmail">Email do Comprador</Label>
                <Input
                  id="buyerEmail"
                  type="email"
                  value={formData.buyerEmail}
                  onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                  placeholder="joao@email.com"
                  className="bg-background border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salePrice">Valor da Venda *</Label>
                  <Input
                    id="salePrice"
                    type="number"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="125000"
                    className="bg-background border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Pagamento</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="Financiamento">Financiamento</SelectItem>
                      <SelectItem value="À Vista">À Vista</SelectItem>
                      <SelectItem value="Consórcio">Consórcio</SelectItem>
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
          title="Total de Vendas"
          value={sales.length}
          icon={Calendar}
          variant="primary"
        />
        <StatCard
          title="Valor Total"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSales)}
          icon={DollarSign}
          variant="success"
        />
        <StatCard
          title="Ticket Médio"
          value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(averageSale)}
          icon={User}
          variant="accent"
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
          placeholder="Buscar por veículo ou comprador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </motion.div>

      {/* Sales List */}
      <div className="grid gap-4">
        {filteredSales.map((sale, index) => (
          <motion.div
            key={sale.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 border border-border"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">
                    {sale.vehicleBrand} {sale.vehicleModel}
                  </h3>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-success/20 text-success">
                    Concluída
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {sale.buyerName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(sale.date).toLocaleDateString('pt-BR')}
                  </span>
                  <span>{sale.paymentMethod}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gradient">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.salePrice)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          Nenhuma venda encontrada.
        </motion.div>
      )}
    </div>
  );
}
