import React, { useState } from 'react';
import { Send, Settings, Copy, Download } from 'lucide-react';

export const Playground: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState('general');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const presets = [
    { id: 'general', name: '일반 대화' },
    { id: 'coding', name: '코딩' },
    { id: 'translation', name: '한-영 번역' },
    { id: 'caption', name: '이미지 캡션' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(`안녕하세요! "${prompt}"에 대한 응답입니다. 이는 시뮬레이션된 답변입니다.`);
      setLoading(false);
    }, 2000);
  };

  const exportToCurl = () => {
    const curlCommand = `curl -X POST "https://api.modelhub.ai/v1/chat/completions" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-4-turbo",
    "messages": [{"role": "user", "content": "${prompt}"}],
    "temperature": ${temperature},
    "max_tokens": ${maxTokens}
  }'`;
    
    navigator.clipboard.writeText(curlCommand);
  };

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {presets.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button className="text-sm text-blue-600 hover:text-blue-700">저장</button>
            <button className="text-sm text-blue-600 hover:text-blue-700">공유</button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto">
            {response && (
              <div className="mb-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-blue-600 font-medium mb-2">사용자</div>
                  <p className="text-gray-900">{prompt}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600 font-medium mb-2">GPT-4 Turbo</div>
                  <p className="text-gray-900">{response}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <div className="flex-1">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="메시지를 입력하세요..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>{loading ? '생성 중...' : '전송'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Settings Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">설정</h3>

          {/* Basic Settings */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                모델
              </label>
              <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>GPT-4 Turbo</option>
                <option>Claude 3 Opus</option>
                <option>Gemini Pro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최대 토큰: {maxTokens}
              </label>
              <input
                type="range"
                min="100"
                max="4000"
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                온도: {temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                시스템 프롬프트
              </label>
              <textarea
                placeholder="시스템 메시지를 입력하세요..."
                rows={3}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full mt-6 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAdvanced ? '기본 설정만 보기' : '고급 설정 보기'}
          </button>

          {showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top-p: 0.9
                </label>
                <input type="range" min="0" max="1" step="0.1" className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  반복 패널티: 1.1
                </label>
                <input type="range" min="0.5" max="2" step="0.1" className="w-full" />
              </div>
            </div>
          )}

          {/* Cost/Usage Card */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">비용 정보</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>예상 비용:</span>
                <span>$0.02</span>
              </div>
              <div className="flex justify-between">
                <span>이번 세션:</span>
                <span>$0.15</span>
              </div>
              <div className="flex justify-between">
                <span>월 한도:</span>
                <span>$500 / $1000</span>
              </div>
            </div>
          </div>

          {/* Export Panel */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Export</h4>
            <div className="space-y-2">
              <button
                onClick={exportToCurl}
                className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
              >
                cURL로 복사
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
                TypeScript로 복사
              </button>
              <button className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
                Python으로 복사
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};