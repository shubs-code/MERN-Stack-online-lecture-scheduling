
A MERN Stack based Online Lecture Sceduling Application

Frontend hosted on netlify
https://65fb194330a6cf08cf98565a--iridescent-fox-c65671.netlify.app/

Backend Hosted on Render 
https://mern-stack-online-lecture-scheduling.onrender.com

Video Reference 
https://drive.google.com/file/d/1GKVqw1YkOCEyVZGNRYNB5reaHkqGcPXd/view?usp=drive_link


The backend uses jwt for authentication and autherization.

admin and instructor routes are validated for access rights with the help of x-access-token header.

The front end uses tailwind css for designing purpose and react-toastify for show toat messages for success and warnings.

website links ->
"/" homepage
"/login"  login page
"/signup"  signup page
"dashboard/admin"  admin dashboard
"dashboard/instructor" instructor dashboard

API routes 
post /api/auth/signup  api for registering new user
post /api/auth/signin  api for loggin in, returns access token on successfull login
post /api/admin/course  create a course, accessible by user with admin rights.
get /api/admin/courses  get all the courses available
post /api/admin/lecture  associate a lecture with a course
get /api/admin/lectures/:courseId  get lectures associated with a certain course
get /api/instructor/lectures api to list all the lectures an instructor is scedhuled to


