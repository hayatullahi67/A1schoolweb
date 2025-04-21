'use client';


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

 import { useEffect , useRef, useState } from "react";

 import { X } from 'lucide-react';
import Image from "next/image";

 type Question = {
    id: number;
    text: string;
    options: string[];
  };
  

type Objective = {
  id: number;
  title: string;
  description: string;
  
};
type Lesson = {
    id: number;
    title: string;
    file?: File;
  };
interface VideoUploadProps {
    // onVideoUpload: (file: File) => void;
    onTitleChange: (title: string) => void;
    defaultTitle?: string;
  }

  type Instructor = {
    fullname: string;
    email: string;
    token: string;
    id: string;
  };

  const CreateCourse: React.FC<VideoUploadProps> = ({

    onTitleChange,
    defaultTitle = '',
  }) => {
           
    const [courseName, setCourseName] = useState('');
const [coursePrice, setCoursePrice] = useState('');
const [category, setCategory] = useState('');
const [categories, setCategories] = useState<string[]>([]);
const [description, setDescription] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [objectives, setObjectives] = useState<Objective[]>([
        { id: 1, title: '', description: '' },
      ]);
      const [questions, setQuestions] = useState<Question[]>([
        { id: 1, text: '', options: ['', ''] }
      ]);
      const [lessonTodo , setLessonTodo] = useState<Lesson[]>([])
      const fileInputRef = useRef<HTMLInputElement>(null);
      const [videoFile, setVideoFile] = useState<File | null>(null);
      const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
    //   const [isUploading, setIsUploading] = useState(false);
    const [instructor, setInstructor] = useState<Instructor>({
        fullname: "Loading...",
        email: "",
        id:"",
        token: "",
      });
      const handleUploadClick = () => {
        fileInputRef.current?.click();
      };
    

useEffect(() => {
        
    const stored = localStorage.getItem("userData");
    console.log("stored",stored)
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log("parsed",parsed)
      setInstructor({
        fullname: parsed.fullname || "Student",
        email: parsed.email || "",
        id: parsed.id,
        token: parsed.token
      });
    }
  }, []);

    //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (!file) return;
    
    //     if (file.type.startsWith('video/')) {
    //       setIsUploading(true);
    //       setVideoFile(file);
    
    //       const fileUrl = URL.createObjectURL(file);
    //       setVideoPreviewUrl(fileUrl);
    
    //     //   onVideoUpload(file);
    //       setIsUploading(false);
    //     } else {
    //       alert('Please select a valid video file.');
    //     }
    //   };
    

    const handleAddCategory = () => {
      if (category && !categories.includes(category)) {
        setCategories([...categories, category]); // Add the category to the array
        setCategory(''); // Reset the input field
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
      
        if (file.type.startsWith('video/')) {
          // Handle the video file
          console.log("Video file selected:", file);
        } else {
          alert("Please upload a valid video file.");
        }
      };
      
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
      }
    };
 
    // const fileInputRef = useRef<HTMLInputElement>(null);
    
    // const handleUploadClick = () => {
    //     fileInputRef.current?.click();
    //   };  

      const handleAdd = () => {
        const newId = objectives.length ? objectives[objectives.length - 1].id + 1 : 1;
        setObjectives([...objectives, { id: newId, title: '', description: '' }]);
      };
    
      const handleRemove = (id: number) => {
        if (objectives.length > 1) {
          setObjectives(objectives.filter((obj) => obj.id !== id));
        }
      };
    
      const handleChange = (
        id: number,
        field: 'title' | 'description',
        value: string
      ) => {
        setObjectives((prev) =>
          prev.map((obj) =>
            obj.id === id ? { ...obj, [field]: value } : obj
          )
        );
      };

      const handleRemoveLesson = (id: number) => {
        if (lessonTodo.length > 1) {
          setLessonTodo(lessonTodo.filter((obj) => obj.id !== id));
        }
      };

      // const handleAddLesson = () => {
      //   const newId = lessonTodo.length ? lessonTodo[lessonTodo.length - 1].id + 1 : 1;
      //   setLessonTodo([...lessonTodo, { id: newId, title: '', file: undefined }]);
      // };
      const handleAddLesson = () => {
        const newId = lessonTodo.length ? lessonTodo[lessonTodo.length - 1].id + 1 : 1;
        setLessonTodo([...lessonTodo, { id: newId, title: '', file: undefined }]);
      };
    
      const handleAddQuestion = () => {
        const newId = questions.length ? questions[questions.length - 1].id + 1 : 1;
        setQuestions([...questions, { id: newId, text: '', options: ['', ''] }]);
      };
      
      const handleRemoveQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
      };
      
      const handleQuestionTextChange = (id: number, value: string) => {
        setQuestions(prev =>
          prev.map(q => q.id === id ? { ...q, text: value } : q)
        );
      };
      
      const handleOptionChange = (questionId: number, index: number, value: string) => {
        setQuestions(prev =>
          prev.map(q =>
            q.id === questionId
              ? {
                  ...q,
                  options: q.options.map((opt, i) => (i === index ? value : opt))
                }
              : q
          )
        );
      };
      
      const handleAddOption = (questionId: number) => {
        setQuestions(prev =>
          prev.map(q =>
            q.id === questionId
              ? { ...q, options: [...q.options, ''] }
              : q
          )
        );
      };
      
    //   const handleRemoveOption = (questionId: number, index: number) => {
        
    //     setQuestions(prev =>
    //       prev.map(q =>
    //         q.id === questionId
    //           ? {
    //               ...q,
    //               options: q.options.filter((_, i) => i !== index)
    //             }
    //           : q
    //       )
    //     );
    //   };
      
    const handleRemoveOption = (questionId: number, index: number) => {
        setQuestions(prev =>
          prev.map(q => {
            if (q.id === questionId) {
              if (q.options.length <= 2) {
                alert("Each question must have at least 2 options.");
                return q; // prevent update
              }
              return {
                ...q,
                options: q.options.filter((_, i) => i !== index)
              };
            }
            return q;
          })
        );
      };

  //     const handleSubmit = async() => {
  //       const courseData = {
  //         name: courseName,
  //         price: coursePrice,
  //         category:categories,
  //         description,
  //         objectives,
  //         questions,
  //         lessons: lessonTodo,
  //         thumbnail: imagePreview,
  //         // Add more as needed
  //       };
      
  //       console.log(courseData);
  //       // Send to backend or Firebase

        

  // try {
  //   const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${instructor.token}`
  //     },
  //     body: JSON.stringify(courseData) // course should be your state object holding form data
  //   });

  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     console.error('Error submitting course:', errorData);
  //     alert('Failed to submit course');
  //     return;
  //   }

  //   const data = await response.json();
  //   console.log('Course submitted successfully:', data);
  //   alert('Course submitted successfully!');
  //   // Optionally clear the form here
  // } catch (error) {
  //   console.error('Error:', error);
  //   alert('An error occurred while submitting the course');
  // }
  //     };
      
      
  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append('name', courseName);
  //   formData.append('price', coursePrice);
  //   formData.append('category', category);
  //   formData.append('description', description);
  
  //   // Add thumbnail image file
  //   if (fileInputRef.current?.files?.[0]) {
  //     formData.append('thumbnail', fileInputRef.current.files[0]);
  //   }
  
  //   // Append objectives as JSON string
  //   formData.append('objectives', JSON.stringify(objectives));
    
  //   // Append questions
  //   formData.append('questions', JSON.stringify(questions));
  
  //   // Append lessons and lesson files
  //   lessonTodo.forEach((lesson, index) => {
  //     formData.append(`lessons[${index}][title]`, lesson.title);
  //     if (lesson.file) {
  //       formData.append(`lessons[${index}][file]`, lesson.file);
  //     }
  //   });
  
  //   try {
  //     const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${instructor.token}`
  //       },
  //       body: formData
  //     });
  
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error submitting course:', errorData);
  //       alert('Failed to submit course');
  //       return;
  //     }
  
  //     const data = await response.json();
  //     console.log('Course submitted successfully:', data);
  //     alert('Course submitted successfully!');
  //   } catch (error) {
  //     console.error('Error:', error);
  //     alert('An error occurred while submitting the course');
  //   }
  // };


