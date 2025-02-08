import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние так, чтобы при следующем рендере показать запасной UI
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Вы можете логировать ошибку и информацию об ошибке в сервис логирования
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Запасной UI, который будет показан при возникновении ошибки
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children
  }
}

export default ErrorBoundary;