import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Top-level error boundary. Catches render-time errors anywhere in the tree
 * so a single bad component doesn't blank the entire page.
 *
 * Logs the error to the console so it stays visible during development, and
 * shows a small inline notice to the user with a reload button.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary] Caught render error:', error, info);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="min-h-screen flex items-center justify-center p-6 bg-paper"
        >
          <div className="max-w-md text-center">
            <p className="eyebrow text-ink-500 mb-3 inline-flex">
              <span className="num text-accent">!</span>
              <span className="dash" />
              <span>Error</span>
            </p>
            <h1 className="h1 text-navy-900 mb-4">Algo salió mal.</h1>
            <p className="body text-ink-500 mb-6">
              Recargá la página para intentarlo de nuevo. Si el problema
              persiste, contactanos por WhatsApp.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="btn btn-primary"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
