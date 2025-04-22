"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Plus, X, Video, Check, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Question = {
  id: number;
  text: string;
  options: { id: number; value: string; answer: boolean }[];
};

type Objective = {
  id: number;
  title: string;
  description: string;
};

type Lesson = {
  id: number;
  title: string;
  video_link?: string;
  file?: File;
};

type Module = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
};

interface Instructor {
  fullname: string;
  email: string;
  token: string;
  id: string;
}

export default function CourseManagementPage() {
  const [courseName, setCourseName] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: 1, title: "", description: "" },
  ]);
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: "", options: [{ id: 1, value: "", answer: false }] },
  ]);
  const [modules, setModules] = useState<Module[]>([
    { id: 1, title: "", description: "", lessons: [] },
  ]);
  const [instructor, setInstructor] = useState<Instructor>({
    fullname: "Loading...",
    email: "",
    id: "",
    token: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setInstructor({
          fullname: parsed.fullname || "Instructor",
          email: parsed.email || "",
          id: parsed.id || "",
          token: parsed.token || "",
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setCategories(categories.filter((cat) => cat !== categoryToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Learning Objectives
  const handleAddObjective = () => {
    const newId =
      objectives.length > 0
        ? Math.max(...objectives.map((obj) => obj.id)) + 1
        : 1;
    setObjectives([...objectives, { id: newId, title: "", description: "" }]);
  };

  const handleRemoveObjective = (id: number) => {
    if (objectives.length > 1) {
      setObjectives(objectives.filter((obj) => obj.id !== id));
    }
  };

  const handleChangeObjective = (
    id: number,
    field: "title" | "description",
    value: string
  ) => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, [field]: value } : obj))
    );
  };

  // Quiz Questions
  const handleAddQuestion = () => {
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    setQuestions([
      ...questions,
      { id: newId, text: "", options: [{ id: 1, value: "", answer: false }] },
    ]);
  };

  const handleRemoveQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleQuestionTextChange = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text: value } : q))
    );
  };

  const handleOptionChange = (
    questionId: number,
    optionId: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, value } : opt
              ),
            }
          : q
      )
    );
  };

  const handleSetCorrectAnswer = (questionId: number, optionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) => ({
                ...opt,
                answer: opt.id === optionId,
              })),
            }
          : q
      )
    );
  };

  const handleAddOption = (questionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                {
                  id:
                    q.options.length > 0
                      ? Math.max(...q.options.map((opt) => opt.id)) + 1
                      : 1,
                  value: "",
                  answer: false,
                },
              ],
            }
          : q
      )
    );
  };

  const handleRemoveOption = (questionId: number, optionId: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options:
                q.options.length > 2
                  ? q.options.filter((opt) => opt.id !== optionId)
                  : q.options, // Prevent removing if only 2 options left
            }
          : q
      )
    );
  };

  // Modules and Lessons
  const handleAddModule = () => {
    const newId =
      modules.length > 0 ? Math.max(...modules.map((m) => m.id)) + 1 : 1;
    setModules([
      ...modules,
      { id: newId, title: "", description: "", lessons: [] },
    ]);
  };

  const handleModuleTitleChange = (id: number, value: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, title: value } : module
      )
    );
  };

  const handleModuleDescriptionChange = (id: number, value: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === id ? { ...module, description: value } : module
      )
    );
  };

  const handleRemoveModule = (id: number) => {
    if (modules.length > 1) {
      setModules(modules.filter((module) => module.id !== id));
    } else {
      alert("You must have at least one module");
    }
  };

  const handleAddLessonToModule = (moduleId: number) => {
    const m = modules.find((m) => m.id === moduleId);
    if (!m) return;

    const newLessonId =
      m.lessons.length > 0 ? Math.max(...m.lessons.map((l) => l.id)) + 1 : 1;

    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: [...module.lessons, { id: newLessonId, title: "" }],
            }
          : module
      )
    );
  };

  const handleLessonTitleChange = (
    moduleId: number,
    lessonId: number,
    value: string
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, title: value } : lesson
              ),
            }
          : module
      )
    );
  };

  const handleRemoveLessonFromModule = (moduleId: number, lessonId: number) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : module
      )
    );
  };

  const handleVideoUpload = async (moduleId: number, lessonId: number) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";

    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const videoUrl = URL.createObjectURL(file);

        setModules((prev) =>
          prev.map((module) =>
            module.id === moduleId
              ? {
                  ...module,
                  lessons: module.lessons.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, video_link: videoUrl, file: file }
                      : lesson
                  ),
                }
              : module
          )
        );
      }
    };

    fileInput.click();
  };

  const validateForm = () => {
    if (!courseName.trim()) {
      alert("Please enter a course name");
      return false;
    }

    if (!coursePrice.trim() || isNaN(Number.parseFloat(coursePrice))) {
      alert("Please enter a valid price");
      return false;
    }

    if (categories.length === 0) {
      alert("Please add at least one category");
      return false;
    }

    if (!description.trim()) {
      alert("Please enter a course description");
      return false;
    }

    if (!imagePreview) {
      alert("Please upload a course thumbnail");
      return false;
    }

    // Validate objectives
    const invalidObjectives = objectives.some((obj) => !obj.title.trim());
    if (invalidObjectives) {
      alert("All learning objectives must have a title");
      return false;
    }

    // Validate modules
    const invalidModules = modules.some((module) => !module.title.trim());
    if (invalidModules) {
      alert("All modules must have a title");
      return false;
    }

    // Validate lessons
    const modulesWithoutLessons = modules.some(
      (module) => module.lessons.length === 0
    );
    if (modulesWithoutLessons) {
      alert("Each module must have at least one lesson");
      return false;
    }

    const invalidLessons = modules.some((module) =>
      module.lessons.some(
        (lesson) => !lesson.title.trim() || !lesson.video_link
      )
    );
    if (invalidLessons) {
      alert("All lessons must have a title and video");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Step 1: Create the course
      const courseData = {
        name: courseName,
        price: Number.parseFloat(coursePrice),
        category: categories,
        description,
        objectives: objectives.map((obj) => ({
          title: obj.title,
          description: obj.description,
        })),
        modules: modules.map((module) => ({
          title: module.title,
          description: module.description,
          lessons: module.lessons.map((lesson) => ({
            title: lesson.title,
          })),
        })),
      };

      const courseResponse = await fetch(
        `https://api.a1schools.org/courses?instructor_id=${instructor.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${instructor.token}`,
          },
          body: JSON.stringify(courseData),
        }
      );

      if (!courseResponse.ok) {
        const errorData = await courseResponse.json();
        throw new Error(
          `Failed to create course: ${errorData.detail || "Unknown error"}`
        );
      }

      const courseResult = await courseResponse.json();
      const courseId = courseResult.data.id;

      // Step 2: Upload course image
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

        const imageResponse = await fetch(
          `https://api.a1schools.org/courses/${courseId}/upload-image`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${instructor.token}`,
            },
            body: imageFormData,
          }
        );

        if (!imageResponse.ok) {
          console.error("Failed to upload course image");
        }
      }

      // Step 3: Create modules and lessons
      for (const m of modules) {
        // Create module
        const moduleResponse = await fetch(
          `https://api.a1schools.org/courses/${courseId}/modules`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${instructor.token}`,
            },
            body: JSON.stringify({
              title: m.title,
              description: m.description,
            }),
          }
        );

        if (!moduleResponse.ok) {
          console.error(`Failed to create module: ${m.title}`);
          continue;
        }

        const moduleResult = await moduleResponse.json();
        const moduleId = moduleResult.data.id;

        // Create lessons for this module
        for (const lesson of m.lessons) {
          const lessonResponse = await fetch(
            `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/lessons`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${instructor.token}`,
              },
              body: JSON.stringify({
                title: lesson.title,
              }),
            }
          );

          if (!lessonResponse.ok) {
            console.error(`Failed to create lesson: ${lesson.title}`);
            continue;
          }

          const lessonResult = await lessonResponse.json();
          const lessonId = lessonResult.data.id;

          // Upload video for this lesson
          if (lesson.file) {
            const videoFormData = new FormData();
            videoFormData.append("video", lesson.file);

            const videoResponse = await fetch(
              `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/upload-video`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${instructor.token}`,
                },
                body: videoFormData,
              }
            );

            if (!videoResponse.ok) {
              console.error(
                `Failed to upload video for lesson: ${lesson.title}`
              );
            }
          }
        }

        // Create quiz for this module if there are questions
        if (questions.length > 0) {
          const quizData = {
            questions: questions.map((q) => ({
              question: q.text,
              options: q.options.map((opt) => ({
                value: opt.value,
                answer: opt.answer,
              })),
            })),
          };

          const quizResponse = await fetch(
            `https://api.a1schools.org/courses/${courseId}/modules/${moduleId}/quiz`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${instructor.token}`,
              },
              body: JSON.stringify(quizData),
            }
          );

          if (!quizResponse.ok) {
            console.error("Failed to create quiz");
          }
        }
      }

      alert("Course created successfully!");
      router.push("/teacher/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      alert(
        `Failed to create course: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-[90%] md:w-[80%] lg:w-[70%] my-[50px]">
        <h1 className="text-2xl font-bold text-[black]">Course Details</h1>
        <p className="mt-[5px] text-[gray]">
          Enter information about your course
        </p>

        <div className="mt-[30px] space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
            <div className="space-y-2">
              <Label htmlFor="coursename">Course Name</Label>
              <Input
                id="coursename"
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseprice">Price</Label>
              <Input
                id="courseprice"
                type="text"
                value={coursePrice}
                onChange={(e) => {
                  // Only allow numbers and decimal point
                  const regex = /^\d*\.?\d*$/;
                  if (regex.test(e.target.value) || e.target.value === "") {
                    setCoursePrice(e.target.value);
                  }
                }}
                placeholder="Enter course price"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <div className="flex gap-2">
              <Input
                id="categories"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Add a category"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                className="bg-white text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-200 rounded-full px-3 py-1"
                  >
                    <span className="text-sm">{cat}</span>
                    <button
                      onClick={() => handleRemoveCategory(cat)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Course Thumbnail</Label>
            <div
              className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() =>
                document.getElementById("thumbnail-input")?.click()
              }
            >
              {imagePreview ? (
                <div className="relative w-full h-48">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Thumbnail Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500">Click to upload thumbnail</p>
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

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Learning Objectives</h2>
                <p className="text-sm text-gray-500">
                  What will students learn from this course?
                </p>
              </div>
            </div>

            {objectives.map((obj, index) => (
              <div
                key={obj.id}
                className="p-4 border rounded-md bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-semibold">
                    Objective #{index + 1}
                  </span>
                  {objectives.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveObjective(obj.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`objective-title-${obj.id}`}>Title</Label>
                    <Input
                      id={`objective-title-${obj.id}`}
                      type="text"
                      placeholder="Enter learning objective"
                      value={obj.title}
                      onChange={(e) =>
                        handleChangeObjective(obj.id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`objective-desc-${obj.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`objective-desc-${obj.id}`}
                      placeholder="Enter detailed description"
                      value={obj.description}
                      onChange={(e) =>
                        handleChangeObjective(
                          obj.id,
                          "description",
                          e.target.value
                        )
                      }
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleAddObjective}
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Learning Objective
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Quiz Questions</h2>
                <p className="text-sm text-gray-500">
                  Add questions for the course quiz
                </p>
              </div>
            </div>

            {questions.map((question, index) => (
              <div
                key={question.id}
                className="p-4 border rounded-md bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-semibold">
                    Question #{index + 1}
                  </span>
                  {questions.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`question-text-${question.id}`}>
                      Question Text
                    </Label>
                    <Input
                      id={`question-text-${question.id}`}
                      type="text"
                      placeholder="Enter question"
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionTextChange(question.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {question.options.map((option, optIndex) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-2 mb-2"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                            option.answer
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                          }`}
                          onClick={() =>
                            handleSetCorrectAnswer(question.id, option.id)
                          }
                        >
                          {option.answer && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <Input
                          type="text"
                          placeholder={`Option ${optIndex + 1}`}
                          value={option.value}
                          onChange={(e) =>
                            handleOptionChange(
                              question.id,
                              option.id,
                              e.target.value
                            )
                          }
                          className={`flex-1 ${
                            option.answer ? "border-green-500 bg-green-50" : ""
                          }`}
                        />
                        {question.options.length > 2 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveOption(question.id, option.id)
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddOption(question.id)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleAddQuestion}
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Course Modules</h2>
                <p className="text-sm text-gray-500">
                  Organize your course content into modules
                </p>
              </div>
            </div>

            {modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="p-4 border rounded-md bg-white shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-semibold">
                    Module #{moduleIndex + 1}
                  </span>
                  {modules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveModule(module.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`module-title-${module.id}`}>Title</Label>
                    <Input
                      id={`module-title-${module.id}`}
                      type="text"
                      placeholder="Enter module title"
                      value={module.title}
                      onChange={(e) =>
                        handleModuleTitleChange(module.id, e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`module-desc-${module.id}`}>
                      Description
                    </Label>
                    <Textarea
                      id={`module-desc-${module.id}`}
                      placeholder="Enter module description"
                      value={module.description}
                      onChange={(e) =>
                        handleModuleDescriptionChange(module.id, e.target.value)
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Lessons</h3>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="border rounded-md p-4 space-y-4"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-gray-500 font-medium">
                              #{lessonIndex + 1}
                            </span>
                            <Input
                              type="text"
                              placeholder="Enter lesson title"
                              value={lesson.title}
                              onChange={(e) =>
                                handleLessonTitleChange(
                                  module.id,
                                  lesson.id,
                                  e.target.value
                                )
                              }
                              className="flex-1"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveLessonFromModule(module.id, lesson.id)
                            }
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label>Video</Label>
                          {lesson.video_link ? (
                            <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Video className="h-4 w-4 text-blue-600 shrink-0" />
                                <span className="text-sm truncate">
                                  Video uploaded
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleVideoUpload(module.id, lesson.id)
                                }
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleVideoUpload(module.id, lesson.id)
                              }
                              className="w-full"
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Upload Video
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddLessonToModule(module.id)}
                      className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Lesson
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={handleAddModule}
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full text-white py-2"
          >
            {isSubmitting ? "Creating Course..." : "Submit Course"}
          </Button>
        </div>
      </div>
    </div>
  );
}