//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('name', courseName);
//     formData.append('price', coursePrice);
//     // formData.append('category', categories);
//     formData.append('category', categories.join(','));
//     formData.append('description', description);

//     // Thumbnail and other files handling
//     if (fileInputRef.current?.files?.[0]) {
//       formData.append('thumbnail', fileInputRef.current.files[0]);
//     }

//     // Append objectives and questions as JSON strings
//     formData.append('objectives', JSON.stringify(objectives));
//     formData.append('questions', JSON.stringify(questions));

//     // Append lessons and lesson files
//     lessonTodo.forEach((lesson, index) => {
//         formData.append(`lessons[${index}][title]`, lesson.title);
//         if (lesson.file) {
//             formData.append(`lessons[${index}][file]`, lesson.file);
//         }
//     });

//     try {
//         const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${instructor.token}`
//             },
//             body: formData
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error('Error submitting course:', errorData);
//             alert('Failed to submit course');
//             return;
//         }

//         const data = await response.json();
//         console.log('Course submitted successfully:', data);
//         alert('Course submitted successfully!');
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the course');
//     }
// };

  

// const handleSubmit = async () => {
//   const formData = new FormData();
//   formData.append('name', courseName);
//   formData.append('price', coursePrice);
//   formData.append('description', description);
  
//   // Add categories
//   categories.forEach((cat, index) => {
//     formData.append(`category[${index}]`, cat);
//   });

