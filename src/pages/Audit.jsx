import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  CreditCard, 
  Shield, 
  Download,
  ExternalLink,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const Audit = () => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    user: '',
    eventType: '',
    search: ''
  });
  const [showEventDetail, setShowEventDetail] = useState(null);

  const eventTypes = [
    { value: '', label: '전체' },
    { value: 'session', label: '세션' },
    { value: 'key', label: '키' },
    { value: 'payment', label: '결제' },
    { value: 'policy', label: '정책' }
  ];

  const auditEvents = [
    {
      id: '1',
      timestamp: new Date('2024-01-15T14:30:00'),
      user: '김개발',
      wallet: '0x1234...5678',
      eventType: 'session',
      action: '세션 생성',
      details: { modelId: 'gpt-4-turbo', sessionId: 'sess_123' },
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      txHash: null
    },
    {
      id: '2',
      timestamp: new Date('2024-01-15T14:25:00'),
      user: '이연구',
      wallet: '0x5678...9012',
      eventType: 'payment',
      action: '모델 구매',
      details: { modelId: 'claude-3-opus', amount: 15, currency: 'USDC' },
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0...',
      txHash: '0xabc123...'
    },
    {
      id: '3',
      timestamp: new Date('2024-01-15T14:20:00'),
      user: '박분석',
      wallet: '0x9012...3456',
      eventType: 'key',
      action: 'API 키 생성',
      details: { keyId: 'key_456', permissions: ['read', 'write'] },
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0...',
      txHash: null
    },
    {
      id: '4',
      timestamp: new Date('2024-01-15T14:15:00'),
      user: '관리자',
      wallet: null,
      eventType: 'policy',
      action: '정책 변경',
      details: { policy: 'data_retention', oldValue: 60, newValue: 90 },
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...',
      txHash: null
    }
  ];

  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'session': return User;
      case 'payment': return CreditCard;
      case 'key': return Shield;
      case 'policy': return Shield;
      default: return User;
    }
  };

  const getEventColor = (eventType) => {
    switch (eventType) {
      case 'session': return 'text-blue-600 bg-blue-100';
      case 'payment': return 'text-green-600 bg-green-100';
      case 'key': return 'text-purple-600 bg-purple-100';
      case 'policy': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredEvents = auditEvents.filter(event => {
    if (filters.eventType && event.eventType !== filters.eventType) return false;
    if (filters.user && !event.user.toLowerCase().includes(filters.user.toLowerCase())) return false;
    if (filters.search && !event.action.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">감사 로그</h1>
          <p className="text-gray-600 mt-2">시스템 활동과 보안 이벤트를 추적하세요</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="7d">최근 7일</option>
                <option value="30d">최근 30일</option>
                <option value="90d">최근 90일</option>
                <option value="1y">최근 1년</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사용자</label>
              <input
                type="text"
                value={filters.user}
                onChange={(e) => setFilters({...filters, user: e.target.value})}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                placeholder="사용자 검색"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이벤트 종류</label>
              <select
                value={filters.eventType}
                onChange={(e) => setFilters({...filters, eventType: e.target.value})}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="w-full pl-10 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                  placeholder="액션 검색"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">활동 타임라인</h2>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4" />
              <span>로그 내보내기</span>
            </button>
          </div>

          <div className="space-y-4">
            {filteredEvents.map(event => {
              const EventIcon = getEventIcon(event.eventType);
              const eventColor = getEventColor(event.eventType);
              
              return (
                <div key={event.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`p-2 rounded-full ${eventColor}`}>
                    <EventIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.action}</p>
                        <p className="text-sm text-gray-600">
                          {event.user} {event.wallet && `(${event.wallet})`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">
                          {format(event.timestamp, 'MM/dd HH:mm', { locale: ko })}
                        </p>
                        <button
                          onClick={() => setShowEventDetail(event)}
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span>자세히</span>
                        </button>
                      </div>
                    </div>
                    
                    {event.txHash && (
                      <div className="mt-2">
                        <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700">
                          <ExternalLink className="h-3 w-3" />
                          <span>온체인 확인</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Merkle Root Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">기간별 증빙</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">QmX7Y8Z9...</div>
              <div className="text-sm text-gray-600">1월 머클 루트</div>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                온체인 확인
              </button>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-700">QmA1B2C3...</div>
              <div className="text-sm text-gray-600">12월 머클 루트</div>
              <button className="mt-2 text-xs text-blue-600 hover:text-blue-700">
                온체인 확인
              </button>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <button className="w-full h-full flex flex-col items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors rounded-lg">
                <Download className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">증빙 다운로드</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Drawer */}
      {showEventDetail && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowEventDetail(null)} />
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">이벤트 상세</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">액션</label>
                  <p className="text-sm text-gray-900 mt-1">{showEventDetail.action}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">사용자</label>
                  <p className="text-sm text-gray-900 mt-1">{showEventDetail.user}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">시간</label>
                  <p className="text-sm text-gray-900 mt-1">
                    {format(showEventDetail.timestamp, 'yyyy년 MM월 dd일 HH:mm:ss', { locale: ko })}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">IP 주소</label>
                  <p className="text-sm text-gray-900 mt-1">{showEventDetail.ipAddress}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">세부 정보</label>
                  <pre className="text-xs text-gray-900 mt-1 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(showEventDetail.details, null, 2)}
                  </pre>
                </div>
                
                {showEventDetail.txHash && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">트랜잭션</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs text-gray-900">{showEventDetail.txHash}</code>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};