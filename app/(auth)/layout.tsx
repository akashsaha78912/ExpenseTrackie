import React from 'react'
interface AuthlayoutProps {
    children: React.ReactNode;
    }

const Authlayout = ({children}:AuthlayoutProps) => {
  return (
    <div className='flex justify-center pt-40'>
      {children}
    </div>
  )
}

export default Authlayout
