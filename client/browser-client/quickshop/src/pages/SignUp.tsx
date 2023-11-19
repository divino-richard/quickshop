import React, { FormEvent, useEffect } from 'react'
import Input from '../components/general/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

interface Props {}

function SignUp(props: Props) {
    const {} = props

    // const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.authentication);
    const navigate = useNavigate();

    useEffect(() => {
        if (authState.session.token) {
            navigate('/');
        }
    }, [navigate, authState.session.token]);

    const  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert();
    }
    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form className="w-72 flex flex-col" onSubmit={handleSubmit}>
                <h1 className='font-bold font-xl text-gray-600'>Sign In Account:</h1>
                <Input placeholder='firstname'/>
                <Input placeholder='lastname'/>
                <Input placeholder='email'/>
                <Input placeholder='password'/>
                <Input placeholder='confirm password'/>
                <input 
                    type='submit'
                    className="text-center bg-rose-500 text-white p-2 rounded-md font-semibold mt-5  cursor-pointer" 
                    value='SignUp'
                />
            </form>
        </div>
    )
}

export default SignUp