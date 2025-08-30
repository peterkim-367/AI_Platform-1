import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Market } from './pages/Market';
import { ModelDetail } from './pages/ModelDetail';
import { Playground } from './pages/Playground';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Market />} />
          <Route path="/models" element={<Market />} />
          <Route path="/model/:id" element={<ModelDetail />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/finetune" element={<div className="p-6"><h1 className="text-2xl font-bold">파인튜닝</h1><p>개발 중입니다</p></div>} />
          <Route path="/billing" element={<div className="p-6"><h1 className="text-2xl font-bold">사용량/청구</h1><p>개발 중입니다</p></div>} />
          <Route path="/organization" element={<div className="p-6"><h1 className="text-2xl font-bold">조직</h1><p>개발 중입니다</p></div>} />
          <Route path="/audit" element={<div className="p-6"><h1 className="text-2xl font-bold">감사</h1><p>개발 중입니다</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;