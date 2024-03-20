import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { CustomDialog } from '../CustomDialog';
import AddCorse from './AddCorse';
import ViewLectures from './ViewLectures';
import AddLecture from './AddLecture';

const Admin = () => {
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem("access-token");
  const username = sessionStorage.getItem("username");

  const [instructorList, setInstructorList] = useState([]);
  const [courseList, setCourseList] = useState([]);


  const forbidenCall = ()=>{
    // move the user to login page if forbidden request is made.
    sessionStorage.setItem("access-token","")
    navigate("/login");

  }
  useEffect(()=>{
    async function getInstructors() {
      const response = await fetch(`${SERVER_URL}/api/admin/instructors`,{
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
      console.log(data);
      setInstructorList(data);
    }
    getInstructors();
    
    async function getCourses() {
      const response = await fetch(`${SERVER_URL}/api/admin/courses`,{
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
      console.log(data);
      setCourseList(data);
    }
    getCourses();
  },[])
  return (
    <div  className="block  h-full min-h-96 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Admin Dashboard
      </h5>

      <div className='mb-6'>
        <div className=' mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
          Instructors
        </div>
        
        <div className='h-60 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full overflow-y-scroll'>
            {instructorList.map((_instructor)=><InstructorListComponent instructor={_instructor}/>)}
        </div>
      </div>

      <div>
        <div className='inline-block mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white'>
          Courses
        </div>
        <div className='inline-block ml-4 mb-1'>
        <CustomDialog title={"Add Course"} buttonText={"Add Course"} isList={false}> 
          <AddCorse/>
        </CustomDialog>
        </div>


        <div className='h-60 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 w-full overflow-y-scroll'>
            {courseList.map((_course)=><CourseListComponent course={_course}/>)}
        </div>
      </div>
      

    </div>
  )
}

const InstructorListComponent = ({instructor})=>{

  return(
    <div className="pt-2 pb-3 sm:pb-4 border-0 border-b-2" key={instructor?.id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               {instructor?.username}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {instructor?.email}
            </p>
         </div>
      </div>
   </div>
  )
}

const CourseListComponent = ({course})=>{

  return(
    <div className="pb-3 sm:pb-4 border-0 border-b-2 mb-2" key={course?._id}>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src={`${course?.imageURL}`} alt="Neil image"></img>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               {course?.name}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               {course?.description}
            </p>
         </div>
         <CustomDialog title={"Lectures"} buttonText={"View Lectures"} isList={false}> 
            <ViewLectures CourseId={course._id} />
         </CustomDialog>
         <CustomDialog title={"Add Lecture"} buttonText={"Add Lecture"} isList={false}>
          <AddLecture CourseId={course._id}/>
         </CustomDialog>

      </div>
   </div>
  )
}
export default Admin