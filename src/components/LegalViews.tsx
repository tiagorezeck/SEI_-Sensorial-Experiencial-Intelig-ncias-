/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { Shield, FileText, Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

interface LegalViewProps {
  view: 'privacy' | 'terms' | 'contact';
  onBack: () => void;
}

export default function LegalViews({ view, onBack }: LegalViewProps) {
  const { locale, t } = useLocale();

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-in fade-in duration-300">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6 py-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{locale === 'pt' ? 'Voltar ao Início' : 'Back to Home'}</span>
      </button>

      {/* PRIVACY POLICY */}
      {view === 'privacy' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {locale === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
              </h1>
              <span className="text-xs text-slate-400">
                {locale === 'pt' ? 'Última atualização: Outubro de 2026' : 'Last updated: October 2026'}
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              {locale === 'pt'
                ? 'O LearnerType Brasil foi construído com respeito irrestrito à sua privacidade. Acreditamos que ferramentas de autoconhecimento não devem coletar dados pessoais desnecessários nem rastrear indivíduos.'
                : 'LearnerType values your privacy. We believe self-reflection tools should function without intrusive data tracking.'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '1. Armazenamento Local no seu Navegador' : '1. Local Storage Only'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'Todas as suas respostas aos questionários (VARK, Kolb e Gardner) e seus relatórios de resultados são processados de forma determinística e salvos exclusivamente no armazenamento local (localStorage) do seu próprio dispositivo. Nenhuma resposta é enviada para servidores remotos.'
                : 'All responses and score calculations run client-side in your browser. No personal quiz answers are stored on external servers.'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '2. Preferências de Idioma' : '2. Language Preferences'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'Guardamos apenas sua escolha de idioma (Português, Inglês ou Coreano) no localStorage para manter a interface consistente nas suas próximas visitas.'
                : 'Your language choice is saved locally to ensure a seamless experience on return visits.'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '3. Sem Cadastro ou Login Obrigatório' : '3. No Mandatory Registration'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'Você pode utilizar todos os recursos, responder a todos os testes e exportar seus resultados livremente, sem necessidade de fornecer e-mail, criar senhas ou vincular redes sociais.'
                : 'All assessments and features are freely accessible without accounts or passwords.'}
            </p>
          </div>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {view === 'terms' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {locale === 'pt' ? 'Termos de Uso' : 'Terms of Service'}
              </h1>
              <span className="text-xs text-slate-400">
                {locale === 'pt' ? 'Vigência: 2026' : 'Effective: 2026'}
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>
              {locale === 'pt'
                ? 'Bem-vindo ao LearnerType Brasil. Ao acessar e utilizar este aplicativo web, você concorda com os seguintes termos de uso:'
                : 'Welcome to LearnerType. By accessing this platform, you agree to these terms:'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '1. Natureza Educacional' : '1. Educational Purpose'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'Os instrumentos disponibilizados são versões adaptadas para fins pedagógicos de autorreflexão. Os resultados gerados têm caráter estritamente informativo e não substituem avaliações psicológicas, psiquiátricas, psicopedagógicas ou diagnósticos clínicos formais.'
                : 'All quizzes are educational approximations designed for self-reflection. They do not constitute formal medical or psychological diagnosis.'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '2. Propriedade Intelectual e Reconhecimento' : '2. Intellectual Attribution'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'O modelo VARK é atribuído a Neil Fleming. O modelo de Aprendizagem Experiencial é atribuído a David A. Kolb. A Teoria das Inteligências Múltiplas é atribuída a Howard Gardner. Esta aplicação independente homenageia e referencia esses trabalhos para promoção da educação aberta.'
                : 'VARK is attributed to Neil Fleming, experiential learning to David Kolb, and multiple intelligences to Howard Gardner.'}
            </p>

            <h3 className="text-base font-bold text-slate-900 pt-2">
              {locale === 'pt' ? '3. Uso Gratuito e Não Comercial' : '3. Free Access'}
            </h3>
            <p>
              {locale === 'pt'
                ? 'O LearnerType Brasil é um recurso aberto, destinado a estudantes, professores, pesquisadores e qualquer indivíduo em busca de autoconhecimento.'
                : 'This platform is provided as an open educational resource.'}
            </p>
          </div>
        </div>
      )}

      {/* CONTACT & FEEDBACK */}
      {view === 'contact' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {locale === 'pt' ? 'Contato & Feedback' : 'Contact & Feedback'}
              </h1>
              <span className="text-xs text-slate-400">
                {locale === 'pt' ? 'Envie suas dúvidas, sugestões ou relatos pedagógicos' : 'Send your feedback or pedagogical questions'}
              </span>
            </div>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-black text-emerald-950">
                {locale === 'pt' ? 'Mensagem Recebida!' : 'Feedback Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                {locale === 'pt'
                  ? 'Muito obrigado pelo seu relato! Seu feedback nos ajuda a aprimorar as traduções e recursos do LearnerType Brasil.'
                  : 'Thank you for your message! Your input helps refine LearnerType.'}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                {locale === 'pt' ? 'Enviar outra mensagem' : 'Send another message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {locale === 'pt' ? 'Seu Nome (opcional)' : 'Your Name (optional)'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={locale === 'pt' ? 'Ex: Marina Silva' : 'e.g. Alex'}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {locale === 'pt' ? 'Seu E-mail (opcional, para resposta)' : 'Your Email (optional)'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {locale === 'pt' ? 'Mensagem ou Sugestão *' : 'Message or Feedback *'}
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    locale === 'pt'
                      ? 'Compartilhe sua experiência com o teste, dúvidas conceituais ou melhorias de tradução...'
                      : 'Share your questions or suggestions...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>{locale === 'pt' ? 'Enviar Mensagem' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
