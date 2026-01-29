import React, { useState } from 'react';
import { 
  Download, 
  Users, 
  Truck, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  LayoutDashboard, 
  Calculator, 
  LogOut, 
  Menu, 
  X,
  Signal,
  Wifi,
  Battery,
  UtensilsCrossed,
  Plus,
  Save,
  Edit,
  Trash2,
  Image as ImageIcon,
  Camera
} from 'lucide-react';
import { LOGO_URL } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<string>('dashboard');

  const menuItems = [
    { id: 'importacoes', icon: Download, label: "Importações" },
    { id: 'clientes', icon: Users, label: "Clientes" },
    { id: 'fornecedores', icon: Truck, label: "Fornecedores" },
    { id: 'produtos', icon: ShoppingCart, label: "Produtos" },
    { id: 'estoque', icon: Package, label: "Estoque/Inventário" },
    { id: 'contas', icon: CreditCard, label: "Contas a Pagar" },
    { id: 'dashboard', icon: LayoutDashboard, label: "Dashboard" },
    { id: 'producao', icon: Calculator, label: "Produção" },
  ];

  const handleCloseWelcome = () => {
    setActiveView('importacoes');
  };

  const renderProducts = () => {
    return (
      <div className="glass-effect flex flex-col w-full h-full rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl relative z-10 animate-fade-in-up overflow-hidden">
        {/* Header - Compact on mobile */}
        <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 border-b border-white/10 shrink-0">
          <div className="p-2 md:p-3 bg-primary/20 rounded-xl text-primary">
            <ShoppingCart size={24} className="md:w-7 md:h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">Cadastro de Produtos</h2>
            <p className="text-slate-400 text-xs md:text-sm">Gerencie seu catálogo de itens</p>
          </div>
        </div>

        {/* Scrollable Form & Grid Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {/* Form Grid - Responsive Layout */}
          <div className="grid grid-cols-12 gap-3 md:gap-4 mb-6 md:mb-8">
            
            {/* Row 1: ID Consumer + Barcode */}
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">ID Consumer</label>
              <input 
                type="text" 
                className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" 
              />
            </div>

            <div className="col-span-12 md:col-span-9 lg:col-span-10">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Código de Barras</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Escaneie ou digite..."
                  className="flex-1 bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" 
                />
                <button 
                  className="bg-primary hover:bg-primary-dark text-white px-3 md:px-4 rounded-lg transition-colors flex items-center justify-center gap-2 group active:scale-95 shadow-lg shadow-primary/20 h-[42px] shrink-0"
                  title="Escanear com a Câmera"
                >
                  <Camera size={20} className="group-hover:scale-110 transition-transform"/>
                  <span className="hidden sm:inline font-medium text-sm">Escanear</span>
                </button>
              </div>
            </div>

            {/* Row 2: Category + Name */}
            <div className="col-span-12 md:col-span-4 lg:col-span-4">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Categoria</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-8">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Nome Produto</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>

            {/* Row 3: Prices & Measures (2 cols on mobile, 4 on desktop) */}
            <div className="col-span-6 md:col-span-3">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block truncate">Preço Custo</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-6 md:col-span-3">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block truncate">Preço Venda</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-6 md:col-span-3">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Medida</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-6 md:col-span-3">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Estoque</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>

            {/* Row 4: Logistics */}
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Estoque Mínimo</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-4">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Demanda/dia</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
            <div className="col-span-12 md:col-span-4">
              <label className="text-xs text-slate-400 uppercase font-semibold mb-1 block">Situação Estoque</label>
              <input type="text" className="w-full bg-surface/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors h-[42px]" />
            </div>
          </div>

          {/* DataGrid Section */}
          <div className="flex flex-col h-[300px] md:h-[400px]">
            <div className="bg-slate-800/80 px-4 py-2 rounded-t-lg border-t border-x border-slate-700 backdrop-blur-sm">
              <span className="font-bold text-white text-sm tracking-wide">Consulta Produtos</span>
            </div>
            <div className="flex-1 border border-slate-700 rounded-b-lg overflow-hidden bg-surface/30">
              <div className="overflow-x-auto h-full scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
                  <thead className="bg-slate-900/90 text-slate-400 text-xs uppercase sticky top-0 z-10">
                    <tr>
                      <th className="p-3 font-semibold border-b border-slate-700">ID</th>
                      <th className="p-3 font-semibold border-b border-slate-700">Produto</th>
                      <th className="p-3 font-semibold border-b border-slate-700">Categoria</th>
                      <th className="p-3 font-semibold border-b border-slate-700 text-right">Preço Venda</th>
                      <th className="p-3 font-semibold border-b border-slate-700 text-center">Estoque</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                    {/* Sample Data */}
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="hover:bg-white/5 transition-colors">
                        <td className="p-3 whitespace-nowrap">{item.toString().padStart(4, '0')}</td>
                        <td className="p-3 text-white font-medium whitespace-nowrap">Pizza Calabresa {item}</td>
                        <td className="p-3 whitespace-nowrap">Pizzas Salgadas</td>
                        <td className="p-3 text-right whitespace-nowrap">R$ 45,00</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30 whitespace-nowrap">
                            DISPONÍVEL
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions - Grid on mobile, Flex on desktop */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50 backdrop-blur-md shrink-0 grid grid-cols-2 md:flex md:justify-end gap-3">
          <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-lg border border-slate-600 transition-all active:scale-95 shadow-md">
            <Plus size={18} className="text-green-400" />
            <span className="font-medium text-sm">INCLUIR</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-lg border border-slate-600 transition-all active:scale-95 shadow-md">
            <Save size={18} className="text-blue-400" />
            <span className="font-medium text-sm">SALVAR</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-lg border border-slate-600 transition-all active:scale-95 shadow-md">
            <Edit size={18} className="text-yellow-400" />
            <span className="font-medium text-sm">ALTERAR</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-lg border border-slate-600 transition-all active:scale-95 shadow-md">
            <Trash2 size={18} className="text-red-400" />
            <span className="font-medium text-sm">EXCLUIR</span>
          </button>
          <button 
            onClick={() => setActiveView('dashboard')}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-lg border border-slate-600 transition-all active:scale-95 col-span-2 md:col-span-1 shadow-md"
          >
            <LogOut size={18} className="text-slate-400" />
            <span className="font-medium text-sm">SAIR</span>
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (activeView === 'produtos') {
      return renderProducts();
    }

    if (activeView === 'dashboard') {
      return (
        <div className="glass-effect p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl max-w-2xl w-full text-center relative z-10 animate-fade-in-up">
          <button 
            onClick={handleCloseWelcome}
            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full group"
            title="Fechar e ir para Importações"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 ring-1 ring-white/10">
            <UtensilsCrossed size={36} className="text-primary" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Bem-vindo ao Painel</h2>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            Gerencie seu estoque, produtos e operações diárias com facilidade. Selecione uma opção no menu lateral para começar.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-surface/40 border border-white/5 hover:bg-surface/60 transition-colors">
              <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Vendas Hoje</p>
              <p className="text-3xl font-bold text-white mt-1">42</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/40 border border-white/5 hover:bg-surface/60 transition-colors">
              <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Produtos</p>
              <p className="text-3xl font-bold text-white mt-1">128</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/40 border border-white/5 hover:bg-surface/60 transition-colors col-span-2 md:col-span-1">
              <p className="text-slate-400 text-xs uppercase font-semibold tracking-wider">Status</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                <p className="text-xl font-bold text-white">Online</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Generic layout for other views to demonstrate transition
    const currentItem = menuItems.find(item => item.id === activeView);
    return (
      <div className="glass-effect p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl w-full h-full flex flex-col relative z-10 animate-fade-in-up">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="p-3 bg-primary/20 rounded-xl text-primary">
            {currentItem && <currentItem.icon size={28} />}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{currentItem?.label}</h2>
            <p className="text-slate-400 text-sm">Gerenciamento de {currentItem?.label.toLowerCase()}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-slate-500 border-2 border-dashed border-slate-700/50 rounded-xl">
          <p>Conteúdo da tela de {currentItem?.label} em desenvolvimento...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background-dark min-h-screen font-display text-slate-100 flex flex-col">
      {/* Mobile Status Bar (Simulated) */}
      <div className="h-12 w-full bg-background-dark border-b border-slate-800 sticky top-0 z-50 flex items-center justify-between px-6 lg:hidden">
        <span className="text-sm font-semibold text-white">9:41</span>
        <div className="flex gap-2 items-center text-white">
          <Signal size={16} />
          <Wifi size={16} />
          <Battery size={16} />
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Sidebar Backdrop for Mobile */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-surface border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 flex flex-col items-center border-b border-slate-800">
            {/* Logo Section */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-full max-w-[180px] h-24 flex items-center justify-center p-2 relative group">
                <img 
                  src={LOGO_URL} 
                  alt="Pizzaria Carioca" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-center">
                <h1 className="font-logo text-2xl text-white drop-shadow-lg">Pizzaria Carioca</h1>
                <p className="text-primary font-medium text-[10px] uppercase tracking-[0.2em] mt-1">O Jeito Carioca de Viver!</p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group
                  ${activeView === item.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'hover:bg-slate-800 text-slate-400 hover:text-slate-100'}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    size={20} 
                    className={activeView === item.id ? 'text-primary' : 'text-slate-400 group-hover:text-primary transition-colors'} 
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {activeView === item.id && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(227,24,55,0.5)]"></div>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 bg-surface">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Encerrar Sistema</span>
            </button>
            <div className="mt-4 px-3">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest text-center font-semibold">CKDEV DESENVOLVIMENTOS</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative flex items-center justify-center p-3 md:p-4 w-full overflow-y-auto">
           {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ 
              backgroundImage: 'url("https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
            }}
          >
            <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-[2px]"></div>
          </div>

          {/* Dynamic Content with Key for Transition */}
          <div key={activeView} className="w-full flex justify-center h-full items-center">
            {renderContent()}
          </div>

          {/* Decorative Floating Images (High quality generic ingredients) */}
          <div className="absolute top-10 right-10 opacity-30 hidden xl:block pointer-events-none animate-float-slow">
            <img 
              src="https://images.unsplash.com/photo-1615486511484-92e172cc416d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Decoration" 
              className="w-32 h-32 object-contain mix-blend-overlay rounded-full opacity-60"
            />
          </div>
          <div className="absolute bottom-10 left-10 opacity-30 hidden xl:block pointer-events-none animate-float-delayed">
             <img 
              src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Decoration" 
              className="w-24 h-24 object-contain mix-blend-overlay rounded-full opacity-60"
            />
          </div>
        </main>
      </div>

      {/* Floating Action Button for Mobile Menu */}
      {!isMobileMenuOpen && (
        <div className="fixed bottom-6 right-6 lg:hidden z-50">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center focus:outline-none active:scale-95 transition-transform"
          >
            <Menu size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;