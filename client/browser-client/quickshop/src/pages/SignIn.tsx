import React, { ChangeEvent, FormEvent, useState } from 'react'
import Input from '../components/general/Input'
import { loginUser } from '../services/auth';
import {AxiosError} from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { userAuthenticated } from '../redux/slice/auth/auth.slice';
import { UserSession } from '../types/userTypes';
import { useRedirectUser } from '../hook/user.hook';

function SignIn() {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.authentication);
    const {data} = authState.session;
    useRedirectUser(data?.role);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        loginUser({email, password})
            .then((response) => {
                const session: UserSession = {
                    data: response.data.user,
                    token: response.data.token
                };
                dispatch(userAuthenticated(session));
                localStorage.setItem('user', JSON.stringify(session));
            })  
            .catch((error) => {
                if (error instanceof AxiosError) {
                    const errorMsg: string = error.response?.data.error.message;
                    return setError(errorMsg);
                }
                setError('Something went wrong. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
       <div className='flex items-center justify-center min-h-screen'>
            <form method="post" className="w-72 flex flex-col" onSubmit={handleSubmit}>
                <h1 className='mb-2 font-bold font-xl text-gray-600'>Sign In Account:</h1>
                <p className='text-red-500'>{error}</p>
                <Input 
                    placeholder='email' 
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                />
                <Input
                    type="password"
                    placeholder='password'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                />
                <input
                    disabled={loading ? true : false}
                    type='submit'
                    className={`text-center bg-rose-500 text-white p-2 rounded-md font-semibold mt-5  ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                    value={loading ? 'Please wait...' : 'SignIn'}
                />
            </form>
        </div>
    )
}

export default SignIn
