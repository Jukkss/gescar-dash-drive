import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  produto: [
    { name: 'Recursos', href: '/#recursos' },
    { name: 'Preços', href: '/#precos' },
    { name: 'Integrações', href: '/#integracoes' },
    { name: 'API', href: '/#api' },
  ],
  empresa: [
    { name: 'Sobre', href: '/#sobre' },
    { name: 'Equipe', href: '/#equipe' },
    { name: 'Carreiras', href: '/#carreiras' },
    { name: 'Blog', href: '/#blog' },
  ],
  suporte: [
    { name: 'Central de Ajuda', href: '/#ajuda' },
    { name: 'Documentação', href: '/#docs' },
    { name: 'Contato', href: '/#contato' },
    { name: 'Status', href: '/#status' },
  ],
  legal: [
    { name: 'Privacidade', href: '/#privacidade' },
    { name: 'Termos', href: '/#termos' },
    { name: 'Cookies', href: '/#cookies' },
    { name: 'Licenças', href: '/#licencas' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Car className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">
                Ges<span className="text-gradient">CAR</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Plataforma completa para gestão de concessionárias, estoque de veículos e relacionamento com clientes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Produto</h4>
            <ul className="space-y-2">
              {footerLinks.produto.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-muted-foreground">
            <a href="mailto:contato@gescar.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
              contato@gescar.com
            </a>
            <a href="tel:+5511999999999" className="flex items-center gap-2 hover:text-foreground transition-colors">
              <Phone className="w-4 h-4" />
              (11) 99999-9999
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              São Paulo, Brasil
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GesCAR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
