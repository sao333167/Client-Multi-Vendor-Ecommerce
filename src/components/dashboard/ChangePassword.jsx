import React from 'react'

export default function ChangePassword() {
  return (
    <div className='p-4 bg-white'>
        <h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
        <form action="" className='flex flex-col gap-4 w-[400px]'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-slate-600 font-medium'>Old Password</label>
                <input type="password" name='old_password' id="old_password" placeholder='Old Password' className='border px-3 py-2 outline-none rounded-md text-slate-600' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-slate-600 font-medium'>New Password</label>
                <input type="password" name='new_password' id="new_password" placeholder='New Password' className='border px-3 py-2 outline-none rounded-md text-slate-600' />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="" className='text-slate-600 font-medium'>Confirm Password</label>
                <input type="password" name='confirm_password' id="confirm_password" placeholder='Confirm Password' className='border px-3 py-2 outline-none rounded-md text-slate-600' />
            </div>
            <div>
                <button className='px-8 py-2 bg-[#059473] shadow-lg hover:shadow-green-500/30 rounded-md text-white'>Update Password</button>
            </div>
        </form>
    </div>
  )
}
