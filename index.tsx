import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion } from 'framer-motion';
import './index.css';
import App from './App';

// Animation features load async so framer-motion's bulk stays off the critical
// path. Components use `m as motion`, which renders instantly (unanimated)
// until features arrive — content paints first, motion enhances after.
const loadMotionFeatures = () =>
  import('framer-motion').then((mod) => mod.domAnimation);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LazyMotion features={loadMotionFeatures}>
      <App />
    </LazyMotion>
  </React.StrictMode>
);