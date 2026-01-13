import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { fetchDashboardInsights } from '../services/geminiService';

export const AiInsightPanel: React.FC = () => {
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await fetchDashboardInsights();
    setInsight(result);
    setLoading(false);
    setHasLoaded(true);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-1 shadow-lg mb-8">
      <div className="bg-white rounded-[4px] p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
             <div className="p-2 bg-indigo-50 rounded-lg">
                <Sparkles className="w-5 h-5 text-indigo-600" />
             </div>
             <div>
                <h3 className="text-lg font-bold text-slate-900">AI 智能简报</h3>
                <p className="text-xs text-slate-500">由 Gemini 3 Flash 提供支持</p>
             </div>
          </div>
          
          {!hasLoaded ? (
             <button 
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
             >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>生成分析</span>
             </button>
          ) : (
            <button 
                onClick={handleGenerate}
                disabled={loading}
                className="text-indigo-600 hover:text-indigo-800 p-2 rounded-full hover:bg-indigo-50 transition-colors"
             >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
             </button>
          )}
        </div>

        {loading && !insight && (
            <div className="animate-pulse space-y-3 py-4">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
        )}

        {insight && (
            <div className="prose prose-sm prose-indigo max-w-none text-slate-600">
               {/* Simple markdown rendering for the demo */}
               {insight.split('\n').map((line, idx) => {
                   if (line.startsWith('- **')) {
                       // Render bold keys
                       const parts = line.split('**');
                       return <p key={idx} className="mb-2"><strong className="text-slate-800">{parts[1]}</strong>{parts[2]}</p>
                   }
                   if (line.startsWith('##')) return <h4 key={idx} className="text-md font-bold text-slate-900 mt-4 mb-2">{line.replace('##', '')}</h4>;
                   if (line.trim() === '') return null;
                   return <p key={idx} className="mb-1">{line}</p>;
               })}
            </div>
        )}
        
        {!hasLoaded && !loading && (
            <div className="text-center py-6 text-slate-400 text-sm border-2 border-dashed border-slate-100 rounded-lg">
                点击 "生成分析" 获取当前平台核心数据洞察。
            </div>
        )}
      </div>
    </div>
  );
};