//   // Add thumbnail file - needs to be the actual file, not a URL
//   if (fileInputRef.current?.files?.[0]) {
//     formData.append('thumbnail', fileInputRef.current.files[0]);
//   }

//   // Append objectives as JSON string
//   formData.append('objectives', JSON.stringify(objectives));
  
//   // Append questions
//   formData.append('questions', JSON.stringify(questions));

//   // Append lessons and lesson files
//   lessonTodo.forEach((lesson, index) => {
//     formData.append(`lessons[${index}][title]`, lesson.title);
//     if (lesson.file) {
//       formData.append(`lessons[${index}][file]`, lesson.file);
//     }
//   });

//   try {
//     const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${instructor.token}`
//         // Note: Don't set Content-Type when using FormData, browser sets it automatically
//       },
//       body: formData
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error submitting course:', errorData);
//       // Log the actual validation errors
//       if (errorData.detail) {
//         console.error('Validation errors:', errorData.detail);
//       }
//       alert(`Failed to submit course: ${JSON.stringify(errorData.detail)}`);
//       return;
//     }

//     const data = await response.json();
//     console.log('Course submitted successfully:', data);
//     alert('Course submitted successfully!');
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred while submitting the course');
//   }
// };
  



// const handleSubmit = async() => {
//   // Create a proper JSON object for submission
//   const courseData = {
//     name: courseName,
//     price: Number(coursePrice),
//     category: categories,
//     description,
//     objectives,
//     questions,
//     lessons: lessonTodo.map(lesson => ({
//       id: lesson.id,
//       title: lesson.title
//     })),
//     // Add the missing modules field
//     modules: objectives.map(obj => ({
//       id: obj.id,
//       title: obj.title,
//       description: obj.description,
//       lessons: lessonTodo // You might need to map lessons to specific modules
//     }))
//   };

//   console.log("Sending data:", courseData);
  
//   try {
//     const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${instructor.token}`
//       },
//       body: JSON.stringify(courseData)
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Error submitting course:', errorData);
//       alert(`Failed to submit course: ${JSON.stringify(errorData.detail || errorData)}`);
//       return;
//     }

//     const data = await response.json();
//     console.log('Course submitted successfully:', data);
//     alert('Course submitted successfully!');
//   } catch (error) {
//     console.error('Error:', error);
//     alert('An error occurred while submitting the course');
//   }
// };



const handleSubmit = async() => {
  // Get thumbnail image if available
  let image_link = null;
  if (imagePreview) {
    // If imagePreview is already a URL, use it directly
    image_link = imagePreview;
  }

  // Get video links for lessons
  const updatedLessons = lessonTodo.map(lesson => {
    return {
      id: lesson.id,
      title: lesson.title,
      video_link: videoPreviewUrl || null // Use the video preview URL if available
    };
  });

  // Create proper JSON object for submission
  const courseData = {
    name: courseName,
    price: Number(coursePrice),
    category: categories,
    description,
    objectives,
    questions,
    lessons: updatedLessons,
    image_link: image_link, // Add thumbnail URL
    modules: objectives.map(obj => ({
      id: obj.id,
      title: obj.title,
      description: obj.description,
      // lessons: updatedLessons // Using updated lessons with video links
    }))
    // lessons: updatedLessons
  };

  console.log("Sending data:", courseData);
  
  try {
    const response = await fetch(`https://api.a1schools.org/courses?instructor_id=${instructor.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${instructor.token}`
      },
      body: JSON.stringify(courseData)
    });

    window.location.href = "/teacher/dashboard";

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error submitting course:', errorData);
      // alert(`Failed to submit course: ${JSON.stringify(errorData.detail || errorData)}`);
      return;
    }

    const data = await response.json();
    console.log('Course submitted successfully:', data);
    alert('Course submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while submitting the course');
  }
};

