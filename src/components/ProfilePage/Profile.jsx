import React from 'react'

const Profile = (props) => {
    const {user,setUser,token} = props;
  return (
    <div className='min-h-screen bg-dark'>
        <div className='profilePageWrapper parent-container text-white'>
           <div className='profilePageContainer pt-3'>
                <h1 className='font-bold text-[1.4em] capitalize'>Manage Your Profile</h1>
                <div className="profilePageBody mt-5 flex flex-col justify-center rounded-sm p-3 bg-[#131212]">
                    <div className='profileInformations flex flex-col items-center justify-center'>
                        <img src={user.profileUrl} className='w-[230px] h-[230px] rounded-full xs:w-[300px] xs:h-[300px]'/>
                        <h2 className='font-medium font-Noto mt-2 text-[1.1em]'>{user.username}</h2>
                    </div>
                    <div className='mt-4'>
                        <div className='flex items-center justify-around'>
                            <div className='profileLikes flex flex-col items-center'>
                                <i className="bi bi-people-fill"></i>
                                <p>15</p>
                            </div>
                            <div className='profileLikes flex flex-col items-center'>
                                <i className="bi bi-star-fill"></i>
                                <p>130</p>
                            </div>
                        
                            <div className='profileLikes flex flex-col items-center'>
                                <i className="bi bi-hand-thumbs-down-fill"></i>
                                <p>12</p>
                            </div>

                            <div className='profileShares flex flex-col items-center'>
                                <i className="bi bi-share-fill"></i>
                                <p>27</p>
                            </div>
                        </div>
                        <div className='profileTimeStampsContainer mt-3'>
                            <p className='font-thin'><span className='text-darkViolet'>DMedia</span> Member from: 24/08/2023</p>
                            <p className='font-thin'><span className='text-darkViolet'>Posts</span> number: 159</p>
                        </div>
                    </div>
        
                </div>
           </div>
           <div className='friendsContainer'>
                <p>friends here</p>
           </div>

           <div className='profilePostsContainer'>
                posts here
           </div>

        </div>
    </div>
  )
}

export default Profile