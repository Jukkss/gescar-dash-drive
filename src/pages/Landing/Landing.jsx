import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Car, Shield, Zap, BarChart3, Users, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import heroImage from '@/assets/hero-car.jpg';
import gescarLogo from '@/assets/gescar-logo.png';

const features = [
  {
    icon: Car,
    title: 'Gestão de Estoque',
    description: 'Controle completo de veículos com status em tempo real, histórico e documentação.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Dados criptografados e backup automático para proteger suas informações.',
  },
  {
    icon: Zap,
    title: 'Vendas Ágeis',
    description: 'Processo de venda simplificado com propostas, financiamento e contratos digitais.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios Inteligentes',
    description: 'Analytics avançados com insights sobre vendas, estoque e performance.',
  },
  {
    icon: Users,
    title: 'CRM Integrado',
    description: 'Gestão de clientes com histórico de interações e acompanhamento de leads.',
  },
  {
    icon: Clock,
    title: 'Agendamentos',
    description: 'Sistema de agendamentos para test-drive, visitas e serviços de manutenção.',
  },
];

const stats = [
  { value: '500+', label: 'Concessionárias' },
  { value: '50k+', label: 'Veículos gerenciados' },
  { value: '98%', label: 'Satisfação' },
  { value: '24/7', label: 'Suporte' },
];

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-primary font-medium">Nova versão disponível</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                Gestão e experiência,{' '}
                <span className="text-gradient">simplificadas.</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Plataforma que conecta concessionárias e clientes com gestão de estoque, agendamentos e propostas — tudo em uma interface clara e rápida.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/cadastro">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Registrar
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href="#recursos">
                  <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
                    Saiba mais
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center lg:text-left"
                  >
                    <p className="text-2xl lg:text-3xl font-bold text-gradient">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-neon-cyan/20 rounded-3xl blur-2xl" />
                <img
                  src={heroImage}
                  alt="Interior de carro de luxo com iluminação neon"
                  className="relative rounded-2xl shadow-2xl border border-border/50 w-full"
                />
              </div>
              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-8 bottom-20 glass-card p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <img src={gescarLogo} alt="GesCar" className="w-10 h-10" />
                  <div>
                    <p className="text-sm font-medium text-foreground">+23% vendas</p>
                    <p className="text-xs text-muted-foreground">este mês</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="recursos" className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Tudo que você precisa para{' '}
              <span className="text-gradient">crescer</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ferramentas poderosas para gerenciar sua concessionária de forma eficiente e inteligente.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 border border-border hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-neon-cyan/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pronto para transformar sua{' '}
              <span className="text-gradient">concessionária?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de concessionárias que já estão usando o GesCAR para aumentar suas vendas e melhorar a experiência dos clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cadastro">
                <Button variant="hero" size="xl">
                  Começar gratuitamente
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="hero-outline" size="xl">
                  Já tenho conta
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}