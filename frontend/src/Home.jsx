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

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Matching Finch's clean header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Fraunces, serif' }}>LawBOX</div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">How it Works</a>
              <a href="#services" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">Services</a>
              <a href="#team" className="text-sm font-medium text-slate-600 hover:text-purple-600 transition-colors">About</a>
            </div>
            
            <Button className="bg-purple-600 text-white hover:bg-purple-700 font-semibold">
              Schedule a Call
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Matching Finch's layout */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-white" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-slate-900">
              Scale your practice,<br />eliminate the bottlenecks
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              LawBOX is the complete AI-powered operations platform for personal injury firms, automating every case from intake through settlement
            </p>
            
            <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-8 py-6 font-semibold">
              Schedule a Call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof Bar - Matching Finch */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-slate-500 mb-8 text-sm font-semibold uppercase tracking-wide">Elite personal injury firms trust LawBOX to power their growth</p>
          <div className="text-center text-slate-600 text-sm">
            Handle more cases, settle faster, and scale without adding staff
          </div>
        </div>
      </section>

      {/* Main Value Prop - Matching Finch's image + text layout */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-slate-100 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚖️</div>
                <p className="text-slate-500">Modern legal office</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                AI-powered operations team handles your entire case lifecycle
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                LawBOX manages every case for one flat fee
              </p>
              <Button variant="outline" className="font-semibold">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Matching Finch's detailed breakdown */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Pre-Litigation, made simple</h2>
            <p className="text-xl text-slate-600">Transform your operations with AI agents and expert case staff</p>
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
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">99%+</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Answer Rate</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">87%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Conversion Rate</div>
                </Card>
              </div>
            </div>

            {/* Case Setup Section */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="order-2 md:order-1 grid grid-cols-1 gap-6">
                <Card className="p-6">
                  <div className="text-5xl font-bold text-purple-600 mb-2">12 hours</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">Activation Guarantee</div>
                  <p className="text-sm text-slate-600">From signed retainer to active case management</p>
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
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">40%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Faster Records</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">Weekly</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Client Check-ins</div>
                </Card>
              </div>
            </div>

            {/* Demand Packages */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div className="order-2 md:order-1 grid grid-cols-2 gap-6">
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">48hrs</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Delivery Standard</div>
                </Card>
                <Card className="p-6 text-center">
                  <div className="text-5xl font-bold text-purple-600 mb-2">∞</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">Revisions Included</div>
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
            <div className="bg-purple-50 rounded-2xl p-8 md:p-12">
              <div className="inline-block px-3 py-1 bg-purple-200 rounded-full text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
                Beta
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Medical chronologies built for litigation</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Transform hundreds of pages into litigation-grade timelines with source-linked documentation. Every treatment phase, procedure, medication, gap, and pre-existing condition clearly identified and referenced.
              </p>
            </div>

            {/* Litigation Support */}
            <div className="bg-purple-50 rounded-2xl p-8 md:p-12">
              <div className="inline-block px-3 py-1 bg-purple-200 rounded-full text-purple-700 text-xs font-bold uppercase tracking-wide mb-4">
                Beta
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">Litigation support that wins cases</h3>
              <p className="text-slate-600 leading-relaxed max-w-3xl">
                Be over-prepared for every phase. We handle discovery requests and responses, coordinate expert witnesses and medical examinations, prepare deposition summaries, and draft mediation position statements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section - Matching Finch */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Seamlessly integrates with your existing systems</h2>
          <p className="text-lg text-slate-600 mb-12 leading-relaxed">
            Works with Filevine, Smokeball, Litify, CASEpeer, and all major case management platforms. Our team integrates directly into your workflows—you maintain your brand while we enhance your operations.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Filevine', 'Smokeball', 'Litify', 'CASEpeer', 'MyCase', 'Clio'].map((name) => (
              <div key={name} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Matching Finch */}
      <section className="py-24 bg-slate-50" id="team">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Built by industry veterans who've managed thousands of cases</h2>
            <p className="text-xl text-slate-600">
              LawBOX's team brings decades of experience from the nation's top personal injury firms
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-3xl font-bold text-purple-600">JM</div>
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Jennifer Martinez</h4>
              <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Operations Director</div>
              <p className="text-sm text-slate-600">
                Former operations lead at Morgan & Morgan, managing 100+ case staff and implementing scalable pre-litigation systems.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-3xl font-bold text-purple-600">RC</div>
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Robert Chen</h4>
              <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Lead Paralegal</div>
              <p className="text-sm text-slate-600">
                15+ years managing high-volume PI cases from intake through settlement, with expertise in both plaintiff and defense work.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="text-3xl font-bold text-purple-600">SP</div>
              </div>
              <h4 className="text-xl font-bold mb-2 text-slate-900">Sarah Patel</h4>
              <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide mb-3">Intake Manager</div>
              <p className="text-sm text-slate-600">
                Built and led intake operations for a top-10 PI firm, achieving industry-leading conversion rates and client satisfaction.
              </p>
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
      <section className="py-32 bg-gradient-to-br from-purple-100 via-purple-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Ready to scale without limits?
          </h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Join leading personal injury firms who've chosen to grow without the operational constraints
          </p>
          
          <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-10 py-7 font-semibold">
            Schedule a Call
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer - Matching Finch's structure */}
      <footer className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Fraunces, serif' }}>LawBOX</div>
              <p className="text-sm text-slate-600">
                Scale your practice, eliminate the bottlenecks
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-slate-900">Services</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Pre-Litigation</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Case Management</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Medical Chronologies</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Litigation Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-slate-900">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-slate-900">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
            © 2026 LawBOX. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
