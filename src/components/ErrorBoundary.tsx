import React from 'react';
import { ErrorTypography } from './CurrentTabGuard';

export class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true,
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorTypography text="Что-то пошло не так." />;
        }

        return this.props.children;
    }
}
