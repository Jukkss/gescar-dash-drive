import { motion } from 'framer-motion';
import { FileText, Car, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Proposta {
  id: string;
  vehicle: string;
  value: number;
  status: 'pendente' | 'aprovada' | 'recusada';
  date: string;
}

const mockPropostas: Proposta[] = [
  { id: '1', vehicle: 'Honda Civic 2023', value: 120000, status: 'pendente', date: '2024-01-15' },
  { id: '2', vehicle: 'Toyota Corolla 2024', value: 140000, status: 'aprovada', date: '2024-01-10' },
  { id: '3', vehicle: 'Chevrolet Onix 2023', value: 80000, status: 'recusada', date: '2024-01-05' },
];

const statusConfig = {
  pendente: { label: 'Pendente', icon: Clock, className: 'bg-warning/20 text-warning' },
  aprovada: { label: 'Aprovada', icon: CheckCircle, className: 'bg-success/20 text-success' },
  recusada: { label: 'Recusada', icon: XCircle, className: 'bg-destructive/20 text-destructive' },
};

export function Propostas() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Minhas Propostas</h1>
        <p className="text-muted-foreground">Acompanhe suas propostas de compra</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{mockPropostas.length}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{mockPropostas.filter(p => p.status === 'aprovada').length}</p>
            <p className="text-sm text-muted-foreground">Aprovadas</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{mockPropostas.filter(p => p.status === 'pendente').length}</p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Propostas List */}
      <div className="space-y-4">
        {mockPropostas.map((proposta, index) => {
          const config = statusConfig[proposta.status];
          const StatusIcon = config.icon;
          
          return (
            <motion.div
              key={proposta.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-card border-border">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <Car className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{proposta.vehicle}</h3>
                        <p className="text-sm text-muted-foreground">
                          Proposta: {proposta.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Enviada em {new Date(proposta.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={`${config.className} border-0`}>
                        <StatusIcon className="w-3.5 h-3.5 mr-1" />
                        {config.label}
                      </Badge>
                      {proposta.status === 'pendente' && (
                        <Button variant="outline" size="sm">Cancelar</Button>
                      )}
                      {proposta.status === 'aprovada' && (
                        <Button variant="hero" size="sm">Ver Detalhes</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {mockPropostas.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Você ainda não fez nenhuma proposta</p>
          <Button variant="hero" className="mt-4">Ver Catálogo</Button>
        </div>
      )}
    </div>
  );
}
