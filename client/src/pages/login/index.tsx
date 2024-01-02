import LoginForm from '@/components/LoginForm';
import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';

export default function Signup() {
    return <LoginForm />;
}
