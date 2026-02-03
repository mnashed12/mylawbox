import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';

// ============================================
// MYLAWBOX - CLEAN, USER-FRIENDLY BUILD
// No gamification, focus on usability
// ============================================

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(80)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${Math.random() * 100}%`, top: -20,
          width: Math.random() > 0.5 ? 10 : 6, height: Math.random() > 0.5 ? 10 : 6,
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][Math.floor(Math.random() * 5)],
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animation: `confetti ${2.5 + Math.random() * 2}s ease-out forwards`,
          animationDelay: `${Math.random() * 1.5}s`,
        }} />
      ))}
    </div>
  );
};

// Translations
const translations = {
  en: {
    getStarted: 'Get Started',
    continue: 'Continue',
    back: 'Back',
    home: 'Home',
    tasks: 'Tasks',
    ai: 'AI Help',
    messages: 'Messages',
    profile: 'Profile',
    welcome: 'Welcome back',
    letsGetPaid: "Let's get you paid.",
    scheduleCall: 'Schedule Your Call',
    yourAttorney: 'Your Attorney',
    caseProgress: 'Case Progress',
    nextStep: 'Next Step',
    traditional: 'Traditional Attorney',
    youKeep: 'You Keep',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    email: 'Email',
    accidentDate: 'Accident Date',
    required: 'Required',
    invalidEmail: 'Invalid email',
    invalidPhone: 'Invalid phone',
  },
  es: {
    getStarted: 'Comenzar',
    continue: 'Continuar',
    back: 'Atrás',
    home: 'Inicio',
    tasks: 'Tareas',
    ai: 'Ayuda IA',
    messages: 'Mensajes',
    profile: 'Perfil',
    welcome: 'Bienvenido',
    letsGetPaid: 'Vamos a conseguir tu pago.',
    scheduleCall: 'Programa tu Llamada',
    yourAttorney: 'Tu Abogado',
    caseProgress: 'Progreso del Caso',
    nextStep: 'Siguiente Paso',
    traditional: 'Abogado Tradicional',
    youKeep: 'Te Quedas',
    firstName: 'Nombre',
    lastName: 'Apellido',
    phone: 'Teléfono',
    email: 'Correo',
    accidentDate: 'Fecha del Accidente',
    required: 'Requerido',
    invalidEmail: 'Correo inválido',
    invalidPhone: 'Teléfono inválido',
  }
};

// Input component - defined outside to prevent re-creation on each render
const Input = ({ label, error, icon, autoComplete, name, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{icon} {label}</label>
    <input name={name} autoComplete={autoComplete} {...props} className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all ${error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50 focus:bg-white'}`} />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function MyLawBox() {
  const { user: authUser, loading, signUp, signIn, signOut } = useAuth();
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  
  const [screen, setScreen] = useState('landing');
  const [caseValue, setCaseValue] = useState(70000);
  const [showConfetti, setShowConfetti] = useState(false);
  const [signupStep, setSignupStep] = useState(1);
  const [activeNav, setActiveNav] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState(null); // For email confirmation toast
  const [authError, setAuthError] = useState(null);
  
  const [user, setUser] = useState({
    firstName: '', lastName: '', phone: '', email: '', password: '',
    accidentMonth: '', accidentDay: '', accidentYear: '',
    scheduledTime: null, scheduledDate: null,
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const [caseInfo, setCaseInfo] = useState({
    milestone: 2,
    completed: [1],
    savedAmount: 4847,
    estimatedSettlement: 67500,
    treatments: [
      { id: 1, date: '2026-01-15', provider: 'Riverside ER', type: 'Emergency', cost: 4200, verified: true },
      { id: 2, date: '2026-01-18', provider: 'Dr. Smith Orthopedics', type: 'Specialist', cost: 450, verified: true },
      { id: 3, date: '2026-01-22', provider: 'PT Plus', type: 'Physical Therapy', cost: 150, verified: false },
    ],
    documents: [
      { id: 1, name: 'Police Report', status: 'verified' },
      { id: 2, name: 'ER Records', status: 'verified' },
      { id: 3, name: 'Insurance Card', status: 'pending' },
      { id: 4, name: 'Vehicle Photos', status: 'missing' },
    ],
    milestoneData: {}
  });

  const [notifications] = useState([
    { id: 1, title: 'Upload reminder', message: 'Add vehicle photos to strengthen your case', time: '2h ago', read: false },
    { id: 2, title: 'New message', message: 'Sarah Martinez sent you a message', time: '5h ago', read: false },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, from: 'attorney', name: 'Sarah Martinez', text: "Hi! I've reviewed your case. Everything looks good so far. Let me know if you have questions!", time: '2:30 PM' },
    { id: 2, from: 'attorney', name: 'Sarah Martinez', text: "Please upload your vehicle photos when you get a chance - they'll help maximize your settlement.", time: '3:45 PM' },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const [aiChat, setAiChat] = useState([
    { role: 'ai', content: "Hi! I'm here to help answer your questions. You can ask me things like 'How much could I get?' or 'What should I do next?' — I'm happy to help!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [aiThinking, setAiThinking] = useState(false);

  // Refs for scroll-to-bottom in chat screens
  const messagesEndRef = useRef(null);
  const aiChatEndRef = useRef(null);
  
  // Auto-scroll chat windows
  useEffect(() => {
    if (screen === 'messages') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, screen]);
  
  useEffect(() => {
    if (screen === 'ai') {
      aiChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiChat.length, screen]);

  const milestones = [
    { num: 1, title: 'Sign Up', icon: '✓' },
    { num: 2, title: 'What Happened', icon: '📸' },
    { num: 3, title: 'Insurance Info', icon: '🛡️' },
    { num: 4, title: 'Your Injuries', icon: '🩹' },
    { num: 5, title: 'Witnesses', icon: '👥' },
    { num: 6, title: 'Doctor Visits', icon: '🏥' },
    { num: 7, title: 'Medical Records', icon: '📄' },
    { num: 8, title: 'Missed Work', icon: '💼' },
    { num: 9, title: 'Done with Treatment', icon: '✅' },
    { num: 10, title: 'We Send Our Offer', icon: '📨' },
    { num: 11, title: 'They Respond', icon: '💰' },
    { num: 12, title: 'You Get Paid', icon: '🎉' },
  ];

  // Calculations
  const traditionalNet = Math.round(caseValue * 0.37);
  const mylawboxNet = Math.round(caseValue * 0.78);
  const savings = mylawboxNet - traditionalNet;
  const progress = Math.round((caseInfo.completed.length / 12) * 100);
  const unreadMessages = messages.filter(m => m.from === 'attorney').length > 0 ? 1 : 0;

  const handleNav = (nav) => {
    setActiveNav(nav);
    const screens = { home: 'dashboard', tasks: `milestone-${caseInfo.milestone}`, ai: 'ai', messages: 'messages', profile: 'profile' };
    setScreen(screens[nav] || 'dashboard');
  };

  const completeMilestone = (num) => {
    const bonus = Math.floor(Math.random() * 400) + 400;
    setCaseInfo(prev => ({
      ...prev,
      completed: [...prev.completed, num],
      milestone: Math.min(num + 1, 12),
      savedAmount: prev.savedAmount + bonus,
    }));
    return bonus;
  };

  const validateForm = () => {
    const errors = {};
    if (!user.firstName.trim()) errors.firstName = t.required;
    if (!user.lastName.trim()) errors.lastName = t.required;
    if (!user.phone.trim()) errors.phone = t.required;
    else if (!/^[\d\s\-\(\)]{10,}$/.test(user.phone)) errors.phone = t.invalidPhone;
    if (!user.email.trim()) errors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) errors.email = t.invalidEmail;
    if (!user.password || user.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!user.accidentMonth || !user.accidentDay || !user.accidentYear) errors.accidentDate = t.required;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Simulated email notification function
  const sendEmailNotification = (type, data) => {
    // In production, this would call your email API
    const timestamp = new Date().toLocaleString();
    console.log(`📧 EMAIL SENT [${timestamp}]`);
    console.log(`Type: ${type}`);
    console.log(`To: ${user.email || data.email}`);
    console.log(`Data:`, data);
    
    // Show toast notification to user
    const messages = {
      'SIGNUP_STARTED': `Confirmation email sent to ${data.email}`,
      'APPOINTMENT_SCHEDULED': `Appointment confirmation sent to ${data.email}`,
      'ACCOUNT_CREATED': `Welcome email sent to ${data.email}`,
      'MILESTONE_SAVED': `Update saved! Confirmation sent to ${data.email}`,
    };
    setToast(messages[type] || 'Email sent!');
    setTimeout(() => setToast(null), 4000);
    
    return true;
  };

  const sendAIMessage = (msg = chatInput) => {
    if (!msg.trim()) return;
    setAiChat(prev => [...prev, { role: 'user', content: msg }]);
    setChatInput('');
    setAiThinking(true);
    
    setTimeout(() => {
      const responses = [
        `Based on cases like yours, you could get somewhere between $${(caseInfo.estimatedSettlement * 0.85).toLocaleString()} and $${(caseInfo.estimatedSettlement * 1.15).toLocaleString()}. If you upload photos of the damage to your car, that usually helps get more.`,
        `You're doing great! Most people take 12-18 months with a regular lawyer, but you're on track to be done in about 3 months because you're helping with the paperwork.`,
        `The most important thing you can do right now is take photos of any damage to your car. Cases with good photos usually get 30-40% more money.`,
        `I see you've been to the doctor ${caseInfo.treatments.length} times so far. Keep going to all your appointments and save all your receipts — each visit helps show how serious your injuries are.`,
      ];
      setAiChat(prev => [...prev, { role: 'ai', content: responses[Math.floor(Math.random() * responses.length)] }]);
      setAiThinking(false);
    }, 1200);
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), from: 'user', name: user.firstName || 'You',
      text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessageInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(), from: 'attorney', name: 'Sarah Martinez',
        text: "Thanks for your message! I'll review and get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  // ============================================
  // STYLES
  // ============================================
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { font-family: 'Inter', -apple-system, sans-serif; box-sizing: border-box; }
    
    @keyframes confetti { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
    
    .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    
    .bg-warm { background: linear-gradient(180deg, #FFFBF5 0%, #FFF8ED 100%); }
    .bg-card { background: white; border: 1px solid #F3E8D8; }
    .bg-dark { background: linear-gradient(135deg, #1a365d 0%, #0f172a 100%); }
    
    input[type="range"] { -webkit-appearance: none; height: 8px; border-radius: 4px; background: #e5e7eb; cursor: pointer; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #d97706); border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    
    select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 8px center; background-size: 16px; padding-right: 32px !important; }
    
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    .drop-zone { transition: all 0.2s ease; }
    .drop-zone.dragging { border-color: #f59e0b; background-color: #fef3c7; transform: scale(1.02); }
    
    .desktop-container { max-width: 900px; }
    @media (max-width: 768px) { .desktop-container { max-width: 100%; } }
  `;

  // ============================================
  // COMPONENTS
  // ============================================

  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around max-w-md mx-auto">
        {[
          { id: 'home', icon: '🏠', label: 'Home' },
          { id: 'tasks', icon: '📋', label: 'To-Do' },
          { id: 'ai', icon: '🤖', label: 'Help' },
          { id: 'messages', icon: '💬', label: 'Chat', badge: unreadMessages },
          { id: 'profile', icon: '👤', label: 'Me' },
        ].map(item => (
          <button key={item.id} onClick={() => handleNav(item.id)}
            className={`relative flex flex-col items-center py-2 px-3 rounded-xl transition-all ${activeNav === item.id ? 'bg-amber-50 text-amber-700' : 'text-gray-400 hover:text-gray-600'}`}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            {item.badge > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
        ))}
      </div>
    </nav>
  );

  // ============================================
  // LANDING PAGE
  // ============================================
  const LandingPage = () => (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white">
        {/* Header */}
        <header className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <span className="text-xl">⚖️</span>
            </div>
            <span className="text-xl font-bold">MyLawBox</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              {lang === 'en' ? 'Español' : 'English'}
            </button>
            <button onClick={() => setScreen('login')} className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Log In
            </button>
            <button onClick={() => setScreen('signup')} className="bg-white text-amber-600 px-5 py-2 rounded-xl font-bold text-sm hover:bg-amber-50 transition-colors shadow-lg">
              Get Started Free
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🚗</span> For California car accident victims
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Hurt in an accident?<br/>
            <span className="text-amber-200">Keep more of your money.</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Most lawyers take 33% of everything you get. We charge just 10% because you help with some of the paperwork.
          </p>
          <button onClick={() => setScreen('signup')} className="bg-white text-amber-600 text-lg font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Check If You Qualify →
          </button>
          <p className="mt-4 text-white/70 text-sm">Free to check • No commitment • Real lawyers</p>
        </div>

        {/* Wave Divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
            <path d="M0 64H1440V32C1440 32 1320 0 1080 0C840 0 720 32 480 32C240 32 120 0 0 0V64Z" fill="#FFF7ED"/>
          </svg>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">The settlement isn't what you get.</h2>
            <p className="text-gray-700 text-lg">See what actually ends up in your pocket.</p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
            {/* Settlement Slider */}
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-3">
                📋 Example Scenario
              </div>
              <p className="text-gray-700 font-medium mb-2">Insurance agrees to pay</p>
              <p className="text-5xl font-bold text-gray-900">${caseValue.toLocaleString()}</p>
              <p className="text-gray-600 mt-2">↓ But you won't get all of it. See below.</p>
            </div>
            
            <div className="mb-10 px-4">
              <input type="range" min="25000" max="200000" step="5000" value={caseValue}
                onChange={(e) => setCaseValue(Number(e.target.value))} className="w-full" />
              <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                <span>$25,000</span><span>$200,000</span>
              </div>
            </div>

            {/* Results Label */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">
                👇 What you ACTUALLY take home
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A - Traditional */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6 border-2 border-gray-300">
                <div className="absolute -top-3 left-4 bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  OPTION A: TRADITIONAL
                </div>
                <p className="text-lg font-bold text-gray-800 mt-2 mb-4">Regular Lawyer</p>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Insurance pays</span>
                    <span className="font-bold text-gray-900">${caseValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Lawyer takes 33%</span>
                    <span className="font-bold text-red-600">−${Math.round(caseValue * 0.33).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Medical bills</span>
                    <span className="font-bold text-red-600">−${Math.round(caseValue * 0.30).toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t-2 border-gray-400 pt-4 bg-gray-200/50 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
                  <p className="text-sm text-gray-700 font-medium mb-1">Your check</p>
                  <p className="text-4xl font-bold text-gray-700">${traditionalNet.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-2">⏱️ Takes 12-18 months</p>
                </div>
              </div>

              {/* Option B - MyLawBox */}
              <div className="relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl shadow-orange-500/30">
                <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  OPTION B: SMART TOUCH — +${savings.toLocaleString()} MORE
                </div>
                <p className="text-lg font-bold text-white mt-2 mb-4">MyLawBox</p>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-white">Insurance pays</span>
                    <span className="font-bold text-white">${caseValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">We take only 10%</span>
                    <span className="font-bold text-emerald-300">−${Math.round(caseValue * 0.10).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Medical (we negotiate)</span>
                    <span className="font-bold text-emerald-300">−${Math.round(caseValue * 0.12).toLocaleString()}</span>
                  </div>
                </div>
                <div className="border-t-2 border-white/30 pt-4 bg-orange-700/30 -mx-6 -mb-6 px-6 pb-6 rounded-b-2xl">
                  <p className="text-sm text-amber-100 font-medium mb-1">Your check</p>
                  <p className="text-4xl font-bold text-white">${mylawboxNet.toLocaleString()}</p>
                  <p className="text-sm text-emerald-300 mt-2">⚡ Done in ~3 months</p>
                </div>
              </div>
            </div>

            {/* Footnote */}
            <p className="text-center text-gray-600 mt-6 text-sm">* We negotiate your medical bills down so you keep more</p>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 md:p-12 border border-amber-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why do you keep so much more?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: '💰', title: 'Lower fee', desc: 'You help with some paperwork, so we only charge 10% instead of 33%' },
                { icon: '🏥', title: 'Lower bills', desc: 'We negotiate with doctors and hospitals to reduce what you owe' },
                { icon: '⚡', title: 'Faster', desc: 'Your involvement means less back-and-forth, so you get paid in months, not years' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl mx-auto mb-4">{item.icon}</div>
                  <p className="font-bold text-gray-900 mb-2">{item.title}</p>
                  <p className="text-gray-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Here's what happens</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: '📱', title: 'Tell us what happened', time: '5 min', num: '1' },
              { icon: '📞', title: 'Talk to your lawyer', time: 'Free call', num: '2' },
              { icon: '📸', title: 'Send photos & bills', time: 'Easy upload', num: '3' },
              { icon: '💪', title: 'We fight for you', time: 'Our job', num: '4' },
              { icon: '💵', title: 'You get paid', time: '~3 months', num: '5' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg">{step.icon}</div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-amber-600 rounded-full flex items-center justify-center text-xs font-bold">{step.num}</div>
                </div>
                <p className="font-semibold text-white mb-1">{step.title}</p>
                <p className="text-gray-300 text-sm">{step.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <div className="text-5xl mb-6">💬</div>
          <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
            "I was nervous about doing some of the work myself, but it was just taking photos and filling out simple forms. I ended up keeping way more money than my friend who used a regular lawyer."
          </blockquote>
          <p className="text-white/90 font-medium">— Maria G., Riverside CA</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-b from-white to-amber-50 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to see if you qualify?</h2>
          <p className="text-gray-700 text-lg mb-8">Takes 5 minutes. No cost. No commitment.</p>
          <button onClick={() => setScreen('signup')} className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xl font-bold px-12 py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Check If You Qualify →
          </button>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-8 text-sm text-gray-700">
            <span className="flex items-center gap-2"><span className="text-emerald-500 text-lg">✓</span> Real California lawyers</span>
            <span className="flex items-center gap-2"><span className="text-emerald-500 text-lg">✓</span> No upfront cost</span>
            <span className="flex items-center gap-2"><span className="text-emerald-500 text-lg">✓</span> Free consultation</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>MyLawBox connects you with licensed California attorneys. Results vary by case.</p>
        </div>
      </div>
    </div>
  );

  // ============================================
  // DASHBOARD
  // ============================================
  const Dashboard = () => {
    const name = user.firstName || 'Maria';
    const currentMilestone = milestones.find(m => m.num === caseInfo.milestone);

    return (
      <div className="min-h-screen bg-warm pb-20">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
          <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{t.welcome}, {name}</p>
              <p className="font-semibold text-gray-900">{t.letsGetPaid}</p>
            </div>
            <button onClick={() => setShowNotifications(!showNotifications)} className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              🔔
              {notifications.filter(n => !n.read).length > 0 && <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />}
            </button>
          </div>
        </header>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="fixed inset-0 z-50" onClick={() => setShowNotifications(false)}>
            <div className="absolute top-14 right-4 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn" onClick={e => e.stopPropagation()}>
              <div className="p-3 border-b border-gray-100 font-semibold text-gray-900">Notifications</div>
              {notifications.map(n => (
                <div key={n.id} className={`p-3 border-b border-gray-50 ${!n.read ? 'bg-amber-50' : ''}`}>
                  <p className="font-medium text-gray-900 text-sm">{n.title}</p>
                  <p className="text-gray-500 text-xs">{n.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="desktop-container mx-auto px-4 py-6 space-y-4">
          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-gray-900">Your Progress</span>
              <span className="text-sm text-amber-600 font-medium">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{caseInfo.completed.length} of 12 steps done</span>
              <span>You could get ~${caseInfo.estimatedSettlement.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Savings Card */}
            <div className="bg-dark rounded-2xl p-5 text-white">
              <p className="text-xs text-gray-400">So far, you've saved</p>
              <p className="text-3xl font-bold text-amber-400 my-1">${caseInfo.savedAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-300">compared to using a typical lawyer</p>
            </div>

            {/* Next Step */}
            <button onClick={() => setScreen(`milestone-${caseInfo.milestone}`)}
              className="w-full bg-amber-500 hover:bg-amber-600 rounded-2xl p-5 text-left text-white transition-colors">
              <p className="text-xs text-amber-200">What you need to do next</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold">{currentMilestone?.title}</p>
                <span className="text-2xl">{currentMilestone?.icon}</span>
              </div>
            </button>
          </div>

          {/* All Steps with Names */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100">
            <p className="font-semibold text-gray-900 mb-4">All Steps</p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {milestones.map((m) => {
                const done = caseInfo.completed.includes(m.num);
                const current = m.num === caseInfo.milestone;
                return (
                  <button key={m.num} 
                    onClick={() => setScreen(`milestone-${m.num}`)}
                    className={`p-3 rounded-xl text-center transition-all hover:shadow-md ${
                      done ? 'bg-emerald-50 border-2 border-emerald-500' :
                      current ? 'bg-amber-50 border-2 border-amber-500 animate-pulse' : 
                      'bg-gray-50 border-2 border-gray-200 hover:border-amber-300'
                    }`}>
                    <div className={`text-2xl mb-1 ${done ? 'text-emerald-500' : current ? 'text-amber-500' : 'text-gray-500'}`}>
                      {done ? '✓' : m.icon}
                    </div>
                    <div className={`text-xs font-medium ${done ? 'text-emerald-700' : current ? 'text-amber-700' : 'text-gray-600'}`}>
                      {m.title}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${done ? 'text-emerald-600' : current ? 'text-amber-600' : 'text-gray-400'}`}>
                      Step {m.num}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Attorney Contact Card */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100">
            <p className="font-semibold text-gray-900 mb-4">👩‍⚖️ Your Legal Team</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                <div className="w-16 h-16 bg-amber-200 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">👩‍⚖️</div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">Sarah Martinez, Esq.</p>
                  <p className="text-sm text-amber-700">Lead Attorney</p>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>📱 (555) 123-4567</p>
                    <p>📞 (555) 987-6543</p>
                    <p>✉️ sarah@mylawbox.com</p>
                    <p>📍 Los Angeles, CA</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setScreen('messages'); setActiveNav('messages'); }} 
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                  💬 Send Message
                </button>
                <a href="tel:5551234567" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                  📞 Call Now
                </a>
                <a href="sms:5551234567" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2">
                  📱 Text Message
                </a>
              </div>
            </div>
          </div>

          {/* Treatment */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-gray-900">Doctor Visits</p>
              <p className="text-sm text-amber-600">${caseInfo.treatments.reduce((a, t) => a + t.cost, 0).toLocaleString()} in bills</p>
            </div>
            <div className="space-y-2">
              {caseInfo.treatments.map(t => (
                <div key={t.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{t.provider}</p>
                    <p className="text-xs text-gray-500">{t.date}</p>
                  </div>
                  <p className="font-medium text-gray-900 text-sm">${t.cost}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNav />
      </div>
    );
  };

  // ============================================
  // MILESTONE SCREEN - COMPREHENSIVEE
  // ============================================
  const MilestoneScreen = ({ number }) => {
    const [saving, setSaving] = useState(false);
    const [localData, setLocalData] = useState(caseInfo.milestoneData[number] || {});
    const [errors, setErrors] = useState({});
    const [dragOver, setDragOver] = useState(null);
    const milestone = milestones.find(m => m.num === number);

    // Drag and drop handlers
    const handleDragOver = (e, zone) => { e.preventDefault(); setDragOver(zone); };
    const handleDragLeave = () => setDragOver(null);
    const handleDrop = (e, category) => {
      e.preventDefault();
      setDragOver(null);
      const files = Array.from(e.dataTransfer.files).map(f => f.name);
      const existing = localData[category] || [];
      setLocalData({ ...localData, [category]: [...existing, ...files] });
    };
    
    // File upload handler
    const handleFileUpload = (category, files) => {
      const fileNames = Array.from(files).map(f => f.name);
      const existing = localData[category] || [];
      setLocalData({ ...localData, [category]: [...existing, ...fileNames] });
    };
    
    const removeFile = (category, fileName) => {
      const existing = localData[category] || [];
      setLocalData({ ...localData, [category]: existing.filter(f => f !== fileName) });
    };

    // Reusable file upload box with drag & drop
    const FileUploadBox = ({ category, label, description, color = 'amber', icon = '📎' }) => {
      const files = localData[category] || [];
      const colors = {
        amber: { border: 'border-amber-300', bg: 'bg-amber-50', btn: 'bg-amber-500 hover:bg-amber-600', dragBg: 'bg-amber-100' },
        blue: { border: 'border-blue-300', bg: 'bg-blue-50', btn: 'bg-blue-500 hover:bg-blue-600', dragBg: 'bg-blue-100' },
        red: { border: 'border-red-300', bg: 'bg-red-50', btn: 'bg-red-500 hover:bg-red-600', dragBg: 'bg-red-100' },
        purple: { border: 'border-purple-300', bg: 'bg-purple-50', btn: 'bg-purple-500 hover:bg-purple-600', dragBg: 'bg-purple-100' },
        green: { border: 'border-emerald-300', bg: 'bg-emerald-50', btn: 'bg-emerald-500 hover:bg-emerald-600', dragBg: 'bg-emerald-100' },
        gray: { border: 'border-gray-300', bg: 'bg-gray-50', btn: 'bg-gray-600 hover:bg-gray-700', dragBg: 'bg-gray-100' },
      };
      const c = colors[color];
      return (
        <div 
          className={`border-2 border-dashed ${dragOver === category ? c.dragBg + ' ' + c.border : c.border} ${c.bg} rounded-xl p-4 transition-all drop-zone ${dragOver === category ? 'dragging' : ''}`}
          onDragOver={(e) => handleDragOver(e, category)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, category)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-medium text-gray-800 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            </div>
            <label className={`${c.btn} text-white px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer`}>
              + Add
              <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(category, e.target.files)} />
            </label>
          </div>
          <p className="text-xs text-gray-400 mb-2">Drag & drop files here or click Add</p>
          {files.length > 0 ? (
            <div className="max-h-40 overflow-y-auto space-y-1">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-sm">
                  <span className="truncate flex-1 text-gray-700">📎 {file}</span>
                  <button onClick={() => removeFile(category, file)} className="text-red-500 ml-2 text-xs hover:text-red-700">✕</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">No files uploaded yet</p>
          )}
        </div>
      );
    };

    // Validation per milestone
    const validateMilestone = () => {
      const errs = {};
      switch (number) {
        case 2:
          if (!localData.nearestAddress?.trim()) errs.nearestAddress = 'Required';
          if (!localData.city?.trim()) errs.city = 'Required';
          if (!(localData.accidentTypes?.length > 0)) errs.accidentTypes = 'Select at least one';
          break;
        case 3:
          if (!localData.yourInsurance?.trim()) errs.yourInsurance = 'Required';
          if (!localData.yourPolicy?.trim()) errs.yourPolicy = 'Required';
          break;
        case 4:
          if (!(localData.injuries?.length > 0)) errs.injuries = 'Add at least one injury';
          break;
        case 5:
          // Witnesses optional
          break;
        case 6:
          if (!(localData.doctorVisits?.length > 0)) errs.doctorVisits = 'Add at least one visit';
          break;
        case 7:
          // Medical records optional but encouraged
          break;
        case 8:
          if (localData.missedWork === undefined) errs.missedWork = 'Required';
          break;
        case 9:
          // Medications optional
          break;
        case 10:
          if (localData.treatmentComplete === undefined) errs.treatmentComplete = 'Required';
          break;
        default:
          break;
      }
      setErrors(errs);
      return Object.keys(errs).length === 0;
    };

    const handleSave = () => {
      if (!validateMilestone()) return;
      setSaving(true);
      setCaseInfo(prev => ({ ...prev, milestoneData: { ...prev.milestoneData, [number]: localData } }));
      completeMilestone(number);
      sendEmailNotification('MILESTONE_SAVED', { name: `${user.firstName} ${user.lastName}`, email: user.email, milestone: milestone?.title, step: number });
      setTimeout(() => {
        if (number >= 12) { setShowConfetti(true); setScreen('celebration'); }
        else setScreen('dashboard');
      }, 1500);
    };

    // Add entry to array field
    const addEntry = (field, template) => {
      const existing = localData[field] || [];
      setLocalData({ ...localData, [field]: [...existing, { id: Date.now(), ...template }] });
    };
    
    const updateEntry = (field, id, updates) => {
      const existing = localData[field] || [];
      setLocalData({ ...localData, [field]: existing.map(e => e.id === id ? { ...e, ...updates } : e) });
    };
    
    const removeEntry = (field, id) => {
      const existing = localData[field] || [];
      setLocalData({ ...localData, [field]: existing.filter(e => e.id !== id) });
    };

    const renderContent = () => {
      switch (number) {
        // ========== CASE 2: WHAT HAPPENED ==========
        case 2: {
          const accidentTypes = [
            { id: 'rear-end', label: 'Rear-End', icon: '🚗💥🚙', desc: 'Hit from behind' },
            { id: 't-bone', label: 'T-Bone', icon: '🚗➡️🚙', desc: 'Side impact' },
            { id: 'head-on', label: 'Head-On', icon: '🚗💥🚗', desc: 'Front collision' },
            { id: 'sideswipe', label: 'Sideswipe', icon: '🚗↔️🚙', desc: 'Side scrape' },
            { id: 'rollover', label: 'Rollover', icon: '🔄🚗', desc: 'Car flipped' },
            { id: 'hit-run', label: 'Hit & Run', icon: '🚗💨', desc: 'Driver fled' },
            { id: 'multi-car', label: 'Multi-Car', icon: '🚗🚙🚕', desc: '3+ vehicles' },
            { id: 'parking', label: 'Parking Lot', icon: '🅿️💥', desc: 'In parking area' },
            { id: 'pedestrian', label: 'Pedestrian', icon: '🚶💥🚗', desc: 'Hit while walking' },
            { id: 'bicycle', label: 'Bicycle', icon: '🚴💥🚗', desc: 'Bike involved' },
            { id: 'motorcycle', label: 'Motorcycle', icon: '🏍️💥🚗', desc: 'Motorcycle crash' },
            { id: 'uber-lyft', label: 'Uber/Lyft', icon: '📱🚗', desc: 'Rideshare accident' },
          ];
          const selectedTypes = localData.accidentTypes || [];
          
          return (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Nearest Address *" placeholder="123 Main Street" value={localData.nearestAddress || ''} onChange={(e) => setLocalData({ ...localData, nearestAddress: e.target.value })} error={errors.nearestAddress} />
                <Input label="Nearest Cross Street" placeholder="Main St & 1st Ave" value={localData.crossStreet || ''} onChange={(e) => setLocalData({ ...localData, crossStreet: e.target.value })} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="City *" placeholder="Los Angeles" value={localData.city || ''} onChange={(e) => setLocalData({ ...localData, city: e.target.value })} error={errors.city} />
                <Input label="State" placeholder="CA" value={localData.state || ''} onChange={(e) => setLocalData({ ...localData, state: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What type of accident? *</label>
                <p className="text-xs text-amber-600 mb-3">Select all that apply</p>
                {errors.accidentTypes && <p className="text-red-500 text-xs mb-2">{errors.accidentTypes}</p>}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {accidentTypes.map(type => {
                    const isSelected = selectedTypes.includes(type.id);
                    return (
                      <button key={type.id} type="button"
                        onClick={() => setLocalData({ ...localData, accidentTypes: isSelected ? selectedTypes.filter(t => t !== type.id) : [...selectedTypes, type.id] })}
                        className={`p-2 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-gray-200 hover:border-amber-300'}`}>
                        <div className="text-xl mb-1">{type.icon}</div>
                        <div className={`text-xs font-semibold ${isSelected ? 'text-amber-700' : 'text-gray-700'}`}>{type.label}</div>
                        {isSelected && <div className="text-amber-500 text-xs">✓</div>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">📝 Describe what happened</label>
                <p className="text-xs text-gray-500 mb-2">Who, What, Where, When, Why, How</p>
                <textarea value={localData.description || ''} onChange={(e) => setLocalData({ ...localData, description: e.target.value })}
                  placeholder="I was driving northbound on Main St around 3pm. The light turned green and I started moving. A red Honda ran the red light..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none min-h-[120px] text-sm" />
              </div>

              <div className="border-2 border-purple-200 rounded-xl p-4 bg-purple-50">
                <p className="font-medium text-gray-800 mb-3">👮 Police Report</p>
                <div className="flex gap-2 mb-3">
                  <button type="button" onClick={() => setLocalData({ ...localData, policeReportFiled: true })}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium ${localData.policeReportFiled === true ? 'border-purple-500 bg-purple-100 text-purple-700' : 'border-gray-200'}`}>
                    Yes, report filed
                  </button>
                  <button type="button" onClick={() => setLocalData({ ...localData, policeReportFiled: false })}
                    className={`flex-1 py-2 rounded-lg border-2 text-sm font-medium ${localData.policeReportFiled === false ? 'border-purple-500 bg-purple-100 text-purple-700' : 'border-gray-200'}`}>
                    No report
                  </button>
                </div>
                {localData.policeReportFiled && (
                  <div className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input label="Report Number" placeholder="2026-12345" value={localData.policeReportNumber || ''} onChange={(e) => setLocalData({ ...localData, policeReportNumber: e.target.value })} />
                      <Input label="Police Department" placeholder="LAPD, CHP" value={localData.policeDepartment || ''} onChange={(e) => setLocalData({ ...localData, policeDepartment: e.target.value })} />
                    </div>
                    <FileUploadBox category="policeReportFiles" label="Police Report" description="PDF or photos" color="purple" icon="📋" />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="vehiclePhotos" label="Vehicle Damage" description="All angles" color="amber" icon="🚗" />
                <FileUploadBox category="scenePhotos" label="Accident Scene" description="Street, signs, skid marks" color="blue" icon="📍" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="injuryPhotos" label="Injury Photos" description="Bruises, cuts" color="red" icon="🩹" />
                <FileUploadBox category="otherDocs" label="Other Documents" description="Insurance, witness info" color="gray" icon="📄" />
              </div>
            </div>
          );
        }

        // ========== CASE 3: INSURANCE INFO ==========
        case 3: {
          return (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="font-medium text-blue-800 mb-4">🛡️ Your Insurance</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Insurance Company *" placeholder="State Farm, Geico, Allstate" value={localData.yourInsurance || ''} onChange={(e) => setLocalData({ ...localData, yourInsurance: e.target.value })} error={errors.yourInsurance} />
                  <Input label="Policy Number *" placeholder="POL-123456789" value={localData.yourPolicy || ''} onChange={(e) => setLocalData({ ...localData, yourPolicy: e.target.value })} error={errors.yourPolicy} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Input label="Claim Number (if you have one)" placeholder="CLM-987654" value={localData.yourClaim || ''} onChange={(e) => setLocalData({ ...localData, yourClaim: e.target.value })} />
                  <Input label="Adjuster Name" placeholder="John Smith" value={localData.yourAdjuster || ''} onChange={(e) => setLocalData({ ...localData, yourAdjuster: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Input label="Adjuster Phone" placeholder="(555) 123-4567" value={localData.yourAdjusterPhone || ''} onChange={(e) => setLocalData({ ...localData, yourAdjusterPhone: e.target.value })} />
                  <Input label="Adjuster Email" placeholder="adjuster@insurance.com" value={localData.yourAdjusterEmail || ''} onChange={(e) => setLocalData({ ...localData, yourAdjusterEmail: e.target.value })} />
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="font-medium text-red-800 mb-4">⚠️ At-Fault Driver's Insurance</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Insurance Company" placeholder="Other driver's insurance" value={localData.theirInsurance || ''} onChange={(e) => setLocalData({ ...localData, theirInsurance: e.target.value })} />
                  <Input label="Policy Number" placeholder="If known" value={localData.theirPolicy || ''} onChange={(e) => setLocalData({ ...localData, theirPolicy: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Input label="Claim Number" placeholder="CLM-XXX" value={localData.theirClaim || ''} onChange={(e) => setLocalData({ ...localData, theirClaim: e.target.value })} />
                  <Input label="Adjuster Name" placeholder="If known" value={localData.theirAdjuster || ''} onChange={(e) => setLocalData({ ...localData, theirAdjuster: e.target.value })} />
                </div>
              </div>

              <FileUploadBox category="insuranceCards" label="Insurance Cards" description="Front and back of all cards" color="blue" icon="💳" />
              <FileUploadBox category="insuranceDocs" label="Insurance Documents" description="Declarations page, policy docs" color="gray" icon="📄" />
            </div>
          );
        }

        // ========== CASE 4: YOUR INJURIES ==========
        case 4: {
          const injuries = localData.injuries || [];
          const bodyParts = ['Head', 'Face', 'Neck', 'Shoulder (L)', 'Shoulder (R)', 'Upper Back', 'Lower Back', 'Chest', 'Ribs', 'Arm (L)', 'Arm (R)', 'Elbow (L)', 'Elbow (R)', 'Wrist (L)', 'Wrist (R)', 'Hand (L)', 'Hand (R)', 'Hip (L)', 'Hip (R)', 'Thigh (L)', 'Thigh (R)', 'Knee (L)', 'Knee (R)', 'Shin (L)', 'Shin (R)', 'Ankle (L)', 'Ankle (R)', 'Foot (L)', 'Foot (R)'];
          const injuryTypes = ['Bruise/Contusion', 'Cut/Laceration', 'Sprain', 'Strain', 'Fracture', 'Dislocation', 'Whiplash', 'Concussion', 'Herniated Disc', 'Torn Ligament', 'Torn Muscle', 'Internal Bleeding', 'Burns', 'Nerve Damage', 'Other'];
          
          const addInjury = () => addEntry('injuries', { bodyPart: '', injuryType: '', severity: 5, description: '', photos: [] });

          return (
            <div className="space-y-6">
              {errors.injuries && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{errors.injuries}</p>}
              
              {injuries.map((injury, idx) => (
                <div key={injury.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-red-800">🩹 Injury #{idx + 1}</p>
                    <button type="button" onClick={() => removeEntry('injuries', injury.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Body Part</label>
                      <select value={injury.bodyPart} onChange={(e) => updateEntry('injuries', injury.id, { bodyPart: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                        <option value="">Select body part...</option>
                        {bodyParts.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Injury Type</label>
                      <select value={injury.injuryType} onChange={(e) => updateEntry('injuries', injury.id, { injuryType: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                        <option value="">Select type...</option>
                        {injuryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pain Level: {injury.severity || 5}/10</label>
                    <input type="range" min="1" max="10" value={injury.severity || 5} onChange={(e) => updateEntry('injuries', injury.id, { severity: parseInt(e.target.value) })} className="w-full" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe this injury</label>
                    <textarea value={injury.description || ''} onChange={(e) => updateEntry('injuries', injury.id, { description: e.target.value })}
                      placeholder="How did it happen? Current symptoms? How does it affect daily life?"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addInjury} className="w-full py-3 border-2 border-dashed border-red-300 rounded-xl text-red-600 font-medium hover:bg-red-50 transition-colors">
                + Add Another Injury
              </button>

              <FileUploadBox category="allInjuryPhotos" label="All Injury Photos" description="Photos of bruises, cuts, swelling over time" color="red" icon="📸" />

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-medium text-amber-800 mb-4">💊 Medications</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Medications</label>
                    <textarea value={localData.prescriptionMeds || ''} onChange={(e) => setLocalData({ ...localData, prescriptionMeds: e.target.value })}
                      placeholder="List all prescription medications (one per line)&#10;Example:&#10;Ibuprofen 800mg - Dr. Smith&#10;Muscle relaxer - Dr. Jones"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[100px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Over-the-Counter Medications</label>
                    <textarea value={localData.otcMeds || ''} onChange={(e) => setLocalData({ ...localData, otcMeds: e.target.value })}
                      placeholder="List OTC medications (one per line)&#10;Example:&#10;Tylenol&#10;Advil&#10;Bengay"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[100px]" />
                  </div>
                </div>
                <div className="mt-4">
                  <FileUploadBox category="prescriptionDocs" label="Prescription Documents" description="Photos of prescriptions, pharmacy receipts" color="amber" icon="💊" />
                </div>
              </div>
            </div>
          );
        }

        // ========== CASE 5: WITNESSES ==========
        case 5: {
          const witnesses = localData.witnesses || [];
          const addWitness = () => addEntry('witnesses', { name: '', phone: '', email: '', relationship: '', statement: '' });
          
          // Initialize with 3 blank witnesses if empty
          if (witnesses.length === 0) {
            setTimeout(() => {
              setLocalData({ ...localData, witnesses: [
                { id: 1, name: '', phone: '', email: '', relationship: '', statement: '' },
                { id: 2, name: '', phone: '', email: '', relationship: '', statement: '' },
                { id: 3, name: '', phone: '', email: '', relationship: '', statement: '' },
              ]});
            }, 0);
          }

          return (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                👁️ Witnesses can significantly strengthen your case. Add anyone who saw the accident.
              </p>

              {witnesses.map((witness, idx) => (
                <div key={witness.id} className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-blue-800">👤 Witness #{idx + 1}</p>
                    {witnesses.length > 1 && (
                      <button type="button" onClick={() => removeEntry('witnesses', witness.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input label="Full Name" placeholder="John Doe" value={witness.name} onChange={(e) => updateEntry('witnesses', witness.id, { name: e.target.value })} />
                    <Input label="Phone Number" placeholder="(555) 123-4567" value={witness.phone} onChange={(e) => updateEntry('witnesses', witness.id, { phone: e.target.value })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input label="Email" placeholder="witness@email.com" value={witness.email} onChange={(e) => updateEntry('witnesses', witness.id, { email: e.target.value })} />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to You</label>
                      <select value={witness.relationship} onChange={(e) => updateEntry('witnesses', witness.id, { relationship: e.target.value })}
                        className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                        <option value="">Select...</option>
                        <option value="stranger">Stranger / Bystander</option>
                        <option value="passenger">Passenger in my car</option>
                        <option value="other-driver">Other driver involved</option>
                        <option value="passenger-other">Passenger in other car</option>
                        <option value="friend">Friend</option>
                        <option value="family">Family member</option>
                        <option value="coworker">Coworker</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">What did they see?</label>
                    <textarea value={witness.statement || ''} onChange={(e) => updateEntry('witnesses', witness.id, { statement: e.target.value })}
                      placeholder="Briefly describe what this witness observed..."
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addWitness} className="w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                + Add Another Witness
              </button>

              <FileUploadBox category="witnessStatements" label="Written Witness Statements" description="Signed statements, police witness forms" color="blue" icon="📝" />
            </div>
          );
        }

        // ========== CASE 6: DOCTOR VISITS ==========
        case 6: {
          const visits = localData.doctorVisits || [];
          const addVisit = () => addEntry('doctorVisits', { date: '', doctorName: '', facility: '', address: '', reason: '', diagnosis: '', treatment: '', nextSteps: '', cost: '', files: [] });
          
          return (
            <div className="space-y-6">
              {errors.doctorVisits && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{errors.doctorVisits}</p>}
              
              <p className="text-sm text-gray-600 bg-emerald-50 p-3 rounded-lg">
                🏥 Every doctor visit builds your case. Add all visits related to your accident injuries.
              </p>

              {visits.map((visit, idx) => (
                <div key={visit.id} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-medium text-emerald-800">🩺 Visit #{idx + 1}</p>
                    <button type="button" onClick={() => removeEntry('doctorVisits', visit.id)} className="text-red-500 text-sm hover:text-red-700">Remove</button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <Input label="Visit Date *" type="date" value={visit.date} onChange={(e) => updateEntry('doctorVisits', visit.id, { date: e.target.value })} />
                    <Input label="Doctor Name" placeholder="Dr. Smith" value={visit.doctorName} onChange={(e) => updateEntry('doctorVisits', visit.id, { doctorName: e.target.value })} />
                    <Input label="Cost/Copay" placeholder="$150" value={visit.cost} onChange={(e) => updateEntry('doctorVisits', visit.id, { cost: e.target.value })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Input label="Facility/Hospital" placeholder="UCLA Medical Center" value={visit.facility} onChange={(e) => updateEntry('doctorVisits', visit.id, { facility: e.target.value })} />
                    <Input label="Address" placeholder="123 Medical Blvd, LA CA" value={visit.address} onChange={(e) => updateEntry('doctorVisits', visit.id, { address: e.target.value })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                      <textarea value={visit.reason || ''} onChange={(e) => updateEntry('doctorVisits', visit.id, { reason: e.target.value })}
                        placeholder="What symptoms brought you in?"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                      <textarea value={visit.diagnosis || ''} onChange={(e) => updateEntry('doctorVisits', visit.id, { diagnosis: e.target.value })}
                        placeholder="What did the doctor diagnose?"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Provided</label>
                      <textarea value={visit.treatment || ''} onChange={(e) => updateEntry('doctorVisits', visit.id, { treatment: e.target.value })}
                        placeholder="Medications, procedures, physical therapy, etc."
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Next Steps</label>
                      <textarea value={visit.nextSteps || ''} onChange={(e) => updateEntry('doctorVisits', visit.id, { nextSteps: e.target.value })}
                        placeholder="Follow-up appointments, referrals, tests ordered"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                    </div>
                  </div>
                </div>
              ))}
              
              <button type="button" onClick={addVisit} className="w-full py-3 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-600 font-medium hover:bg-emerald-50 transition-colors">
                + Add Doctor Visit
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="visitSummaries" label="Visit Summaries" description="Doctor's notes, visit summaries" color="green" icon="📋" />
                <FileUploadBox category="labResults" label="Lab Results" description="Blood work, test results" color="purple" icon="🧪" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="xrays" label="X-Rays & Imaging" description="X-rays, MRI, CT scans" color="blue" icon="🩻" />
                <FileUploadBox category="medicalBills" label="Medical Bills" description="Invoices, receipts, EOBs" color="amber" icon="💵" />
              </div>
            </div>
          );
        }

        // ========== CASE 7: MEDICAL RECORDS ==========
        case 7: {
          return (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                📁 Upload all medical records related to your accident. These are crucial for your case.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="erRecords" label="Emergency Room Records" description="Initial ER visit documentation" color="red" icon="🏥" />
                <FileUploadBox category="hospitalRecords" label="Hospital Records" description="Admission, discharge summaries" color="blue" icon="🏨" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="doctorRecords" label="Doctor's Office Records" description="Progress notes, treatment plans" color="green" icon="👨‍⚕️" />
                <FileUploadBox category="specialistRecords" label="Specialist Records" description="Orthopedic, neurology, etc." color="purple" icon="🔬" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="ptRecords" label="Physical Therapy Records" description="PT evaluations, progress notes" color="amber" icon="🏃" />
                <FileUploadBox category="chiropractorRecords" label="Chiropractor Records" description="Adjustments, treatment plans" color="blue" icon="🦴" />
              </div>
              <FileUploadBox category="otherMedicalRecords" label="Other Medical Records" description="Any other relevant medical documentation" color="gray" icon="📄" />

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-medium text-amber-800 mb-2">💡 Tips for getting your records:</p>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Contact each provider's medical records department</li>
                  <li>• Ask for "complete medical records" related to your accident</li>
                  <li>• Request itemized billing statements</li>
                  <li>• Allow 2-4 weeks for records to be processed</li>
                </ul>
              </div>
            </div>
          );
        }

        // ========== CASE 8: MISSED WORK ==========
        case 8: {
          return (
            <div className="space-y-6">
              {errors.missedWork && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{errors.missedWork}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Did you miss work due to your injuries? *</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setLocalData({ ...localData, missedWork: true })}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium ${localData.missedWork === true ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                    Yes, I missed work
                  </button>
                  <button type="button" onClick={() => setLocalData({ ...localData, missedWork: false })}
                    className={`flex-1 py-3 rounded-xl border-2 text-sm font-medium ${localData.missedWork === false ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                    No missed work
                  </button>
                </div>
              </div>

              {localData.missedWork && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="font-medium text-amber-800 mb-4">💼 Employment Information</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input label="Employer Name" placeholder="Company Inc." value={localData.employer || ''} onChange={(e) => setLocalData({ ...localData, employer: e.target.value })} />
                      <Input label="Your Job Title" placeholder="Manager" value={localData.jobTitle || ''} onChange={(e) => setLocalData({ ...localData, jobTitle: e.target.value })} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <Input label="Hourly Rate or Salary" placeholder="$25/hr or $60,000/year" value={localData.payRate || ''} onChange={(e) => setLocalData({ ...localData, payRate: e.target.value })} />
                      <Input label="Hours Per Week" placeholder="40" value={localData.hoursPerWeek || ''} onChange={(e) => setLocalData({ ...localData, hoursPerWeek: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="First Day Missed" type="date" value={localData.firstDayMissed || ''} onChange={(e) => setLocalData({ ...localData, firstDayMissed: e.target.value })} />
                    <Input label="Last Day Missed (or ongoing)" type="date" value={localData.lastDayMissed || ''} onChange={(e) => setLocalData({ ...localData, lastDayMissed: e.target.value })} />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input label="Total Days Missed" placeholder="15" value={localData.totalDaysMissed || ''} onChange={(e) => setLocalData({ ...localData, totalDaysMissed: e.target.value })} />
                    <Input label="Estimated Lost Wages" placeholder="$3,000" value={localData.lostWages || ''} onChange={(e) => setLocalData({ ...localData, lostWages: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Are you still unable to work?</label>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setLocalData({ ...localData, stillOutOfWork: true })}
                        className={`flex-1 py-2 rounded-xl border-2 text-sm ${localData.stillOutOfWork === true ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                        Yes, still out
                      </button>
                      <button type="button" onClick={() => setLocalData({ ...localData, stillOutOfWork: false })}
                        className={`flex-1 py-2 rounded-xl border-2 text-sm ${localData.stillOutOfWork === false ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                        Back to work
                      </button>
                      <button type="button" onClick={() => setLocalData({ ...localData, stillOutOfWork: 'partial' })}
                        className={`flex-1 py-2 rounded-xl border-2 text-sm ${localData.stillOutOfWork === 'partial' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-gray-200'}`}>
                        Limited duties
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe work impact</label>
                    <textarea value={localData.workImpact || ''} onChange={(e) => setLocalData({ ...localData, workImpact: e.target.value })}
                      placeholder="How have your injuries affected your ability to work? Any reduced hours, modified duties, or career impact?"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[100px]" />
                  </div>

                  <FileUploadBox category="employmentDocs" label="Employment Documentation" description="Pay stubs, W2s, employment verification" color="amber" icon="📄" />
                  <FileUploadBox category="doctorWorkNotes" label="Doctor's Work Restrictions" description="Notes clearing/restricting work" color="green" icon="🩺" />
                </>
              )}
            </div>
          );
        }

        // ========== CASE 9: ONGOING SYMPTOMS ==========
        case 9: {
          const symptoms = localData.currentSymptoms || [];
          const commonSymptoms = ['Chronic pain', 'Headaches', 'Neck stiffness', 'Back pain', 'Limited mobility', 'Numbness/tingling', 'Sleep problems', 'Anxiety', 'Depression', 'Memory issues', 'Fatigue', 'Dizziness'];
          
          return (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 bg-purple-50 p-3 rounded-lg">
                📊 Document your current symptoms and how they affect your daily life.
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Symptoms (select all that apply)</label>
                <div className="flex flex-wrap gap-2">
                  {commonSymptoms.map(symptom => (
                    <button key={symptom} type="button"
                      onClick={() => setLocalData({ ...localData, currentSymptoms: symptoms.includes(symptom) ? symptoms.filter(s => s !== symptom) : [...symptoms, symptom] })}
                      className={`px-3 py-1.5 rounded-full border-2 text-sm ${symptoms.includes(symptom) ? 'border-purple-400 bg-purple-50 text-purple-700' : 'border-gray-200'}`}>
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other symptoms not listed above</label>
                <textarea value={localData.otherSymptoms || ''} onChange={(e) => setLocalData({ ...localData, otherSymptoms: e.target.value })}
                  placeholder="Describe any other symptoms you're experiencing..."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Pain Level Today: {localData.currentPain || 5}/10</label>
                <input type="range" min="0" max="10" value={localData.currentPain || 5} onChange={(e) => setLocalData({ ...localData, currentPain: parseInt(e.target.value) })} className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How do symptoms affect your daily life?</label>
                <textarea value={localData.dailyLifeImpact || ''} onChange={(e) => setLocalData({ ...localData, dailyLifeImpact: e.target.value })}
                  placeholder="Describe how your injuries affect work, sleep, hobbies, relationships, household tasks, etc."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[120px]" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Can you do household chores?</label>
                  <select value={localData.householdAbility || ''} onChange={(e) => setLocalData({ ...localData, householdAbility: e.target.value })}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                    <option value="">Select...</option>
                    <option value="normal">Yes, same as before</option>
                    <option value="limited">Limited ability</option>
                    <option value="help">Need help</option>
                    <option value="unable">Unable to do</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exercise/Physical Activity?</label>
                  <select value={localData.exerciseAbility || ''} onChange={(e) => setLocalData({ ...localData, exerciseAbility: e.target.value })}
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                    <option value="">Select...</option>
                    <option value="normal">Yes, same as before</option>
                    <option value="limited">Limited ability</option>
                    <option value="unable">Unable to exercise</option>
                  </select>
                </div>
              </div>
            </div>
          );
        }

        // ========== CASE 10: TREATMENT STATUS ==========
        case 10: {
          return (
            <div className="space-y-6">
              {errors.treatmentComplete && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{errors.treatmentComplete}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What is your current treatment status? *</label>
                <div className="space-y-2">
                  {[
                    { value: 'ongoing', label: 'Still receiving treatment', desc: 'Actively seeing doctors, doing PT, etc.' },
                    { value: 'completed', label: 'Treatment completed', desc: 'Doctor has released you from care' },
                    { value: 'mmi', label: 'Maximum Medical Improvement (MMI)', desc: 'Condition is stable, no further improvement expected' },
                    { value: 'surgery-needed', label: 'Surgery recommended', desc: 'Doctor recommends surgery you haven\'t had yet' },
                  ].map(opt => (
                    <button key={opt.value} type="button" onClick={() => setLocalData({ ...localData, treatmentComplete: opt.value })}
                      className={`w-full text-left p-4 rounded-xl border-2 ${localData.treatmentComplete === opt.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}>
                      <p className={`font-medium ${localData.treatmentComplete === opt.value ? 'text-amber-700' : 'text-gray-700'}`}>{opt.label}</p>
                      <p className="text-sm text-gray-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {localData.treatmentComplete === 'completed' && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <Input label="Date of Last Treatment" type="date" value={localData.lastTreatmentDate || ''} onChange={(e) => setLocalData({ ...localData, lastTreatmentDate: e.target.value })} />
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Final prognosis from your doctor</label>
                    <textarea value={localData.finalPrognosis || ''} onChange={(e) => setLocalData({ ...localData, finalPrognosis: e.target.value })}
                      placeholder="What did your doctor say about your long-term outlook?"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                  </div>
                </div>
              )}

              {localData.treatmentComplete === 'surgery-needed' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="font-medium text-red-800 mb-4">🏥 Recommended Surgery Details</p>
                  <Input label="Type of Surgery" placeholder="ACL reconstruction, spinal fusion, etc." value={localData.surgeryType || ''} onChange={(e) => setLocalData({ ...localData, surgeryType: e.target.value })} />
                  <div className="mt-4">
                    <Input label="Estimated Cost" placeholder="$50,000" value={localData.surgeryCost || ''} onChange={(e) => setLocalData({ ...localData, surgeryCost: e.target.value })} />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why haven't you had the surgery yet?</label>
                    <textarea value={localData.surgeryDelay || ''} onChange={(e) => setLocalData({ ...localData, surgeryDelay: e.target.value })}
                      placeholder="Waiting for insurance approval, can't afford, scheduling, etc."
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Any permanent limitations or disabilities?</label>
                <textarea value={localData.permanentLimitations || ''} onChange={(e) => setLocalData({ ...localData, permanentLimitations: e.target.value })}
                  placeholder="Describe any permanent injuries, scars, range of motion loss, chronic conditions, etc."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[100px]" />
              </div>

              <FileUploadBox category="dischargeRecords" label="Discharge/Release Records" description="Doctor's release, final visit notes" color="green" icon="📋" />
            </div>
          );
        }

        // ========== CASE 11: PROPERTY DAMAGE ==========
        case 11: {
          return (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="font-medium text-amber-800 mb-4">🚗 Your Vehicle</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <Input label="Year" placeholder="2022" value={localData.vehicleYear || ''} onChange={(e) => setLocalData({ ...localData, vehicleYear: e.target.value })} />
                  <Input label="Make" placeholder="Toyota" value={localData.vehicleMake || ''} onChange={(e) => setLocalData({ ...localData, vehicleMake: e.target.value })} />
                  <Input label="Model" placeholder="Camry" value={localData.vehicleModel || ''} onChange={(e) => setLocalData({ ...localData, vehicleModel: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Status</label>
                    <select value={localData.vehicleStatus || ''} onChange={(e) => setLocalData({ ...localData, vehicleStatus: e.target.value })}
                      className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-sm">
                      <option value="">Select...</option>
                      <option value="totaled">Totaled / Total Loss</option>
                      <option value="repaired">Repaired</option>
                      <option value="repairing">Being Repaired</option>
                      <option value="not-repaired">Not Yet Repaired</option>
                    </select>
                  </div>
                  <Input label="Estimated Value Before Accident" placeholder="$25,000" value={localData.vehicleValue || ''} onChange={(e) => setLocalData({ ...localData, vehicleValue: e.target.value })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Repair Estimate/Cost" placeholder="$8,500" value={localData.repairCost || ''} onChange={(e) => setLocalData({ ...localData, repairCost: e.target.value })} />
                <Input label="Rental Car Costs" placeholder="$1,200" value={localData.rentalCost || ''} onChange={(e) => setLocalData({ ...localData, rentalCost: e.target.value })} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other property damaged?</label>
                <textarea value={localData.otherPropertyDamage || ''} onChange={(e) => setLocalData({ ...localData, otherPropertyDamage: e.target.value })}
                  placeholder="Phone, laptop, car seat, personal items, etc."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[80px]" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="repairEstimates" label="Repair Estimates" description="Body shop quotes" color="amber" icon="🔧" />
                <FileUploadBox category="repairReceipts" label="Repair Receipts" description="Paid repair invoices" color="green" icon="🧾" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <FileUploadBox category="totalLossDocs" label="Total Loss Documents" description="Insurance valuation" color="red" icon="📄" />
                <FileUploadBox category="rentalReceipts" label="Rental Car Receipts" description="Rental agreements, receipts" color="blue" icon="🚙" />
              </div>
            </div>
          );
        }

        // ========== CASE 12: FINAL REVIEW ==========
        case 12: {
          return (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                <span className="text-5xl">🎉</span>
                <h3 className="text-xl font-bold text-emerald-800 mt-4">You're Almost Done!</h3>
                <p className="text-emerald-700 mt-2">Review your case information before submitting.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="font-medium text-gray-800 mb-3">📋 Case Summary</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Accident Type:</span><span className="font-medium">{(caseInfo.milestoneData[2]?.accidentTypes || []).join(', ') || 'Not specified'}</span></div>
                  <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Location:</span><span className="font-medium">{caseInfo.milestoneData[2]?.city || 'Not specified'}</span></div>
                  <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Injuries:</span><span className="font-medium">{(caseInfo.milestoneData[4]?.injuries || []).length} documented</span></div>
                  <div className="flex justify-between py-2 border-b"><span className="text-gray-500">Doctor Visits:</span><span className="font-medium">{(caseInfo.milestoneData[6]?.doctorVisits || []).length} recorded</span></div>
                  <div className="flex justify-between py-2"><span className="text-gray-500">Treatment Status:</span><span className="font-medium">{caseInfo.milestoneData[10]?.treatmentComplete || 'Not specified'}</span></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anything else we should know?</label>
                <textarea value={localData.additionalNotes || ''} onChange={(e) => setLocalData({ ...localData, additionalNotes: e.target.value })}
                  placeholder="Any other details about your case, questions, or concerns..."
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-sm min-h-[100px]" />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={localData.confirmAccuracy || false} onChange={(e) => setLocalData({ ...localData, confirmAccuracy: e.target.checked })}
                    className="mt-1 w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-700">I confirm that all information provided is accurate to the best of my knowledge. I understand that my attorney will review this information.</span>
                </label>
              </div>
            </div>
          );
        }

        default:
          return (
            <div className="text-center py-8">
              <p className="text-gray-500">Complete this milestone to continue your case.</p>
            </div>
          );
      }
    };

    return (
      <div className="min-h-screen bg-warm pb-20">
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
          <div className="desktop-container mx-auto px-4 py-3 flex items-center justify-between">
            <button onClick={() => setScreen('dashboard')} className="text-gray-500 font-medium text-sm">← Back</button>
            <span className="text-sm text-gray-500">Step {number} of 12</span>
            <div className="w-16" />
          </div>
        </header>

        <div className="desktop-container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <span className="text-5xl">{milestone?.icon}</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-3">{milestone?.title}</h1>
            <p className="text-gray-500 mt-1">Step {number} of 12</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-amber-100">
            {renderContent()}
          </div>

          {saving ? (
            <div className="text-center py-8 animate-fadeIn">
              <span className="text-5xl">✓</span>
              <p className="text-xl font-bold text-emerald-600 mt-3">Saved!</p>
              <p className="text-gray-500">Confirmation email sent</p>
            </div>
          ) : (
            <button onClick={handleSave} className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors text-lg">
              Save & Continue →
            </button>
          )}
        </div>

        <BottomNav />
      </div>
    );
  };

  // ============================================
  // MESSAGES SCREEN - inlined in render
  // ============================================
  
  // ============================================
  // AI SCREEN - inlined in render
  // ============================================

  // ============================================
  // PROFILE SCREEN
  // ============================================
  const ProfileScreen = () => (
    <div className="min-h-screen bg-warm pb-20">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
        <div className="max-w-md mx-auto px-4 py-3">
          <p className="font-semibold text-gray-900">{t.profile}</p>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-amber-100 flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center text-2xl">👤</div>
          <div>
            <p className="font-bold text-gray-900">{user.firstName || 'Maria'} {user.lastName || 'Gonzalez'}</p>
            <p className="text-sm text-gray-500">{user.email || 'maria@email.com'}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-amber-100 divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700">🌐 Language</span>
            <button onClick={() => setLang(lang === 'en' ? 'es' : 'en')} className="text-amber-600 font-medium">
              {lang === 'en' ? 'English' : 'Español'} →
            </button>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700">📋 Case Number</span>
            <span className="text-gray-500">MLB-2026-{String(Date.now()).slice(-4)}</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-gray-700">📊 Progress</span>
            <span className="text-amber-600 font-medium">{progress}% complete</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-100">
          <p className="font-semibold text-gray-900 mb-3">What you could get</p>
          <p className="text-3xl font-bold text-amber-600">${caseInfo.estimatedSettlement.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">This is our best estimate based on similar cases</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );

  // ============================================
  // CELEBRATION SCREEN
  // ============================================
  const CelebrationScreen = () => {
    useEffect(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, []);

    const finalAmount = caseInfo.estimatedSettlement;
    const fees = Math.round(finalAmount * 0.10);
    const medical = Math.round(caseInfo.treatments.reduce((a, t) => a + t.cost, 0) * 1.2);
    const youKeep = finalAmount - fees - medical;

    return (
      <div className="min-h-screen bg-warm flex items-center justify-center px-4">
        <Confetti active={showConfetti} />
        <div className="max-w-sm w-full text-center">
          <span className="text-5xl">🎉</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">You did it!</h1>
          <p className="text-gray-500 mb-6">The insurance company agreed to pay.</p>
          
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
            <p className="text-xs text-amber-600">Your check will be</p>
            <p className="text-4xl font-bold text-gray-900 my-2">${youKeep.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Deposited in about 2 weeks</p>
          </div>

          <p className="text-sm text-emerald-600 mb-6">
            You saved ${Math.round(finalAmount * 0.23).toLocaleString()} by using MyLawBox instead of a typical lawyer!
          </p>

          <button onClick={() => { setScreen('dashboard'); setActiveNav('home'); }} className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl">
            Back to Home
          </button>
        </div>
      </div>
    );
  };

  // ============================================
  // RENDER
  // ============================================
  
  const signupDates = [
    { label: 'Tomorrow, Feb 2', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:00 PM'] },
    { label: 'Wednesday, Feb 3', slots: ['9:00 AM', '11:00 AM', '1:00 PM', '3:30 PM'] },
    { label: 'Thursday, Feb 4', slots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  ];

  const handleSignupNext = async () => {
    if (signupStep === 1 && validateForm()) {
      // Send welcome email
      sendEmailNotification('SIGNUP_STARTED', {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone,
        accidentDate: `${user.accidentMonth}/${user.accidentDay}/${user.accidentYear}`
      });
      setSignupStep(2);
    } else if (signupStep === 2 && selectedTime) {
      setUser(prev => ({ ...prev, scheduledTime: selectedTime, scheduledDate: selectedDate }));
      // Send appointment confirmation email
      sendEmailNotification('APPOINTMENT_SCHEDULED', {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime
      });
      setSignupStep(3);
    } else if (signupStep === 3) {
      // Create Supabase account
      const { data, error } = await signUp(user.email, user.password);
      
      if (error) {
        setAuthError(error.message);
        setToast('Error creating account. Please try again.');
        setTimeout(() => setToast(null), 3000);
        return;
      }
      
      // Send account created email
      sendEmailNotification('ACCOUNT_CREATED', {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email
      });
      
      setToast('Account created! Please check your email to verify your account.');
      setTimeout(() => {
        setToast(null);
        setScreen('dashboard');
        setActiveNav('home');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen">
      <style>{styles}</style>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2">
            <span>📧</span>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}
      
      {screen === 'landing' && <LandingPage />}
      
      {screen === 'login' && (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-4">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
                <p className="text-gray-600">Log in to continue your case</p>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {authError}
                </div>
              )}

              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                setAuthError(null);
                const { error } = await signIn(user.email, user.password);
                if (error) {
                  setAuthError(error.message);
                } else {
                  setScreen('dashboard');
                  setActiveNav('home');
                }
              }}>
                <Input 
                  label="Email" 
                  icon="✉️" 
                  type="email" 
                  placeholder="your@email.com" 
                  name="email" 
                  autoComplete="email" 
                  value={user.email} 
                  onChange={(e) => setUser({...user, email: e.target.value})} 
                  required
                />
                <Input 
                  label="Password" 
                  icon="🔒" 
                  type="password" 
                  placeholder="Enter your password" 
                  name="password" 
                  autoComplete="current-password" 
                  value={user.password} 
                  onChange={(e) => setUser({...user, password: e.target.value})} 
                  required
                />
                
                <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3.5 rounded-xl hover:bg-amber-600 transition-colors shadow-lg">
                  Log In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button onClick={() => setScreen('signup')} className="text-amber-600 font-semibold hover:text-amber-700">
                    Sign up
                  </button>
                </p>
              </div>

              <button onClick={() => setScreen('landing')} className="mt-4 w-full text-gray-500 text-sm hover:text-gray-700">
                ← Back to home
              </button>
            </div>
          </div>
        </div>
      )}
      
      {screen === 'signup' && (
        <div className="min-h-screen bg-warm">
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
              <button onClick={() => signupStep > 1 ? setSignupStep(signupStep - 1) : setScreen('landing')} className="text-gray-500 font-medium text-sm">
                ← {t.back}
              </button>
              <span className="font-semibold text-gray-900">MyLawBox</span>
              <div className="w-12" />
            </div>
          </header>

          <div className="max-w-md mx-auto px-4 py-6">
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <React.Fragment key={step}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step < signupStep ? 'bg-emerald-500 text-white' : 
                    step === signupStep ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step < signupStep ? '✓' : step}
                  </div>
                  {step < 3 && <div className={`w-8 h-1 rounded ${step < signupStep ? 'bg-emerald-500' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            {signupStep === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 animate-fadeIn">
                <h1 className="text-xl font-bold text-gray-900 mb-1">Let's get started</h1>
                <p className="text-gray-500 text-sm mb-6">Tell us about yourself (2 min)</p>
                
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label={t.firstName} placeholder="Maria" name="firstName" autoComplete="given-name" value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})} error={formErrors.firstName} />
                    <Input label={t.lastName} placeholder="Gonzalez" name="lastName" autoComplete="family-name" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})} error={formErrors.lastName} />
                  </div>
                  <Input label={t.phone} icon="📱" placeholder="(555) 123-4567" name="phone" autoComplete="tel" value={user.phone} onChange={(e) => setUser({...user, phone: e.target.value})} error={formErrors.phone} />
                  <Input label={t.email} icon="✉️" type="email" placeholder="maria@email.com" name="email" autoComplete="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} error={formErrors.email} />
                  <Input label="Password" icon="🔒" type="password" placeholder="Create a password" name="password" autoComplete="new-password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} error={formErrors.password} />
                  
                  {/* Custom Date Picker */}
                  <div>
                    <label className={`block text-sm font-medium mb-1.5 ${formErrors.accidentDate ? 'text-red-600' : 'text-gray-700'}`}>📅 {t.accidentDate} *</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select 
                        value={user.accidentMonth || ''} 
                        onChange={(e) => setUser({...user, accidentMonth: e.target.value})}
                        className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white outline-none transition-all appearance-none text-sm ${formErrors.accidentDate ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <option value="">Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                      <select 
                        value={user.accidentDay || ''} 
                        onChange={(e) => setUser({...user, accidentDay: e.target.value})}
                        className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white outline-none transition-all appearance-none text-sm ${formErrors.accidentDate ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <option value="">Day</option>
                        {[...Array(31)].map((_, i) => (
                          <option key={i+1} value={String(i+1).padStart(2, '0')}>{i+1}</option>
                        ))}
                      </select>
                      <select 
                        value={user.accidentYear || ''} 
                        onChange={(e) => setUser({...user, accidentYear: e.target.value})}
                        className={`w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:bg-white outline-none transition-all appearance-none text-sm ${formErrors.accidentDate ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <option value="">Year</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                      </select>
                    </div>
                    {formErrors.accidentDate && <p className="text-red-500 text-xs mt-1">{formErrors.accidentDate}</p>}
                  </div>
                </form>
              </div>
            )}

            {signupStep === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 animate-fadeIn">
                <h1 className="text-xl font-bold text-gray-900 mb-1">{t.scheduleCall}</h1>
                <p className="text-gray-500 text-sm mb-6">Pick a time for your 10-minute attorney call</p>
                
                <div className="space-y-4">
                  {signupDates.map((day) => (
                    <div key={day.label}>
                      <p className="text-sm font-medium text-gray-700 mb-2">{day.label}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {day.slots.map((slot) => (
                          <button key={`${day.label}-${slot}`} onClick={() => { setSelectedDate(day.label); setSelectedTime(slot); }}
                            className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                              selectedDate === day.label && selectedTime === slot
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-gray-200 hover:border-amber-300 text-gray-700'
                            }`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {signupStep === 3 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 text-center animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-emerald-600">✓</span>
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">You're all set!</h1>
                
                <div className="bg-amber-50 rounded-xl p-4 my-6">
                  <p className="text-sm text-gray-500">Your phone call is booked</p>
                  <p className="text-lg font-bold text-gray-900">{selectedDate}</p>
                  <p className="text-amber-600 font-semibold">{selectedTime}</p>
                  <p className="text-sm text-gray-500 mt-1">Sarah will call you</p>
                </div>

                <p className="text-sm text-emerald-600">✓ We sent you a calendar invite</p>
              </div>
            )}

            <button onClick={handleSignupNext} disabled={signupStep === 2 && !selectedTime}
              className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {signupStep === 3 ? 'Go to Dashboard →' : `${t.continue} →`}
            </button>
          </div>
        </div>
      )}
      
      {screen === 'dashboard' && <Dashboard />}
      
      {screen === 'ai' && (
        <div className="min-h-screen bg-warm pb-20 flex flex-col">
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">🤖</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Ask Me Anything</p>
                <p className="text-xs text-purple-600">I'm here to help</p>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto max-w-md mx-auto w-full">
            {aiChat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  msg.role === 'user' ? 'bg-amber-500 text-white rounded-br-sm' : 'bg-white border border-purple-100 rounded-bl-sm'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {aiThinking && (
              <div className="flex justify-start">
                <div className="bg-white border border-purple-100 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={aiChatEndRef} />
          </div>

          <div className="px-4 py-2 max-w-md mx-auto w-full">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['How much could I get?', 'What do I do next?', 'How long will this take?', 'Why do I need photos?'].map((q, i) => (
                <button key={i} onClick={() => sendAIMessage(q)} className="flex-shrink-0 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="max-w-md mx-auto flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                placeholder="Ask anything..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-purple-500" />
              <button onClick={() => sendAIMessage()} className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center">→</button>
            </div>
          </div>

          <BottomNav />
        </div>
      )}
      
      {screen === 'messages' && (
        <div className="min-h-screen bg-warm pb-20 flex flex-col">
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-amber-100">
            <div className="max-w-md mx-auto px-4 py-3 flex items-center gap-3">
              <button onClick={() => { setScreen('dashboard'); setActiveNav('home'); }} className="text-gray-500">←</button>
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">👩‍⚖️</div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Sarah (Your Lawyer)</p>
                <p className="text-xs text-emerald-600">Usually responds in a few hours</p>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto max-w-md mx-auto w-full">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  msg.from === 'user' ? 'bg-amber-500 text-white rounded-br-sm' : 'bg-white border border-gray-100 rounded-bl-sm'
                }`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.from === 'user' ? 'text-amber-200' : 'text-gray-400'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="max-w-md mx-auto flex gap-2">
              <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..." className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-amber-500" />
              <button onClick={sendMessage} className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center">→</button>
            </div>
          </div>

          <BottomNav />
        </div>
      )}
      
      {screen === 'profile' && <ProfileScreen />}
      {screen === 'celebration' && <CelebrationScreen />}
      {screen.startsWith('milestone-') && <MilestoneScreen number={parseInt(screen.split('-')[1])} />}
    </div>
  );
}
