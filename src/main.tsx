// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();
// QueryClient це об’єкт, який містить конфігурацію й управління запитами та кешуванням даних.
// QueryClientProvider надає всі можливості React Query для компонентів всередині нього, дозволяючи працювати з асинхронними запитами, кешем і відслідковувати їхній стан.

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
