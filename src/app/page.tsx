import Link from 'next/link';
import { 
  Store, 
  BarChart3, 
  CreditCard, 
  Package, 
  Users, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
  PanelLeftClose,
  LayoutDashboard,
  ShoppingCart,
  History,
  Settings,
  LogOut,
  DollarSign,
  Hash,
  List,
  ClipboardList,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { ProbarPlataforma } from '@/components/probar-plataforma';

export default function Home() {
  const posUrl = process.env.NEXT_PUBLIC_POS_URL || 'https://app.sellalles.com';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">SellAlleS</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#caracteristicas" className="hover:text-primary transition-colors">Características</Link>
            <Link href="#precios" className="hover:text-primary transition-colors">Precios</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">Preguntas</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href={`${posUrl}/login`} className="hidden sm:inline-flex text-sm font-medium hover:text-primary transition-colors">
              Iniciar sesión
            </a>
            <a href={`${posUrl}/login?mode=register`} className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow hover:bg-accent-hover transition-colors">
              Crear cuenta gratis
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28 overflow-hidden bg-white">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                El punto de venta que <span className="text-primary">crece</span> con tu negocio.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Vende, controla tu inventario y lleva tus cuentas desde la nube. Una o varias sucursales, sin instalar nada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`${posUrl}/login?mode=register`} className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-base font-medium text-white shadow-lg hover:bg-accent-hover transition-colors">
                  Crear cuenta gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <ProbarPlataforma posUrl={posUrl} />
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Sin tarjeta de crédito</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Cancela cuando quieras</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none mt-8 lg:mt-0">
              <div className="relative rounded-xl border border-gray-200 bg-white p-2 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-xl -z-10 transform translate-x-4 translate-y-4"></div>
                <img 
                  src="/dashboard.png" 
                  alt="Dashboard de SellAlleS" 
                  className="rounded-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Logos/credibilidad */}
        <section className="border-y border-gray-100 bg-gray-50 py-10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Hecho para negocios dominicanos</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale">
               <Store className="h-8 w-8" />
               <Building2 className="h-8 w-8" />
               <Package className="h-8 w-8" />
               <Users className="h-8 w-8" />
            </div>
          </div>
        </section>

        {/* Características */}
        <section id="caracteristicas" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitas para operar</h2>
              <p className="text-lg text-gray-600">Herramientas poderosas diseñadas para la realidad de los negocios en República Dominicana.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Store, title: "POS rápido y ágil", desc: "Búsqueda por nombre o código de barras. Maneja varios carritos simultáneamente sin perder la venta." },
                { icon: Package, title: "Inventario por sucursal", desc: "Controla tu stock en tiempo real. Traslada mercancía entre sucursales fácilmente." },
                { icon: CreditCard, title: "Crédito y financiamiento", desc: "Crea planes de pago con cuotas e intereses. Lleva el control de tus cuentas por cobrar." },
                { icon: BarChart3, title: "Reportes claros", desc: "Ventas por día, por sucursal, por producto y por vendedor. Toma decisiones con datos." },
                { icon: Building2, title: "Multi-sucursal", desc: "Administra todos tus locales desde una sola cuenta, con permisos por usuario." },
                { icon: FileText, title: "Clientes y NCF", desc: "Genera comprobantes fiscales de la DGII cuando los necesites, o usa tickets simples." },
              ].map((feat, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
             <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Empieza en minutos, no en meses</h2>
              <p className="text-lg text-gray-600">Un proceso de configuración simple para que comiences a facturar de inmediato.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
               <div className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">1</div>
                  <h3 className="text-xl font-bold mb-3">Crea tu cuenta</h3>
                  <p className="text-gray-600">Regístrate gratis. No necesitas RNC ni estar formalizado para empezar a usar el sistema.</p>
               </div>
               <div className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">2</div>
                  <h3 className="text-xl font-bold mb-3">Agrega tus datos</h3>
                  <p className="text-gray-600">Configura tus sucursales y carga tus primeros productos al inventario.</p>
               </div>
               <div className="text-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">3</div>
                  <h3 className="text-xl font-bold mb-3">Empieza a vender</h3>
                  <p className="text-gray-600">Abre tu caja y comienza a registrar ventas desde cualquier dispositivo.</p>
               </div>
            </div>
          </div>
        </section>

        {/* Sección DGII */}
        <section className="py-20 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <ShieldCheck className="h-4 w-4" />
                Cumplimiento Fiscal
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Formalízate a tu ritmo</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                ¿Aún no tienes RNC? No hay problema. <strong>Empieza a organizar tu negocio hoy mismo</strong> usando tickets internos.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Cuando estés listo para formalizarte, SellAlleS está preparado para emitir Comprobantes Fiscales (NCF) y Facturación Electrónica (e-CF, Ley 32-23) de la DGII con solo activar una opción.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="h-5 w-5 text-green-500" /> Opera con o sin RNC</li>
                <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="h-5 w-5 text-green-500" /> Listo para Facturación Electrónica</li>
                <li className="flex items-center gap-3 font-medium text-gray-800"><CheckCircle2 className="h-5 w-5 text-green-500" /> Reportes para tu contable</li>
              </ul>
            </div>
            <div className="relative">
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                 <h3 className="font-bold text-xl mb-4 border-b pb-4">Ejemplo de Ticket</h3>
                 <div className="space-y-4 text-sm font-mono text-gray-600">
                    <div className="text-center">
                      <p className="font-bold text-black text-base">COLMADO EL PROGRESO</p>
                      <p>RNC: 132-XXXXX-X</p>
                      <p>Factura de Consumo</p>
                      <p>NCF: B0200000001</p>
                    </div>
                    <div className="border-t border-dashed pt-4">
                      <div className="flex justify-between"><span>2x Refresco 20oz</span><span>RD$ 100.00</span></div>
                      <div className="flex justify-between"><span>1x Pan de Agua</span><span>RD$  15.00</span></div>
                      <div className="flex justify-between"><span>1x Salami (libra)</span><span>RD$ 120.00</span></div>
                    </div>
                    <div className="border-t border-dashed pt-4 font-bold text-black flex justify-between text-base">
                      <span>TOTAL</span>
                      <span>RD$ 235.00</span>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Planes simples y transparentes</h2>
              <p className="text-lg text-gray-600">Precios en pesos dominicanos. Sin cargos ocultos ni contratos amarrados.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* Gratis */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Prueba Gratis</h3>
                <p className="text-gray-500 text-sm mb-6">Prueba todas las funciones por 14 días.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">RD$ 0</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> 1 Sucursal</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> 2 Usuarios</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Inventario completo</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Sin tarjeta de crédito</li>
                </ul>
                <a href={`${posUrl}/login?mode=register`} className="block w-full py-2.5 px-4 rounded-lg border-2 border-primary text-primary font-semibold text-center hover:bg-primary/5 transition-colors">
                  Iniciar prueba
                </a>
              </div>

              {/* Pro (Recomendado) */}
              <div className="rounded-2xl border-2 border-accent bg-white p-8 shadow-xl relative transform md:-translate-y-4">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  RECOMENDADO
                </div>
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-gray-500 text-sm mb-6">Para negocios en crecimiento.</p>
                <div className="mb-6">
                  <div>
                    <span className="text-4xl font-bold">RD$ 1,950</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    pagando 1 año · o <span className="font-medium text-gray-700">RD$ 2,300/mes</span> mes a mes
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>1 Sucursal <span className="text-gray-400 text-xs ml-1">(pago extra por adicionales)</span></span>
                  </li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> 10 Usuarios</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Crédito y financiamiento</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Reportes avanzados</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> NCF Tradicional</li>
                </ul>
                <a href={`${posUrl}/login?mode=register`} className="block w-full py-2.5 px-4 rounded-lg bg-accent text-white font-semibold text-center hover:bg-accent-hover transition-colors shadow-md">
                  Empezar ahora
                </a>
              </div>

              {/* Empresarial */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Empresarial</h3>
                <p className="text-gray-500 text-sm mb-6">Para operaciones a gran escala.</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">A medida</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Sucursales ilimitadas</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Usuarios ilimitados</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Facturación Electrónica (e-CF)</li>
                  <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> Soporte prioritario</li>
                </ul>
                <a href="https://wa.me/18299333226?text=Hola,%20me%20interesa%20cotizar%20el%20plan%20Empresarial%20de%20SellAlleS" target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 px-4 rounded-lg bg-yellow-400 text-yellow-950 font-semibold text-center hover:bg-yellow-500 transition-colors shadow-md">
                  Cotizar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { q: "¿Necesito estar formalizado en la DGII?", a: "No para empezar. Puedes usar SellAlleS para controlar tu inventario y ventas con tickets internos. Cuando te formalices, activamos la opción de NCF." },
                { q: "¿Funciona si tengo varias sucursales?", a: "¡Sí! SellAlleS es multi-sucursal. Puedes ver el inventario y las ventas de cada local de forma independiente o consolidada desde tu misma cuenta." },
                { q: "¿Mis datos están seguros?", a: "Totalmente. Tus datos están respaldados en la nube y asilados por empresa. Solo tú y los usuarios a los que les des permiso pueden acceder a tu información." },
                { q: "¿Necesito instalar algún programa?", a: "No. SellAlleS funciona 100% en la web. Solo necesitas un navegador (Chrome, Safari, Edge) y conexión a internet para acceder desde tu PC, tablet o celular." }
              ].map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-bold mb-2 flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 pl-8">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-primary relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="container mx-auto px-4 text-center relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Toma el control de tu negocio hoy</h2>
             <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto text-white">
               Únete a cientos de dueños de negocios en República Dominicana que ya están vendiendo más y mejor con SellAlleS.
             </p>
             <a href={`${posUrl}/login?mode=register`} className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-bold text-white shadow-xl hover:bg-accent-hover hover:scale-105 transition-all">
                Empieza gratis hoy
             </a>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SellAlleS</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              El punto de venta web diseñado para impulsar el crecimiento de las PYMES en República Dominicana.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="#caracteristicas" className="hover:text-primary">Características</Link></li>
              <li><Link href="#precios" className="hover:text-primary">Precios</Link></li>
              <li><Link href="#" className="hover:text-primary">Facturación e-CF</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Soporte Técnico</li>
              <li>Ventas</li>
              <li><a href="https://instagram.com/sellalles.rd" className="hover:text-primary">@sellalles.rd</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} SellAlleS. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
