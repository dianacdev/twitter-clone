import axios from 'axios';
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback,useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import useRegisterModal from '@/hooks/useRegisterModal';
import LoginModal from './LoginModal';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() =>{
        if(isLoading){
            return;
        }
        registerModal.onClose();
        loginModal.onOpen();
    },[isLoading, registerModal,loginModal])

    const onSubmit = useCallback(async() => {
        try{
            setIsLoading(true);

            await axios.post('/api/register',{
                email,
                password,
                username,
                name
            })

            registerModal.onClose();
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
      },[registerModal, email, password,username,name]
      )

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} disabled={isLoading}/>
            <Input placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name} disabled={isLoading}/>
            <Input placeholder='Username' onChange={(e)=>setUsername(e.target.value)} value={username} disabled={isLoading}/>
            <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)} value={password} disabled={isLoading}/>
        </div>
    )
    
    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account? </p>
            <span onClick={onToggle} className='text-white cursor-pointer hover:underline '>Sign In</span>
        </div>
    )

  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal