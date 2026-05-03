import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  QrCode, 
  Wallet, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  HelpCircle, 
  Search, 
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  Laptop
} from 'lucide-react';
import ThreeCanvas from './components/ThreeCanvas';

// Mock Data
const TRANSACTIONS = [
  { id: 1, title: 'Starbucks Reserve', date: '2 hours ago', category: 'Food & Drink', amount: -125000, type: 'expense' },
  { id: 2, title: 'Transfer from Savings', date: 'Yesterday', category: 'Internal', amount: 2000000, type: 'income' },
  { id: 3, title: 'EVN Bill Payment', date: 'Jul 12', category: 'Utilities', amount: -1450200, type: 'expense' },
];

const USER = {
  name: 'Nguyễn Văn A',
  type: 'Premium Account',
  balance: 1240500000,
  accountNumber: '**** **** 8829',
};

type View = 'dashboard' | 'transfers' | 'qr' | 'savings' | 'analytics' | 'settings';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#0052cc]/10">
      <ThreeCanvas />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 hidden md:flex flex-col z-50">
        <div className="p-6 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0052cc] flex items-center justify-center shadow-lg shadow-[#0052cc]/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-[#0052cc] leading-none">VietBank</h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Digital Banking</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
          <NavItem icon={ArrowLeftRight} label="Transfers" active={activeView === 'transfers'} onClick={() => setActiveView('transfers')} />
          <NavItem icon={QrCode} label="QR Payment" active={activeView === 'qr'} onClick={() => setActiveView('qr')} />
          <NavItem icon={Wallet} label="Savings" active={activeView === 'savings'} onClick={() => setActiveView('savings')} />
          <NavItem icon={BarChart3} label="Analytics" active={activeView === 'analytics'} onClick={() => setActiveView('analytics')} />
          <NavItem icon={Settings} label="Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
        </nav>

        <div className="p-4 mt-auto">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 font-semibold hover:bg-red-50 transition-all group">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen flex flex-col relative">
        {/* Top Navbar */}
        <header className="sticky top-0 h-16 bg-white/60 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 z-40">
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search transactions, bills, or help..." 
                className="w-full bg-slate-100/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0052cc]/20 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-bold">{USER.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{USER.type}</p>
              </div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DIGanYMtfxc7K1UDy2Ke3AzX8BbKQghzeX2TCYD09uQe2WF3UkLitzUgV8JlDUXmjtiYaDOiDoBnKtklz2ysjPhrd0UKqjnfS3hbE84FfLNbmh9OXhysX4Tl0_h-SbdQrAzMVxczlbySpexiT0BuTRB9psiWnVWEe9a-Dt3m8LwNVpYmWk4UFDSv-AWQETsNfd01IXH_LrVxfNtv5J_J6CpXCnckRdmthx2_tabKARvDak3XncyjVbOBswJ7Tlm3wfx_J-RKoC4" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-[#0052cc]/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* View Container */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'transfers' && <TransfersView />}
              {activeView === 'qr' && <QRView />}
              {activeView === 'savings' && <SavingsView />}
              {activeView === 'analytics' && <AnalyticsView />}
              {activeView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-2xl border-t border-slate-100 flex justify-around items-center p-3 md:hidden z-50">
        <MobileNavItem icon={LayoutDashboard} active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
        <MobileNavItem icon={ArrowLeftRight} active={activeView === 'transfers'} onClick={() => setActiveView('transfers')} />
        <div className="relative -top-6">
          <button 
            onClick={() => setActiveView('qr')}
            className="w-14 h-14 bg-[#0052cc] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#0052cc]/30 active:scale-95 transition-all"
          >
            <QrCode className="w-7 h-7" />
          </button>
        </div>
        <MobileNavItem icon={Wallet} active={activeView === 'savings'} onClick={() => setActiveView('savings')} />
        <MobileNavItem icon={Settings} active={activeView === 'settings'} onClick={() => setActiveView('settings')} />
      </nav>
    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
        active 
          ? 'bg-[#0052cc]/5 text-[#0052cc] font-bold border-r-4 border-[#0052cc]' 
          : 'text-slate-500 hover:bg-slate-50 hover:translate-x-1'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-[#0052cc]/10' : ''}`} />
      <span className="text-sm tracking-tight">{label}</span>
    </button>
  );
}

function MobileNavItem({ icon: Icon, active, onClick }: { icon: any, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`p-2 transition-all ${active ? 'text-[#0052cc]' : 'text-slate-400'}`}>
      <Icon className="w-6 h-6" />
    </button>
  );
}

