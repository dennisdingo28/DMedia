import React from 'react'

const Profile = (props) => {
    const {user,setUser,token} = props;
    console.log(user);


    const createdAt = new Date(user.createdAt);

    const day = createdAt.getDate();
    const month = createdAt.toLocaleString('default',{month:"numeric"});
    const year = createdAt.getFullYear();

  return (
    <div className='min-h-screen bg-dark'>
        <div className='profilePageWrapper parent-container text-white'>
            
            <div className='profilePageLeftSide pt-3'>
                <div className='flex flex-col items-center justify-center'>
                    <img src={user.profileUrl} className='w-[220px] h-[220px] rounded-full xs:w-[270px] xs:h-[270px]' alt='profile'/>
                    <h1 className='font-medium font-Open text-[1.3em]'>{user.username}</h1>
                </div>
                <div className='profileRatingContainer flex items-center justify-between'>
                    <div className='closersContainer flex flex-col gap-1 justify-center items-center'>
                        <i className='bi bi-people-fill'></i>
                        <p>150</p>
                    </div>
                    <div className='starUpContainer flex flex-col gap-1 justify-center items-center'>
                        <i className='bi bi-star-fill'></i>
                        <p>{user.totalLikes}</p>
                    </div>
                    <div className='dislikeContainer flex flex-col gap-1 justify-center items-center'>
                        <i className='bi bi-hand-thumbs-down-fill'></i>
                        <p>{user.totalDislikes}</p>
                    </div>
                    <div className='totalPostsContainer flex flex-col gap-1 justify-center items-center'>
                        <i className='bi bi-chat-left-text-fill'></i>
                        <p>{user.posts.length}</p>
                    </div>
                    <div className='shareContainer flex flex-col gap-1 justify-center items-center'>
                        <i className='bi bi-share-fill'></i>
                        <p>{user.totalShares}</p>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
  )
}

export default Profile