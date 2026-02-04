/* Unicorn Legal Tech Brand
 * - Fraunces Bold for distinctive wordmark and headlines
 * - Rich Navy (#0F172A) + Vibrant Purple (#8B5CF6)
 * - Matching Finch's structure with original content
 * - Billion-dollar brand feel
 */

import React from 'react';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';

// Icons as simple components
const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CheckCircle2 = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Home({ onNavigateContact }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Matching Finch's clean header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Space Grotesk, -apple-system, sans-serif', letterSpacing: '-0.01em' }}>LawBOX</div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">How it Works</a>
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">Services</a>
              <a href="#team" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">About</a>
            </div>
            
            <Button className="bg-purple-600 text-white hover:bg-purple-700 font-semibold" onClick={onNavigateContact}>
              Schedule a Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matching Finch's layout */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
            alt="Modern office" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-purple-200 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trusted by 50+ leading PI firms
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Scale your practice,<br /><span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">eliminate the bottlenecks</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
              LawBOX is the complete AI-powered operations platform for personal injury firms, automating every case from intake through settlement
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-6 font-semibold shadow-xl shadow-purple-500/25" onClick={onNavigateContact}>
                Schedule a Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Social Proof Bar - Matching Finch */}
<section className="py-16 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-purple-200 mb-8 text-sm font-semibold uppercase tracking-widest">Integrates with leading case management platforms</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16">
            <div className="flex items-center justify-center">
                <img src="/images/filevine.png" alt="Filevine" className="w-32 h-auto object-contain brightness-0 invert -mt-2" />
            </div>
            <div className="flex items-center justify-center">
                <img src="/images/smokeball.png" alt="Smokeball" className="w-40 h-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex items-center justify-center">
                <img src="/images/litify.png" alt="Litify" className="w-36 h-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex items-center justify-center">
                <img src="/images/casepeer.png" alt="CASEpeer" className="w-36 h-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex items-center justify-center">
                <img src="/images/mycase.png" alt="MyCase" className="w-36 h-auto object-contain brightness-0 invert" />
            </div>
            <div className="flex items-center justify-center">
                <img src="/images/clio.png" alt="Clio" className="w-28 h-auto object-contain brightness-0 invert" />
            </div>
            </div>
        </div>
        </section>

      {/* Main Value Prop - Matching Finch's image + text layout */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-2">
              <span className="text-purple-900">Human Centric</span>
              <span className="text-purple-900"> + </span>
              <span className="text-purple-900">AI Powere<span className="relative">d<sup className="absolute -top-0 -right-5 text-xs font-normal text-slate-500">TM</sup></span></span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80" 
                alt="Legal team collaboration" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full text-sm font-semibold text-purple-700 mb-6">
                How it Works
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                AI-powered operations team handles your <span className="text-purple-600">entire case lifecycle</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                From the moment a lead comes in to final settlement, LawBOX manages every case for one flat fee. No more hiring, training, or managing case staff.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 font-semibold" onClick={onNavigateContact}>
                  Schedule a Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Matching Finch's detailed breakdown */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white" id="services">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Pre-Litigation, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">made simple</span></h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Transform your operations with AI agents and expert case staff that work around the clock</p>
          </div>

          <div className="space-y-20">
            {/* Intake Section */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Intake that never misses an opportunity</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Never lose a valuable case due to missed calls. Our multilingual specialists are available 24/7 to qualify leads, gather details, and sign clients immediately. Complete intake reports delivered within 30 minutes.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 text-center bg-gradient-to-br from-purple-600 to-purple-800 border-0">
                  <div className="text-5xl font-bold text-white mb-2">99%+</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-purple-200">Answer Rate</div>
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-pink-600 to-pink-800 border-0">
                  <div className="text-5xl font-bold text-white mb-2">87%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-pink-200">Conversion Rate</div>
                </Card>
              </div>
            </div>

            {/* Case Setup Section */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="order-2 md:order-1 grid grid-cols-1 gap-6">
                <Card className="p-8 bg-gradient-to-br from-emerald-600 to-teal-700 border-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="text-5xl font-bold text-white mb-2">12 hours</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-emerald-200 mb-4">Activation Guarantee</div>
                  <p className="text-sm text-emerald-100">From signed retainer to active case management</p>
                </Card>
              </div>
              
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Case activation in record time</h3>
                <p className="text-slate-600 leading-relaxed">
                  Stop waiting days for basic setup. We file insurance claims, secure police reports, and send representation letters within 12 hours. Your case file arrives organized with liability assessment complete and adjuster contacts secured.
                </p>
              </div>
            </div>

            {/* Treatment Coordination */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Treatment management that accelerates recovery</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Keep clients engaged and treatment on track without constant follow-up. We provide weekly client check-ins, coordinate with providers, and secure records, bills, and referrals proactively.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card className="p-6 text-center bg-gradient-to-br from-blue-600 to-indigo-700 border-0">
                  <div className="text-5xl font-bold text-white mb-2">40%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-blue-200">Faster Records</div>
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-violet-600 to-purple-700 border-0">
                  <div className="text-5xl font-bold text-white mb-2">Weekly</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-violet-200">Client Check-ins</div>
                </Card>
              </div>
            </div>

            {/* Demand Packages */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-6">
                <Card className="p-6 text-center bg-gradient-to-br from-amber-500 to-orange-600 border-0">
                  <div className="text-5xl font-bold text-white mb-2">48hrs</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-amber-100">Delivery Standard</div>
                </Card>
                <Card className="p-6 text-center bg-gradient-to-br from-rose-500 to-red-600 border-0">
                  <div className="text-5xl font-bold text-white mb-2">∞</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-rose-100">Revisions Included</div>
                </Card>
              </div>
              
              <div className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4 text-slate-900">Demand packages that maximize settlements</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tell your client's story with maximum impact. LawBOX creates compelling demand packages that follow your exact framework and style, delivered in 48 hours with unlimited revisions included.
                </p>
              </div>
            </div>

            {/* Medical Chronologies */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80" alt="Medical documents" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-purple-400/30 border border-purple-400/50 rounded-full text-purple-200 text-xs font-bold uppercase tracking-wide mb-4">
                  Beta
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Medical chronologies built for litigation</h3>
                <p className="text-purple-200 leading-relaxed max-w-3xl">
                  Transform hundreds of pages into litigation-grade timelines with source-linked documentation. Every treatment phase, procedure, medication, gap, and pre-existing condition clearly identified and referenced.
                </p>
              </div>
            </div>

            {/* Litigation Support */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" alt="Legal documents" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 bg-emerald-400/30 border border-emerald-400/50 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wide mb-4">
                  Beta
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Litigation support that wins cases</h3>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                  Be over-prepared for every phase. We handle discovery requests and responses, coordinate expert witnesses and medical examinations, prepare deposition summaries, and draft mediation position statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* From Lead to Settlement Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              From Lead to Settlement. <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Effortlessly.</span>
            </h2>
          </div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-6 gap-4 relative">
                {/* Connecting Line */}
                <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200"></div>
                
                {/* Step 1: LEADS */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 mb-6">
                    <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">1</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">LEADS</h3>
                </div>

                {/* Step 2: INTAKE */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 mb-6">
                    <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">2</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">INTAKE</h3>
                </div>

                {/* Step 3: SIGNED RETAINER */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-purple-200 mb-6">
                    <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">3</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">SIGNED RETAINER</h3>
                </div>

                {/* Step 4: PRE-LITIGATION */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 mb-6">
                    <svg className="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">4</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">PRE-LITIGATION</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Medical records, Police reports, Chronology, Liability, Damages</p>
                </div>

                {/* Step 5: DEMAND LETTER */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 mb-6">
                    <svg className="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">5</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">DEMAND LETTER</h3>
                </div>

                {/* Step 6: LIEN RESOLUTION */}
                <div className="relative text-center group">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-100 to-white rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 mb-6">
                    <svg className="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">6</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">LIEN RESOLUTION</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">Medicare/Medicaid negotiation, Hospital liens, Settlement distribution</p>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Timeline */}
            <div className="lg:hidden space-y-8">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow-lg border-2 border-purple-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">LEADS</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow-lg border-2 border-purple-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">INTAKE</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-white rounded-2xl shadow-lg border-2 border-purple-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">SIGNED RETAINER</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-lg border-2 border-pink-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">PRE-LITIGATION</h3>
                  <p className="text-sm text-slate-600">Medical records, Police reports, Chronology, Liability, Damages</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-lg border-2 border-pink-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">DEMAND LETTER</h3>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-lg border-2 border-pink-200 flex items-center justify-center">
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">LIEN RESOLUTION</h3>
                  <p className="text-sm text-slate-600">Medicare/Medicaid negotiation, Hospital liens, Settlement distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services Framework Section */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Support Services <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Framework</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Everything your firm needs to scale. Nothing it doesn't.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Fractional Services */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-white hover:shadow-2xl transition-all duration-300 border-purple-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/25">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Fractional Services</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Chief Information Officer (CIO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Chief Operating Officer (COO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Chief Financial Officer (CFO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Chief Marketing Officer (CMO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Chief AI Officer (CAIO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Tax Strategist</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                    <span className="font-medium">Human Resources (HR)</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Litigation Finance */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-50 to-white hover:shadow-2xl transition-all duration-300 border-pink-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-600/25">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Litigation Finance</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    <span className="font-medium">Growth Marketing Loans</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    <span className="font-medium">Pre-Settlement Advance</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    <span className="font-medium">Case Cost Advance</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-pink-600 rounded-full"></div>
                    <span className="font-medium">Medical Funding</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Advisory */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white hover:shadow-2xl transition-all duration-300 border-indigo-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/25">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Advisory</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">Mergers & Acquisitions</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">Management Services Organization (MSO)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">Arizona Alternative Business Structure (ABS)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    <span className="font-medium">AI Hub & Innovation Advisory</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center bg-gradient-to-r from-purple-900 to-indigo-900 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-white relative z-10">
              World-class infrastructure. <span className="text-pink-400">Fractional cost.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Integration Section - Matching Finch */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Seamlessly integrates with <span className="text-purple-600">your existing systems</span></h2>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Works with Filevine, Smokeball, Litify, CASEpeer, and all major case management platforms. Our team integrates directly into your workflows—you maintain your brand while we enhance your operations.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/filevine.png" alt="Filevine" className="max-h-12 max-w-full object-contain" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/smokeball.png" alt="Smokeball" className="max-h-12 max-w-full object-contain" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/litify.png" alt="Litify" className="max-h-12 max-w-full object-contain" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/casepeer.png" alt="CASEpeer" className="max-h-12 max-w-full object-contain" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/mycase.png" alt="MyCase" className="max-h-12 max-w-full object-contain" />
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md flex items-center justify-center h-24">
              <img src="/images/clio.png" alt="Clio" className="max-h-12 max-w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Matching Finch */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white" id="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Built by industry veterans who've managed <span className="text-purple-600">thousands of cases</span></h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              LawBOX's team brings decades of experience from the nation's top personal injury firms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center group hover:shadow-xl transition-shadow overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/0 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-purple-100">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" alt="Jennifer Martinez" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900">Jennifer Martinez</h4>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Operations Director</div>
                <p className="text-sm text-slate-600">
                  Former operations lead at Morgan & Morgan, managing 100+ case staff and implementing scalable pre-litigation systems.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 text-center group hover:shadow-xl transition-shadow overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/0 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-purple-100">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" alt="Robert Chen" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900">Robert Chen</h4>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Lead Paralegal</div>
                <p className="text-sm text-slate-600">
                  15+ years managing high-volume PI cases from intake through settlement, with expertise in both plaintiff and defense work.
                </p>
              </div>
            </Card>
            
            <Card className="p-8 text-center group hover:shadow-xl transition-shadow overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/0 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-purple-100">
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" alt="Sarah Patel" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold mb-2 text-slate-900">Sarah Patel</h4>
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Intake Manager</div>
                <p className="text-sm text-slate-600">
                  Built and led intake operations for a top-10 PI firm, achieving industry-leading conversion rates and client satisfaction.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section - Matching Finch */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Security and transparency you can trust</h2>
            <p className="text-xl text-slate-600">
              The control, compliance, and peace of mind you need to scale confidently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-900">Enterprise-grade security</h4>
              <p className="text-slate-600">
                SOC 2 Type II certified with comprehensive data protection. All client information handled with bank-level security controls.
              </p>
            </Card>
            
            <Card className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-900">Your brand, amplified</h4>
              <p className="text-slate-600">
                LawBOX staff operate as extensions of your firm using your email addresses. Full visibility into every client interaction.
              </p>
            </Card>
            
            <Card className="p-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-slate-900">Trained on excellence</h4>
              <p className="text-slate-600">
                Every team member trained on PI workflows, ethical standards, and confidentiality requirements. Your professional obligations are ours.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA - Matching Finch */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80" alt="Modern office" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-slate-900/95"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Ready to scale <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">without limits?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join leading personal injury firms who've chosen to grow without the operational constraints
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 text-lg px-10 py-7 font-semibold shadow-xl shadow-purple-500/25" onClick={onNavigateContact}>
              Schedule a Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <p className="mt-8 text-purple-200 text-sm">No commitment required • Free consultation • Results guaranteed</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Footer - Matching Finch's structure */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk, -apple-system, sans-serif', letterSpacing: '-0.01em' }}>LawBOX</div>
              <p className="text-sm text-slate-400 mb-6">
                Scale your practice, eliminate the bottlenecks
              </p>
              <div className="flex gap-4">
                <a href="#team" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </a>
                <a href="#team" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Pre-Litigation</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Case Management</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Medical Chronologies</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Litigation Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#team" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#team" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#how-it-works" className="hover:text-purple-400 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#services" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © 2026 LawBOX. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
