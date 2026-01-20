import React, { Component, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RotateCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full py-20 flex items-center justify-center"
          >
            <div className="max-w-md text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                  <AlertCircle size={32} className="text-red-400" />
                </div>
              </div>
              <h3 className="text-xl font-black text-brand-primary mb-3">
                Something went wrong
              </h3>
              <p className="text-brand-secondary text-sm mb-6">
                We encountered an error loading this section. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent text-brand-base font-bold rounded-lg hover:bg-brand-accent/90 transition-colors"
              >
                <RotateCw size={16} />
                Refresh Page
              </button>
            </div>
          </motion.div>
        )
      );
    }

    return this.props.children;
  }
}
