/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { Brain, Shield, FileText, Mail, Sparkles, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { locale, t } = useLocale();

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                SEI
              </div>
              <span className="font-extrabold text-base text-slate-900 tracking-tight">
                Metodologia SEI Brasil
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              {locale === 'pt'
                ? 'Plataforma educacional para descoberta do perfil de aprendizagem através dos 3 pilares da Metodologia SEI: Pilar S (Canais Sensoriais), Pilar E (Ciclo Experiencial) e Pilar I (Inteligências Múltiplas).'
                : 'Educational platform for learning profile discovery through the 3 pillars of SEI: Pillar S (Sensory), Pillar E (Experiential), and Pillar I (Multiple Intelligences).'}
            </p>
            <div className="p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-[11px] text-amber-900 leading-relaxed">
              <span className="font-bold">
                {locale === 'pt' ? 'Aviso Educativo: ' : 'Educational Disclaimer: '}
              </span>
              {locale === 'pt'
                ? 'Os resultados fornecidos destinam-se exclusivamente ao autoconhecimento e aprimoramento pedagógico. Não constituem diagnóstico médico, psicológico ou neurodivergente.'
                : 'Results are provided for self-reflection and study improvement purposes only. Not a medical or psychological diagnosis.'}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {locale === 'pt' ? 'Os 3 Pilares SEI' : 'The 3 SEI Pillars'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('intro:vark')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {locale === 'pt' ? 'Pilar S — Canais Sensoriais' : 'Pillar S — Sensory Modalities'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intro:kolb')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {locale === 'pt' ? 'Pilar E — Ciclo Experiencial' : 'Pillar E — Experiential Cycle'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('intro:gardner')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {locale === 'pt' ? 'Pilar I — Inteligências Múltiplas' : 'Pillar I — Multiple Intelligences'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('comparison')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {locale === 'pt' ? 'Matriz Integrada SEI (360°)' : 'SEI 360° Matrix'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guides')}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {locale === 'pt' ? 'Guia Metodológico e História' : 'Theoretical Guides & History'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              {locale === 'pt' ? 'Transparência & Contato' : 'Legal & Contact'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 opacity-70" />
                  <span>{t('footer.privacy')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>{t('footer.terms')}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 opacity-70" />
                  <span>{t('footer.contact')}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4 text-xs">
            <span>{locale === 'pt' ? 'Adaptado e localizado para o Brasil' : 'Adapted & localized for Brazil'}</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">100% Gratuito & Sem Cadastro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
