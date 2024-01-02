import { authenticate } from '@/utils/authenticate';
import { GetServerSideProps } from 'next';
import SignupForm from '../../components/SignupForm';

export default function Signup() {
    return <SignupForm />;
}
