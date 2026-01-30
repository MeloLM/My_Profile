/**
 * ⚠️ Error Boundary Component
 * Cattura errori JS nei componenti figli e mostra un fallback UI
 * 
 * @module components/common/ErrorBoundary
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import logger from '../../utils/logger';

export interface ErrorBoundaryProps {
  children: ReactNode;
  /** UI da mostrare in caso di errore */
  fallback?: ReactNode;
  /** Nome della sezione per logging */
  sectionName?: string;
  /** Callback opzionale chiamato quando si verifica un errore */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Mostra il pulsante "Riprova" */
  showRetry?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static defaultProps = {
    sectionName: 'Component',
    showRetry: true,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { sectionName, onError } = this.props;
    
    // Log errore
    logger.error(`ErrorBoundary caught error in ${sectionName}:`, error);
    logger.error('Component stack:', errorInfo.componentStack);

    this.setState({ errorInfo });

    // Chiama callback se fornito
    if (onError) {
      onError(error, errorInfo);
    }

    // In produzione, potresti inviare a un servizio di error tracking
    // es. Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback, sectionName, showRetry } = this.props;

    if (hasError) {
      // Fallback UI personalizzato
      if (fallback) {
        return fallback;
      }

      // Fallback UI di default
      return (
        <div 
          className="error-boundary-fallback"
          role="alert"
          aria-live="assertive"
          style={{
            padding: '2rem',
            margin: '1rem 0',
            borderRadius: '8px',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            border: '1px solid rgba(220, 53, 69, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ 
            color: '#dc3545', 
            marginBottom: '0.5rem',
            fontSize: '1.25rem',
          }}>
            ⚠️ Something went wrong
          </h3>
          
          <p style={{ 
            color: 'var(--text-secondary, #6c757d)',
            marginBottom: '1rem',
            fontSize: '0.9rem',
          }}>
            {sectionName} failed to load properly.
          </p>

          {process.env.NODE_ENV === 'development' && error && (
            <details style={{ 
              textAlign: 'left', 
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: 'rgba(0,0,0,0.05)',
              borderRadius: '4px',
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details (dev only)
              </summary>
              <pre style={{ 
                fontSize: '0.75rem', 
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}

          {showRetry && (
            <button
              onClick={this.handleRetry}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor: 'var(--primary-color, #0d6efd)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              🔄 Try Again
            </button>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

/**
 * Hook per wrappare componenti in ErrorBoundary programmaticamente
 * (utile per lazy loading)
 */
export const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.FC<P> => {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.displayName = `WithErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithErrorBoundary;
};
