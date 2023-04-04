import React from 'react'

const SearchedUser = (props) => {
  const {profileUrl,username} = props;
  return (
    <div className='profileWrapper hover:bg-[#5c5b5b] px-2 py-3 rounded-sm'>
      <div className='profileContainer flex items-center justify-between cursor-pointer'>

        <div className='flex items-center gap-2 profileDescription'>
          <div>
            <img src={profileUrl} className='w-[45px] h-[45px] rounded-full'/>
          </div>
          <div>
            <p>{username}</p>
          </div>
        </div>
        <div className='profileOptions'>
          <i className='bi bi-box-arrow-up-right text-[.8em]'></i>
        </div>
    
      </div>
    </div>
  )
}

export default SearchedUser
