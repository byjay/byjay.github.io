
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { CAD_DATA } from './data';
import { CADEntry, DetailedGuide, CADGrade } from './types';
import { getGuideForEntry } from './guides';

// --- UI Components ---

const GradeBadge: React.FC<{ grade: 'Standard' | 'Pro' }> = ({ grade }) => (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${
    grade === 'Pro' 
      ? 'bg-amber-100 text-amber-700 border border-amber-200' 
      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
  }`}>
    {grade}
  </span>
);

const FilterTab: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-md' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    {children}
  </button>
);

const EntryRow: React.FC<{ entry: CADEntry }> = ({ entry }) => (
  <Link 
    to={`/detail/${entry.id}`}
    className="flex items-center gap-4 p-4 bg-white border-b border-slate-100 hover:bg-blue-50/50 transition-all group"
  >
    <div className="w-32 shrink-0 mono font-bold text-slate-900 group-hover:text-blue-600 truncate uppercase">
      {entry.name}
    </div>
    <div className="flex-1 text-sm text-slate-500 group-hover:text-slate-700 line-clamp-1">
      {entry.description}
    </div>
    <div className="flex gap-2 items-center">
      <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded">
        {entry.functionGroup}
      </span>
      <GradeBadge grade={entry.grade} />
    </div>
  </Link>
);

// --- Pages ---

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'Function' | 'Alphabet' | 'Grade'>('Function');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [gradeFilter, setGradeFilter] = useState<CADGrade>('All');

  const filteredData = useMemo(() => {
    return CAD_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                            item.description.includes(search);
      const matchesGrade = gradeFilter === 'All' || item.grade === gradeFilter;
      
      let matchesCategory = true;
      if (activeFilter !== 'All') {
        if (viewMode === 'Function') matchesCategory = item.functionGroup === activeFilter;
        if (viewMode === 'Alphabet') matchesCategory = item.alphabet === activeFilter;
        if (viewMode === 'Grade') matchesCategory = item.grade === activeFilter;
      }

      return matchesSearch && matchesGrade && matchesCategory;
    });
  }, [search, viewMode, activeFilter, gradeFilter]);

  const categories = useMemo(() => {
    const sets = {
      Function: Array.from(new Set(CAD_DATA.map(d => d.functionGroup))).sort(),
      Alphabet: Array.from(new Set(CAD_DATA.map(d => d.alphabet))).sort(),
      Grade: ['Standard', 'Pro']
    };
    return ['All', ...sets[viewMode]];
  }, [viewMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter sm:text-6xl mb-4 text-slate-900">ZWCAD LIBRARY</h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">명령어 가이드와 시스템 변수 백과사전</p>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="찾으시는 명령어를 입력하세요..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-lg focus:ring-2 focus:ring-blue-500 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl">
            {(['All', 'Standard', 'Pro'] as CADGrade[]).map(g => (
              <button
                key={g}
                onClick={() => setGradeFilter(g)}
                className={`px-6 py-3 text-sm font-black rounded-xl transition-all ${
                  gradeFilter === g ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-100">
          <div className="flex gap-2">
            {(['Function', 'Alphabet', 'Grade'] as const).map(mode => (
              <FilterTab key={mode} active={viewMode === mode} onClick={() => { setViewMode(mode); setActiveFilter('All'); }}>
                {mode === 'Function' ? '기능별' : mode === 'Alphabet' ? '가나다순' : '라이선스'}
              </FilterTab>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black transition-all border whitespace-nowrap ${
                  activeFilter === cat 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest">Database Explorer</span>
          <span className="text-xs font-medium opacity-70">{filteredData.length} Results</span>
        </div>
        <div className="divide-y divide-slate-50">
          {filteredData.map(entry => (
            <EntryRow key={entry.id} entry={entry} />
          ))}
          {filteredData.length === 0 && (
            <div className="py-32 text-center text-slate-400">
              결과가 없습니다. 다른 검색어를 입력해 보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const entry = useMemo(() => CAD_DATA.find(e => e.id === id), [id]);
  const guide = useMemo(() => entry ? getGuideForEntry(entry.id, entry.name, entry.description) : null, [entry]);

  if (!entry || !guide) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-bold text-sm"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        목록으로 돌아가기
      </button>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Detail Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-12 sm:p-20 text-white relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 select-none">
            <span className="text-[12rem] font-black mono uppercase leading-none">{entry.alphabet}</span>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-200">
                {entry.type === 'command' ? 'Command' : 'SysVar'}
              </span>
              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                {entry.grade} Edition
              </span>
              <span className="text-xs text-white/50 font-bold ml-2">{entry.functionGroup}</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl font-black mb-6 mono tracking-tighter uppercase">{entry.name}</h1>
            <p className="text-2xl sm:text-3xl text-white/80 leading-snug font-medium max-w-3xl border-l-4 border-blue-500 pl-8">
              {entry.description}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-12 sm:p-20 space-y-20">
          
          {/* Visual Concept */}
          <section className="bg-slate-50 rounded-[2.5rem] p-8 sm:p-12 border border-slate-200">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center">Visual Concept</h3>
            <div className="flex flex-col items-center">
              <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 max-w-lg w-full text-center">
                <span className="text-slate-600 italic font-medium leading-relaxed block">
                  "{guide.visualDescription}"
                </span>
              </div>
            </div>
          </section>

          {/* Usage */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
              <h3 className="text-xl font-black text-slate-900 uppercase">01. How to use</h3>
            </div>
            <div className="text-xl text-slate-700 leading-relaxed space-y-4">
              {guide.usage.split('\n').map((line, idx) => (
                <p key={idx} className={line.startsWith('#') ? 'font-black text-slate-900 mt-4' : ''}>
                  {line.replace(/### |# /g, '')}
                </p>
              ))}
            </div>
          </section>

          {/* Examples & Tips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="bg-blue-50/30 p-10 rounded-[2.5rem] border border-blue-100">
              <h3 className="text-lg font-black text-blue-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm italic">Ex</span>
                Practice Cases
              </h3>
              <ul className="space-y-6">
                {guide.examples.map((ex, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-slate-700 font-semibold">
                    <span className="text-blue-400 mt-1">•</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-amber-50/30 p-10 rounded-[2.5rem] border border-amber-100">
              <h3 className="text-lg font-black text-amber-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm italic">!</span>
                Expert Tips
              </h3>
              <ul className="space-y-6">
                {guide.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-slate-700 font-semibold">
                    <span className="text-amber-500 mt-1">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Related Links */}
          <section className="pt-12 border-t border-slate-100 text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Related Documentation</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {guide.related.map((rel) => (
                <Link 
                  key={rel} 
                  to={`/detail/${rel}`}
                  className="px-6 py-3 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 rounded-2xl text-xs font-black transition-all text-slate-700"
                >
                  {rel}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50/30">
        <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">ZW</div>
                <span className="text-xl font-black text-slate-900 tracking-tight">MANUAL</span>
              </Link>
              <div className="flex items-center gap-6">
                <Link to="/" className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">Index</Link>
                <a href="https://zwcad.kr" target="_blank" rel="noreferrer" className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest">Support</a>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
          </Routes>
        </main>

        <footer className="py-16 text-center border-t border-slate-100 mt-12 bg-white">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">ZWCAD Global Command Database</p>
        </footer>
      </div>
    </HashRouter>
  );
}
