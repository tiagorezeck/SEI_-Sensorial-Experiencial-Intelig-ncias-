/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { Locale } from '../data/quizData';
import {
  Brain,
  Globe,
  Sparkles,
  BarChart2,
  BookOpen,
  History,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  savedResultsCount: number;
  onSeedSamples?: () => void;
}

export default function Header({ currentView, onNavigate, savedResultsCount, onSeedSamples }: HeaderProps) {
  const { locale, setLocale, t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleNav = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    setModelsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl text-slate-900 tracking-tight font-display">
                  SEI
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                  Brasil
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
                Sensorial · Experiencial · Inteligências
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-indigo-600 bg-indigo-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {t('nav.home')}
            </button>

            {/* Models Dropdown */}
            <div className="relative">
              <button
                onClick={() => setModelsDropdownOpen(!modelsDropdownOpen)}
                onBlur={() => setTimeout(() => setModelsDropdownOpen(false), 200)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentView.startsWith('intro:') || currentView.startsWith('quiz:') || currentView.startsWith('result:')
                    ? 'text-indigo-600 bg-indigo-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>{locale === 'pt' ? 'Pilares SEI' : t('nav.models')}</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {modelsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    onClick={() => handleNav('intro:vark')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50/60 transition-colors flex flex-col"
                  >
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {locale === 'pt' ? 'Pilar S · Canais Sensoriais' : 'Pillar S · Sensory Channels'}
                    </span>
                    <span className="text-xs text-slate-500 pl-3.5">
                      {locale === 'pt' ? 'Visual, Auditivo, Leitura/Escrita e Prática' : 'Visual, Auditory, Read, Kinesthetic'}
                    </span>
                  </button>
                  <button
                    onClick={() => handleNav('intro:kolb')}
                    className="w-full text-left px-4 py-2.5 hover:bg-emerald-50/60 transition-colors flex flex-col"
                  >
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      {locale === 'pt' ? 'Pilar E · Ciclo Experiencial' : 'Pillar E · Experiential Cycle'}
                    </span>
                    <span className="text-xs text-slate-500 pl-3.5">
                      {locale === 'pt' ? 'Sentir, Observar, Pensar e Agir' : 'Experiential Learning Cycles'}
                    </span>
                  </button>
                  <button
                    onClick={() => handleNav('intro:gardner')}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50/60 transition-colors flex flex-col"
                  >
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      {locale === 'pt' ? 'Pilar I · Inteligências Múltiplas' : 'Pillar I · Multiple Intelligences'}
                    </span>
                    <span className="text-xs text-slate-500 pl-3.5">
                      {locale === 'pt' ? 'Mapeamento dos 7 Talentos Cognitivos' : '7 Multiple Intelligences'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNav('comparison')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'comparison'
                  ? 'text-indigo-600 bg-indigo-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>{t('nav.comparison')}</span>
            </button>

            <button
              onClick={() => handleNav('guides')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                currentView === 'guides'
                  ? 'text-indigo-600 bg-indigo-50/70'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{t('nav.guides')}</span>
            </button>

            {/* Saved Results Button */}
            {savedResultsCount > 0 && (
              <button
                onClick={() => handleNav('history')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  currentView === 'history'
                    ? 'text-indigo-600 bg-indigo-50/70'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <History className="w-4 h-4" />
                <span>{t('nav.myResults')}</span>
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                  {savedResultsCount}
                </span>
              </button>
            )}
          </nav>

          {/* Right actions: Language & CTA */}
          <div className="flex items-center gap-2">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                title="Trocar idioma / Change language"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        locale === l.code ? 'font-bold text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </div>
                      {locale === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Load 3 Sample Reports Button */}
            {onSeedSamples && (
              <button
                onClick={onSeedSamples}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors shadow-2xs"
                title={locale === 'pt' ? 'Ver relatórios preenchidos dos 3 pilares SEI' : 'Preview 3 completed test reports'}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{locale === 'pt' ? 'Exemplo Completo SEI' : 'Full SEI Sample'}</span>
              </button>
            )}

            {/* Quick Test CTA */}
            <button
              onClick={() => handleNav('intro:vark')}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-blue-800 shadow-sm shadow-indigo-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === 'pt' ? 'Iniciar Pilar S' : t('nav.startQuiz')}</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNav('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            {t('nav.home')}
          </button>
          <div className="pt-1 pb-1 border-y border-slate-100">
            <p className="px-3 text-xs font-black text-slate-400 uppercase tracking-wider mb-1">
              {locale === 'pt' ? 'Pilares SEI' : t('nav.models')}
            </p>
            <button
              onClick={() => handleNav('intro:vark')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-blue-50 font-medium flex items-center justify-between"
            >
              <span>{locale === 'pt' ? 'Pilar S · Canais Sensoriais' : 'Pillar S · Sensory'}</span>
              <span className="text-xs text-blue-600 font-bold">~2–3 min</span>
            </button>
            <button
              onClick={() => handleNav('intro:kolb')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-emerald-50 font-medium flex items-center justify-between"
            >
              <span>{locale === 'pt' ? 'Pilar E · Ciclo Experiencial' : 'Pillar E · Experiential'}</span>
              <span className="text-xs text-emerald-600 font-bold">~3 min</span>
            </button>
            <button
              onClick={() => handleNav('intro:gardner')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-purple-50 font-medium flex items-center justify-between"
            >
              <span>{locale === 'pt' ? 'Pilar I · Inteligências Múltiplas' : 'Pillar I · Intelligences'}</span>
              <span className="text-xs text-purple-600 font-bold">~4–5 min</span>
            </button>
          </div>
          <button
            onClick={() => handleNav('comparison')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            {t('nav.comparison')}
          </button>
          <button
            onClick={() => handleNav('guides')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            {t('nav.guides')}
          </button>
          {onSeedSamples && (
            <button
              onClick={() => {
                onSeedSamples();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>{locale === 'pt' ? 'Ver Exemplos dos 3 Pilares SEI' : 'View Full SEI Sample Reports'}</span>
            </button>
          )}
          {savedResultsCount > 0 && (
            <button
              onClick={() => handleNav('history')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-700 bg-indigo-50 flex items-center justify-between"
            >
              <span>{t('nav.myResults')}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-200">
                {savedResultsCount}
              </span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
