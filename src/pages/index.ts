export { Home } from './Home/Home';
export { Login } from './Login/Login';
export { Register } from './Register/Register';
export { Profile } from './Profile/Profile';
export { SalaryDetails } from './salary-details/SalaryDetails';
export { CorrectionRequest } from './correction-request/CorrectionRequest';
export { ScheduleManagement } from './schedule-management/ScheduleManagement';
export { NotFound } from './not-found/NotFound';

// 컴포넌트 익스포트
export { LoginForm } from '@/components/Login/LoginForm';
export { RegisterForm } from '@/components/Register/RegisterForm';
export { Header } from '@/components/header/Header';
export { Footer } from '@/components/footer/Footer';
export { Navbar } from '@/components/nav/Navbar';
export { Button } from '@/components/button/Button';
export { Error } from '@/components/error/Error';
export { Loading } from '@/components/loading/Loading';
//export { PrivateRoute } from '@/components/PrivateRoute';
export { useRegister } from '@/hooks/useRegister';

// register 관련 모든 것들을 재익스포트
export * from '@/types/register';
