import React, { useState, useRef } from 'react';
import { User, Lock, Eye, EyeOff, Fingerprint, LogIn, Mail, Camera, UserPlus, ArrowLeft } from 'lucide-react';
import { LOGO_URL } from '../types';

interface LoginProps {
  onLogin: () => void;
}

// Strict RFC 5322 Regex
const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Avatar States
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Email before submit
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('E-mail inválido (formato RFC 5322)');
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  // Strict "No Empty" Policy: Traps focus if field is empty on blur
  const handleStrictBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value.trim()) {
      e.target.focus();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmail(val);
    if (val && !EMAIL_REGEX.test(val)) {
      setEmailError('E-mail inválido');
    } else {
      setEmailError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.toUpperCase());
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background-dark">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-md px-8 py-10 z-10 flex flex-col h-full md:h-auto min-h-[600px] justify-center transition-all duration-500">
        
        {/* Header Section with Incorporated Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full transform scale-150 opacity-20 pointer-events-none"></div>
            <img 
              src={LOGO_URL} 
              alt="Logo" 
              className="h-28 w-auto object-contain relative z-10 drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 font-display">
            {isRegistering ? 'Crie sua conta' : 'Bem-vindo'}
          </h2>
          <p className="text-slate-400 text-center text-sm max-w-[260px]">
            {isRegistering 
              ? 'Preencha os dados abaixo para começar' 
              : 'Acesse o sistema de gestão e controle'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-5 w-full" autoComplete="off">
          
          {/* Anti-Autofill Hack: Hidden inputs to trick browser heuristics */}
          <input type="text" style={{display: 'none'}} />
          <input type="password" style={{display: 'none'}} />

          {isRegistering && (
            <>
              {/* Avatar Upload Placeholder */}
              <div className="flex justify-center mb-4">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />
                <div 
                  onClick={handleAvatarClick}
                  className="w-24 h-24 rounded-full border-2 border-dashed border-slate-600 bg-surface/30 flex items-center justify-center relative cursor-pointer hover:border-primary transition-colors group overflow-hidden"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <User size={32} className="text-slate-500" />
                      <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full shadow-lg transform translate-x-1/4 translate-y-1/4">
                        <Camera size={14} className="text-white" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                    <User size={20} />
                  </div>
                  <input 
                    type="text"
                    name="register_name_field_no_autofill"
                    autoComplete="off"
                    className="block w-full pl-12 pr-4 py-3.5 bg-surface/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
                    placeholder="Nome Completo"
                    required
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleStrictBlur}
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                <Mail size={20} />
              </div>
              <input 
                type="email"
                name={`email_field_${Math.random()}`}
                autoComplete={isRegistering ? "off" : "email"}
                className={`block w-full pl-12 pr-4 py-3.5 bg-surface/50 border ${emailError ? 'border-red-500' : 'border-slate-700'} rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600`}
                placeholder="Seu E-mail"
                required
                value={email}
                onChange={handleEmailChange}
                onBlur={handleStrictBlur}
              />
            </div>
            {emailError && <p className="text-xs text-red-500 ml-2">{emailError}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                <Lock size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                name="password_field_no_autofill"
                autoComplete={isRegistering ? "new-password" : "current-password"}
                className="block w-full pl-12 pr-12 py-3.5 bg-surface/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleStrictBlur}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {isRegistering && (
            <div className="space-y-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock size={20} />
                </div>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password_field_no_autofill"
                  autoComplete="new-password"
                  className="block w-full pl-12 pr-12 py-3.5 bg-surface/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder:text-slate-600"
                  placeholder="Confirmar Senha"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleStrictBlur}
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {!isRegistering && (
            <div className="flex justify-end">
               <button type="button" className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading || !!emailError}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl shadow-lg shadow-primary/25 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {isLoading ? (
               <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegistering ? 'Cadastrar' : 'Entrar no Sistema'}</span>
                {isRegistering ? <UserPlus size={20} /> : <LogIn size={20} />}
              </>
            )}
          </button>
        </form>

        {/* Footer Section */}
        <div className="mt-8 space-y-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background-dark px-4 text-slate-500">
                {isRegistering ? 'Já possui conta?' : 'Ou acesse com biometria'}
              </span>
            </div>
          </div>

          {isRegistering ? (
            <div className="flex justify-center">
              <button 
                onClick={() => {
                  setIsRegistering(false);
                  setEmailError('');
                }}
                className="text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
              >
                Entrar
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-4">
                <button className="group p-4 rounded-3xl bg-surface/30 border border-slate-800 hover:bg-surface hover:border-slate-700 transition-all flex flex-col items-center min-w-[100px]">
                  <Fingerprint size={32} className="text-slate-500 group-hover:text-primary mb-2 transition-colors" />
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-wider">Face ID</span>
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <span className="text-slate-500 text-sm">Não tem conta? </span>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className="ml-1 text-primary hover:text-primary-dark font-semibold text-sm transition-colors"
                >
                  Registrar-se
                </button>
              </div>
            </>
          )}

          <div className="text-center pb-4 md:pb-0 pt-4 border-t border-slate-800/50">
            <p className="text-xs text-slate-600 flex items-center justify-center gap-1">
              Desenvolvido por <span className="font-bold text-slate-500">CKDEV DESENVOLVIMENTOS</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;