import React from 'react'

const Comment = (props) => {
    const {username,postDesc,profileImage,userId,id} = props;
    
  return (
    <div className='flex gap-2 p-2'>
        <div className='font-Karla flex font-medium flex-col items-center justify-center gap-1 cursor-pointer'>
            <img className='w-[45px] h-[45px] rounded-full object-cover' alt='profile' src={profileImage}/>
            <p>{username}</p>
            {userId===id && <span className='text-gray-400 text-center'>(you)</span>}
        </div>
      <p className='font-Open'>{postDesc}</p>
    </div>
  )
}

export default Comment