return (
    <>
    <div className="flex justify-center mt-[50px]">

        <div className="w-[70%] my-[50px]">
        <div>
           <h1 className="text-[black] ">Course Details</h1>   
           <p className="mt-[5px] text-[gray]">Enter information about your course</p>  
        </div>

            {/* course details */}
            <div className="mt-[20px]">
                {/* price & name */}
              <div className="grid grid-cols-2 gap-[30px]">
                  {/* name */}
                  <div>
                    <Label htmlFor="coursename">Course Name </Label>
                    <Input  id="coursename"
                    type="text"
                    value={courseName} onChange={(e) => setCourseName(e.target.value)}
                   />
                  </div>
                  {/* price */}
                  <div>
                    <Label htmlFor="courseprice">Price </Label>
                    <Input  id="courseprice"
                    type="text"
                    value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)}
                   />
                  </div>

              </div>

              {/* Categories */}
              {/* <div className="flex items-center">

               <div className="flex-[2]">
                   <Label htmlFor="categories">Categories</Label>

                 <Input
                 id="catergories"
                 type="text"
                 value={category} onChange={(e) => setCategory(e.target.value)}
                 />
               </div>
               

              </div> */}

<div className="flex items-center mb-[7px]">
      <div className="flex-[2]">
        <Label htmlFor="categories">Categories</Label>
        <div className="flex">

        <Input
          id="categories"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Update the category input state
        />

        <button
          type="button"
          onClick={handleAddCategory}
          className="ml-2 px-4 py-2 bg-[blue] text-white rounded"
        >
          Add
        </button>
        </div>

        {/* Display the added categories */}
        <div className="mt-2">
          {categories.length > 0 && (
            <div>
              {categories.map((cat, index) => (
                <span key={index} className="text-[white] bg-[gray] p-2 rounded-full mr-[5px] ml-[5px]">{cat}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  

                   {/*  descriptiom  */}
                   <div>
  <label htmlFor="description" className="block mb-1">Description</label>
  <textarea
    name="description"
    id="description"
    value={description} onChange={(e) => setDescription(e.target.value)} 
    className="w-full h-32 p-2 border border-gray-300 rounded"
  />
               </div>
        
                {/* thumbnail */}
               <div className="w-full ">
      <Label>Course Thumbnail</Label>
      <div
        className="flex items-center justify-center w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
        onClick={() => document.getElementById('thumbnail-input')?.click()}
      >
        {imagePreview ? (
          <Image src={imagePreview} alt="Thumbnail Preview" className="object-cover h-full w-full rounded-md" />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h2l.4 2M7 13h10l1 6H6l1-6zm3 0V9h4v4H10z" />
            </svg>
            <p>Add Thumbnail</p>
          </div>
        )}
        <Input
          id="thumbnail-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
              </div>

              {/* Learning */}
              <div className="w-full mt-[30px] mb-[30px]">
      <h2 className="text-xl font-semibold mb-1">Learning Objectives</h2>
      <p className="text-sm text-gray-500 mb-4">What will students learn from this course?</p>

      {objectives.map((obj, index) => (
        <div
          key={obj.id}
          className="relative mb-4 p-4 border rounded-md bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-500 font-semibold">#{index + 1}</span>
            {objectives.length > 1 && (
              <button
                onClick={() => handleRemove(obj.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X />
              </button>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter learning objective"
              value={obj.title}
              onChange={(e) =>
                handleChange(obj.id, 'title', e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter detailed description"
              value={obj.description}
              onChange={(e) =>
                handleChange(obj.id, 'description', e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="flex items-center justify-center w-full mt-2 py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
      >
        + Add Learning Objective
      </button>
          </div>

          {/* module */}
          <div className="w-full mt-[30px] mb-[30px]">
      <h2 className="text-xl font-semibold mb-1">Course Modules</h2>
      <p className="text-sm text-gray-500 mb-4">Organise your course content into modules</p>

      {objectives.map((obj, index) => (
        <div
          key={obj.id}
          className="relative mb-4 p-4 border rounded-md bg-white shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-500 font-semibold">#{index + 1}</span>
            {objectives.length > 1 && (
              <button
                onClick={() => handleRemove(obj.id)}
                className="text-red-500 hover:text-red-700"
              >
                <X />
              </button>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Module Title</label>
            <input
              type="text"
              placeholder="Enter learning objective"
              value={obj.title}
              onChange={(e) =>
                handleChange(obj.id, 'title', e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter detailed description"
              value={obj.description}
              onChange={(e) =>
                handleChange(obj.id, 'description', e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
              rows={3}
            />
          </div>

         {/* lesson */}
          <div>
            <Label>Lessons</Label>

            <div>
            {lessonTodo.map((lesson) => (
              <div key={lesson.id} className="relative mb-4 p-4 border rounded-md bg-white shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-500 font-semibold">#{lesson.id}</span>
                  {lessonTodo.length > 1 && (
                    <button onClick={() => handleRemoveLesson(lesson.id)} className="text-red-500 hover:text-red-700">
                      <X />
                    </button>
                  )}
                </div>

               

                {/* Lesson File (Video) */}
                {/* <div className="mb-2">
                  <Label>Upload Video</Label>
                  <input
                    type="file"
                    accept="video/*"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(lesson.id, e)}
                    className="w-full border rounded px-3 py-2 text-sm"
                  />
                  {lesson.file && (
                    <video controls src={videoPreviewUrl} width={200} height={100} className="rounded-md mt-2" />
                  )}
                </div> */}


<div className="mb-2">
  <label className="block text-sm font-medium mb-1">Lesson Video</label>
  <input
    type="file"
    accept="video/*"
    className="w-full"
    onChange={handleFileChange}
  />
  {videoPreviewUrl && (
    <video src={videoPreviewUrl} controls className="w-full mt-2 rounded-md" />
  )}
</div>

              </div>
            ))}

            <button
              onClick={handleAddLesson}
              className="flex items-center justify-center w-full mt-2 py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
            >
              + Add Lesson
            </button>
            </div>

            
          </div>
          {/* QUIZ */}

          <div>
            {/* QUIZ */}
<div className="w-full mt-[30px] mb-[30px]">
  <h2 className="text-xl font-semibold mb-1">Quiz</h2>
  <p className="text-sm text-gray-500 mb-4">Create quiz questions for your course</p>

  {questions.map((question, qIndex) => (
    <div key={question.id} className="border rounded-md p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-500 font-semibold">Question {qIndex + 1}</span>
        {questions.length > 1 && (
          <button onClick={() => handleRemoveQuestion(question.id)} className="text-red-500 hover:text-red-700">
            <X />
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Enter question"
        value={question.text}
        onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
        className="w-full mb-3 px-3 py-2 border rounded"
      />

      <div>
        <label className="block mb-2 text-sm font-semibold">Options</label>
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2 gap-2">
            <input
              type="radio"
              disabled
              className="accent-blue-500"
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(question.id, index, e.target.value)}
              className="flex-1 px-3 py-2 border rounded"
            />
            {question.options.length > 1 && (
              <button
                onClick={() => handleRemoveOption(question.id, index)}
                className="text-red-500 hover:text-red-700"
              >
                <X />
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => handleAddOption(question.id)}
          className="text-sm text-blue-500 hover:underline mt-1"
        >
          + Add Option
        </button>
      </div>
    </div>
  ))}

  <button
    onClick={handleAddQuestion}
    className="flex items-center justify-center w-full mt-2 py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
  >
    + Add Question
  </button>
</div>

          </div>

        </div>
      ))}

      <button
        onClick={handleAdd}
        className="flex items-center justify-center w-full mt-2 py-2 px-4 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
      >
        + Add Module
      </button>
          </div>

          <button
    type="button"
    onClick={handleSubmit}
    className="bg-[blue] text-white px-6 py-2 rounded hover:bg-blue-700"
  >
    Submit Course
  </button>


            </div>

        <div>

        </div>

        </div>
    </div>
    
    </>
   
  );
};


export default CreateCourse;