// Views
function DashboardView() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-[#0b1c30]">Xin chào, {USER.name.split(' ').pop()}</h2>
          <p className="text-slate-500 mt-1">Trải nghiệm ngân hàng số an toàn và bảo mật.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 bg-[#0052cc] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[#0052cc]/20 hover:shadow-[#0052cc]/30 transition-all active:scale-95">
          <Plus className="w-5 h-5" />
          <span>New Transaction</span>
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Card */}
        <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-[#0052cc] to-[#001848] rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Total Available Balance</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <h3 className="text-4xl font-extrabold tabular-nums tracking-tight">{USER.balance.toLocaleString()}</h3>
                  <span className="text-xl font-bold text-white/80">VND</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-8 mt-8">
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Account Number</p>
                <p className="text-lg font-mono tracking-widest">{USER.accountNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Card Holder</p>
                <p className="text-lg font-bold tracking-wide uppercase">{USER.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats/Actions */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
          <StatCard label="Pay Bills" icon={ArrowUpRight} color="bg-orange-50 text-orange-600" />
          <StatCard label="Transfer" icon={ArrowLeftRight} color="bg-blue-50 text-blue-600" />
          <StatCard label="Rewards" icon={Wallet} color="bg-emerald-50 text-emerald-600" />
          <StatCard label="Statements" icon={BarChart3} color="bg-purple-50 text-purple-600" />
        </div>

        {/* Recent Transactions */}
        <div className="col-span-12 lg:col-span-7 bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <button className="text-sm font-bold text-[#0052cc] hover:underline">View All</button>
          </div>
          <div className="space-y-5">
            {TRANSACTIONS.map(tx => (
              <div key={tx.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#0052cc] group-hover:text-white transition-all">
                    {tx.type === 'expense' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{tx.title}</p>
                    <p className="text-[11px] text-slate-500">{tx.date} • {tx.category}</p>
                  </div>
                </div>
                <p className={`font-bold tabular-nums ${tx.amount < 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                  {tx.amount < 0 ? '' : '+'}{tx.amount.toLocaleString()} VND
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Goal */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm">
            <h3 className="text-xl font-bold mb-6">Savings Goal</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-slate-600">New Home Fund</span>
              <span className="text-sm font-bold text-[#0052cc]">75%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-[#0052cc] to-blue-400 w-3/4 rounded-full"></div>
            </div>
            <p className="text-sm text-slate-500">You're only <span className="font-bold text-[#0b1c30]">245,600,000 VND</span> away from your goal!</p>
          </div>
          <div className="relative rounded-[32px] overflow-hidden h-40 bg-slate-900 group shadow-lg">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1DBlvxK_laAX2SbMxq9uoKKNjLWdJRbFpZVyiJGjXkx7cXEG2xruzVtk9kQVqnSsDeDt4go1CsajiUMh5nLaS0lJLo9Gtq_OWpDOusgrILQoTAjXfbjd_jTVQUJasR-7vpMOxO7_UxWyForznBanVpmzxhQVRAaONOgFznjoj-AMIF5JZuYi63KyebqCnW6mJDovlgQQd8jpJrgxRy8Byq_QMej-ar66XIQkzpdJmvfVU8OiZIFwXcpD8niwIUCBHm4rikCFXUd4" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
              alt="Promo"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
              <h4 className="text-white font-bold text-lg leading-tight">Upgrade to Platinum</h4>
              <p className="text-white/70 text-xs">Unlock exclusive lounge access & 5% cashback.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, icon: Icon, color }: { label: string, icon: any, color: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[24px] p-5 border border-white shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <p className="font-bold text-sm mt-4">{label}</p>
    </div>
  );
}

function TransfersView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-[#0b1c30]">Chuyển tiền</h2>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
          <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold">Nội bộ</button>
          <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-500">Liên ngân hàng</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Source Account */}
          <Section label="Tài khoản nguồn">
            <div className="p-4 rounded-2xl border-2 border-[#0052cc] bg-[#0052cc]/5 flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0052cc] flex items-center justify-center text-white">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 leading-none">VND - *6868</p>
                  <p className="text-xs text-slate-500 mt-1">Số dư: <span className="font-bold text-[#0052cc]">{USER.balance.toLocaleString()} VND</span></p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </Section>

          {/* Destination */}
          <Section label="Tài khoản thụ hưởng">
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Nhập số tài khoản hoặc SĐT" 
                className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#0052cc] focus:ring-4 focus:ring-[#0052cc]/5 text-sm transition-all outline-none"
              />
              <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-none">
                <button className="flex-shrink-0 flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 group-hover:border-[#0052cc] group-hover:text-[#0052cc] transition-all">
                    <Plus className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">Thêm mới</span>
                </button>
                {[1, 2, 3].map(i => (
                  <button key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i}`} 
                      className="w-14 h-14 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100" 
                      alt="Contact"
                    />
                    <span className="text-[10px] font-bold text-slate-700">Lan Anh</span>
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* Amount */}
          <Section label="Thông tin giao dịch">
            <div className="space-y-4">
              <div className="relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute top-4 left-5">Số tiền</label>
                <input 
                  type="text" 
                  placeholder="0" 
                  className="w-full px-5 pt-8 pb-4 rounded-2xl bg-white border border-slate-200 focus:border-[#0052cc] focus:ring-4 focus:ring-[#0052cc]/5 text-2xl font-black text-right transition-all outline-none tabular-nums"
                />
                <span className="absolute bottom-4 left-5 font-bold text-slate-400">VND</span>
              </div>
              <textarea 
                placeholder="Lời nhắn (không dấu)" 
                className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:border-[#0052cc] focus:ring-4 focus:ring-[#0052cc]/5 text-sm transition-all outline-none resize-none"
                rows={2}
              ></textarea>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-sm sticky top-24">
            <h3 className="font-bold mb-6">Tóm tắt</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Phí giao dịch</span>
                <span className="font-bold text-emerald-600 uppercase text-[10px] tracking-widest">Miễn phí</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Hạn mức còn lại</span>
                <span className="font-bold tabular-nums text-[12px]">500,000,000</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng</span>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#0052cc] tabular-nums">0 <span className="text-sm font-bold opacity-60">VND</span></p>
                </div>
              </div>
            </div>
            <button className="w-full bg-[#0052cc] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#0052cc]/20 active:scale-95 transition-all mb-3">
              Tiếp tục
            </button>
            <p className="text-[10px] text-center text-slate-400 px-4">Thông tin giao dịch được bảo mật theo tiêu chuẩn PCI DSS.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</h3>
      {children}
    </div>
  );
}

function QRView() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center py-12">
      <div className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center border border-white">
        <div className="w-64 h-64 bg-slate-50 rounded-[32px] p-6 mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0052cc] to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity rounded-[32px]"></div>
          <div className="relative border-4 border-white shadow-sm h-full w-full rounded-2xl flex items-center justify-center bg-white">
            <QrCode className="w-full h-full text-[#0b1c30] p-4" />
          </div>
        </div>
        <h2 className="text-2xl font-black">{USER.name}</h2>
        <p className="font-mono text-slate-500 mt-1 tracking-widest">1028 3948 221</p>
        <div className="flex gap-4 mt-8 w-full">
          <button className="flex-1 bg-[#0052cc] text-white py-3 rounded-2xl font-bold shadow-lg shadow-[#0052cc]/20">Quét mã</button>
          <button className="flex-1 bg-slate-100 text-[#0b1c30] py-3 rounded-2xl font-bold">Lưu mã</button>
        </div>
      </div>
      <div className="flex-1 md:max-w-sm space-y-6">
        <div className="bg-blue-600 rounded-[32px] p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <h3 className="text-xl font-bold mb-2">Thanh toán không chạm</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-6">Sử dụng QR tại hơn 200,000 điểm thanh toán để nhận hoàn tiền tới 5%.</p>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-xl text-xs font-bold">Xem ưu đãi</button>
        </div>
        <div className="bg-white/50 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0052cc]/10 rounded-2xl flex items-center justify-center text-[#0052cc]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-sm">Bảo mật chuẩn VietQR</p>
            <p className="text-[11px] text-slate-500">Mã hóa an toàn 256-bit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavingsView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold text-[#0b1c30]">Savings</h2>
        <button className="bg-[#0052cc] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#0052cc]/20">Mở tài khoản tiết kiệm</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SavingCard title="Home Fund" amount={1200000000} target={2000000000} progress={60} color="from-[#0052cc] to-blue-500" />
        <SavingCard title="Travel Goal" amount={50000000} target={100000000} progress={50} color="from-purple-600 to-indigo-500" />
        <SavingCard title="Emergency" amount={20000000} target={30000000} progress={66} color="from-emerald-600 to-teal-500" />
      </div>
    </div>
  );
}

function SavingCard({ title, amount, target, progress, color }: { title: string, amount: number, target: number, progress: number, color: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-sm flex flex-col justify-between">
      <div>
        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${color} mb-4 shadow-lg`} />
        <h3 className="font-bold">{title}</h3>
        <p className="text-2xl font-black text-[#0b1c30] mt-1 tabular-nums">{amount.toLocaleString()} <span className="text-sm font-bold opacity-40">VND</span></p>
      </div>
      <div className="mt-8">
        <div className="flex justify-between text-[11px] font-bold text-slate-500 mb-2">
          <span>Target: {target.toLocaleString()}</span>
          <span className={color.split(' ')[0].replace('from', 'text')}>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${color} rounded-full`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold text-[#0b1c30]">Analytics</h2>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm h-80 flex items-center justify-center">
          {/* Placeholder for real charts */}
          <div className="w-full aspect-video relative flex items-end justify-around gap-4 px-4 overflow-hidden">
            {[40, 70, 30, 90, 60, 80, 50].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="flex-1 bg-[#0052cc]/10 rounded-t-xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#0052cc] translate-y-full group-hover:translate-y-0 transition-transform" />
              </motion.div>
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-slate-100/50 rounded-full" />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="bg-red-50 p-6 rounded-[24px] border border-red-100">
            <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-1">Alert</p>
            <p className="text-red-900 font-bold leading-tight">Expenses up 12%</p>
            <p className="text-red-700 text-xs mt-2">Spending on "Food" is higher than last month.</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-[24px] border border-emerald-100">
            <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1">Saving Tip</p>
            <p className="text-emerald-900 font-bold leading-tight">Auto-save Opportunity</p>
            <p className="text-emerald-700 text-xs mt-2">Saving 500k/week can reach your "Travel" goal 2 months early.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-[#0b1c30]">Account Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0052cc]" />
              Security & Privacy
            </h3>
            <div className="space-y-4">
              <ToggleItem label="Biometric Authentication" description="Use FaceID or Fingerprint to unlock" checked />
              <ToggleItem label="Login Notifications" description="Get notified on new device login" checked />
              <ToggleItem label="Two-factor Authentication" description="SMS or Authenticator app" />
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-8 border border-white shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#0052cc]" />
              Linked Devices
            </h3>
            <div className="space-y-4">
              <DeviceItem icon={Laptop} name="MacBook Pro 14\" location="TP. Hồ Chí Minh" status="Active" />
              <DeviceItem icon={Smartphone} name="iPhone 15 Pro" location="Hà Nội" status="2 hours ago" active={false} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-6 border border-white shadow-sm flex flex-col items-center text-center">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DIGanYMtfxc7K1UDy2Ke3AzX8BbKQghzeX2TCYD09uQe2WF3UkLitzUgV8JlDUXmjtiYaDOiDoBnKtklz2ysjPhrd0UKqjnfS3hbE84FfLNbmh9OXhysX4Tl0_h-SbdQrAzMVxczlbySpexiT0BuTRB9psiWnVWEe9a-Dt3m8LwNVpYmWk4UFDSv-AWQETsNfd01IXH_LrVxfNtv5J_J6CpXCnckRdmthx2_tabKARvDak3XncyjVbOBswJ7Tlm3wfx_J-RKoC4" 
              className="w-24 h-24 rounded-3xl object-cover mb-4 border-4 border-white shadow-lg" 
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
            <h4 className="font-bold">{USER.name}</h4>
            <p className="text-xs text-slate-500">{USER.type}</p>
            <button className="mt-6 w-full py-3 bg-[#0052cc] text-white rounded-2xl font-bold shadow-lg shadow-[#0052cc]/20">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleItem({ label, description, checked = false }: { label: string, description: string, checked?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#f8f9ff]/50 rounded-2xl border border-slate-100">
      <div>
        <p className="font-bold text-sm">{label}</p>
        <p className="text-[11px] text-slate-500">{description}</p>
      </div>
      <div className={`w-11 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-[#0052cc]' : 'bg-slate-200'}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}

function DeviceItem({ icon: Icon, name, location, status, active = true }: { icon: any, name: string, location: string, status: string, active?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 bg-[#f8f9ff]/50 rounded-2xl border border-slate-100 ${active ? 'opacity-100' : 'opacity-60'}`}>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-[11px] text-slate-500">{location} • {status}</p>
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
    </div>
  );
}
