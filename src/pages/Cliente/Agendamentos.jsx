import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Car, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const mockAgendamentos = [
  { id: '1', vehicle: 'Honda Civic 2023', type: 'test_drive', date: '2024-01-20', time: '14:00', location: 'Loja Centro', status: 'agendado' },
  { id: '2', vehicle: 'Toyota Corolla 2024', type: 'visita', date: '2024-01-18', time: '10:00', location: 'Loja Norte', status: 'concluido' },
];

const statusConfig = {
  agendado: { label: 'Agendado', className: 'bg-primary/20 text-primary' },
  concluido: { label: 'Concluído', className: 'bg-success/20 text-success' },
  cancelado: { label: 'Cancelado', className: 'bg-destructive/20 text-destructive' },
};

export function Agendamentos() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleNewAgendamento = () => {
    toast({
      title: 'Agendamento criado!',
      description: 'Você receberá um email de confirmação.',
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie suas visitas e test drives</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visita">Visita</SelectItem>
                    <SelectItem value="test_drive">Test Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Veículo de interesse</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Selecione o veículo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civic">Honda Civic 2023</SelectItem>
                    <SelectItem value="corolla">Toyota Corolla 2024</SelectItem>
                    <SelectItem value="tcross">VW T-Cross 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label>Horário</Label>
                  <Input type="time" className="bg-secondary border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Unidade</Label>
                <Select>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centro">Loja Centro</SelectItem>
                    <SelectItem value="norte">Loja Norte</SelectItem>
                    <SelectItem value="sul">Loja Sul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="hero" className="w-full" onClick={handleNewAgendamento}>
                Confirmar Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Agendamentos List */}
      <div className="space-y-4">
        {mockAgendamentos.map((agendamento, index) => {
          const config = statusConfig[agendamento.status];
          
          return (
            <motion.div
              key={agendamento.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                        <Car className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{agendamento.vehicle}</h3>
                        <p className="text-sm text-primary font-medium capitalize">
                          {agendamento.type === 'test_drive' ? 'Test Drive' : 'Visita'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(agendamento.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{agendamento.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{agendamento.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={`${config.className} border-0`}>
                        {config.label}
                      </Badge>
                      {agendamento.status === 'agendado' && (
                        <Button variant="outline" size="sm">Cancelar</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {mockAgendamentos.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Você não tem agendamentos</p>
          <Button variant="hero" className="mt-4" onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Agendar Visita
          </Button>
        </div>
      )}
    </div>
  );
}