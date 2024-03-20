import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';

const Instructor = () => {
  const access_token = sessionStorage.getItem("access-token");
  const [lectureList, setLectureList] = useState([]);

  useEffect(()=>{
    async function getLectures() {
      const response = await fetch(`${SERVER_URL}/api/instructor/lectures`,{
        headers:{
          "x-access-token":`${access_token}`
        }
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      setLectureList(data);
    }
    getLectures();

  },[])

  return (
    <div  className="block  h-full min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Sheduled Lectures
      </h5>

        
        <div className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full'>
            {lectureList.map((_lecture)=><ScheduleLectureList lecture={_lecture}/>)}
        </div>
      

    </div>
  )
}
const ScheduleLectureList = ({lecture})=>{

  return(
    <div className="pt-2 pb-3 sm:pb-4 border-0 border-b-2" key={lecture?._id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               {lecture?.course?.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {lecture?.scheduledOn?.substr(0,10)}
            </p>
         </div>
      </div>
   </div>
  )
}
export default Instructor