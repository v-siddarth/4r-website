/* eslint-disable no-unused-vars */
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

function Header() {
    const {user,isSignedIn}=useUser();
  return (
    <div className='flex justify-between items-center shadow-sm p-3 pr-3'>
        <Link to={'/'}>
            <img src='/logo.png' width={150} height={100} />
        </Link>
        <ul className='hidden  md:flex gap-16'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link to={'/'}>Home</Link></li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link to={'/search'}>Search</Link></li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'><Link to={'/contact'}>Contact</Link></li>
        </ul>

        {isSignedIn?
            <div className='flex items-center gap-5'>
                <UserButton/>
                <Link to={'/profile'}>
                    <Button>Sell Waste</Button>
                </Link>
            </div>
            :
            <SignInButton mode="modal" fallbackRedirectUrl='/profile'>
            <Button>Sell Waste</Button>
            </SignInButton>
        }

    </div>
  )
}

export default Header