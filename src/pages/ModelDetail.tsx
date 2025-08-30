import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Download, 
  ExternalLink, 
  ChevronDown,
  Play,
  ShoppingCart
} from 'lucide-react';

export const ModelDetail: React.FC = () => {
  const { id } = useParams();
  const [selectedVersion, setSelectedVersion] = useState('1.0.0');
  const [selectedPlan, setSelectedPlan] = useState('standard');

  // Mock data
  const model = {
    id,
    name: 'GPT-4 Turbo',
    creator: 'OpenAI',
    versions: ['1.0.0', '0.9.2', '0.9.1'],
    description: '최신 언어 모델로 뛰어난 추론 능력과 다양한 작업 수행이 가능합니다.',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    metrics: { mmlu: 87, hellaswag: 92, arc: 85, truthfulqa: 78 },
    pricing: {
      plans: [
        { id: 'research', name: '연구용', price: 0, rights: ['학술연구', '비상업적'] },
        { id: 'standard', name: '표준', price: 20, rights: ['상업적', 'API 액세스'] },
        { id: 'enterprise', name: '엔터프라이즈', price: 100, rights: ['온프렘', '커스텀'] }
      ]
    }
  };

  const sections = [
    { id: 'overview', name: '개요' },
    { id: 'pricing', name: '가격/라이선스' },
    { id: 'performance', name: '성능' },
    { id: 'provenance', name: '계보' },
    { id: 'integrity', name: '저장/무결성' },
    { id: 'reviews', name: '후기' }
  ];

  return (
    <div className="flex-1">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={model.thumbnail} 
              alt={model.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
              <p className="text-lg text-gray-600">by {model.creator}</p>
            </div>
            <div className="relative">
              <select
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {model.versions.map(version => (
                  <option key={version} value={version}>{version}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/playground?model=${id}`}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Play className="h-4 w-4" />
              <span>체험</span>
            </Link>
            <Link
              to={`/checkout/${id}?plan=${selectedPlan}`}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>구매</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <nav className="flex space-x-8">
          {sections.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 py-2 border-b-2 border-transparent hover:border-blue-300 transition-colors"
            >
              {section.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex">
        <div className="flex-1 p-6">
          {/* Overview Section */}
          <section id="overview" className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">모델 개요</h2>
                <p className="text-gray-700 mb-6">{model.description}</p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">샘플 출력</h3>
                  <div className="bg-white rounded-md p-4 border">
                    <p className="text-gray-700 italic">
                      "안녕하세요! 저는 GPT-4 Turbo입니다. 다양한 질문에 도움을 드릴 수 있습니다."
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">릴리스 노트</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 향상된 추론 능력</li>
                    <li>• 더 빠른 응답 속도</li>
                    <li>• 한국어 지원 개선</li>
                  </ul>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">가격 플랜</h3>
                <div className="space-y-3">
                  {model.pricing.plans.map(plan => (
                    <label key={plan.id} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={selectedPlan === plan.id}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{plan.name}</div>
                        <div className="text-sm text-gray-600">
                          {plan.price === 0 ? '무료' : `$${plan.price} USDC`}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {plan.rights.map(right => (
                            <span key={right} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {right}
                            </span>
                          ))}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600 mb-3">예상 비용</div>
                  <div className="text-lg font-bold text-gray-900">
                    ${model.pricing.plans.find(p => p.id === selectedPlan)?.price || 0} USDC
                  </div>
                </div>

                <Link
                  to={`/checkout/${id}?plan=${selectedPlan}`}
                  className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
                >
                  구매로 이동
                </Link>
              </div>
            </div>
          </section>

          {/* Performance Section */}
          <section id="performance" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">성능 지표</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(model.metrics).slice(0, 3).map(([metric, value]) => (
                <div key={metric} className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{value}%</div>
                  <div className="text-sm font-medium text-gray-600 uppercase">{metric}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">후기</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-bold text-gray-900">4.8</span>
                  <span className="text-gray-600">(124 후기)</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">개발자123</span>
                    <span className="text-sm text-gray-500">3일 전</span>
                  </div>
                  <p className="text-gray-700">매우 뛰어난 성능입니다. 한국어 처리가 특히 인상적이네요.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};