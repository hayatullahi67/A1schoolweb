// pages/course-modules.tsx
import React, { useState } from 'react';
import { XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  videoUrl: string | null;
}

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz | null;
  isDefault?: boolean;
}

const CourseModules: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([
    {
      id: 'default-module',
      title: 'Introduction',
      description: 'Getting started with the course',
      lessons: [],
      quiz: null,
      isDefault: true,
    },
  ]);

  const [activeModal, setActiveModal] = useState<{
    type: 'module' | 'lesson' | 'quiz' | null;
    moduleId?: string;
  }>({ type: null });

  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

  // Module functions
  const addModule = () => {
    setActiveModal({ type: 'module' });
  };

  const handleCreateModule = (title: string, description: string) => {
    const newModule: Module = {
      id: `module-${Date.now()}`,
      title,
      description,
      lessons: [],
      quiz: null,
    };

    setModules([...modules, newModule]);
    setActiveModal({ type: null });
  };

  const deleteModule = (id: string) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  // Lesson functions
  const addLesson = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setActiveModal({ type: 'lesson', moduleId });
  };

  const handleCreateLesson = (moduleId: string, title: string, videoUrl: string | null) => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title,
      videoUrl,
    };

    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [...module.lessons, newLesson],
          };
        }
        return module;
      })
    );

    setActiveModal({ type: null });
  };

  // Quiz functions
  const addQuiz = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setActiveModal({ type: 'quiz', moduleId });
  };

  const handleCreateQuiz = (moduleId: string, questions: QuizQuestion[]) => {
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      questions,
    };

    setModules(
      modules.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            quiz: newQuiz,
          };
        }
        return module;
      })
    );

    setActiveModal({ type: null });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-1">Course Modules</h1>
        <p className="text-gray-600 text-sm">Organize your course content into modules</p>
      </div>

      {/* Modules List */}
      <div className="space-y-4 mb-6">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onDelete={deleteModule}
            onAddLesson={addLesson}
            onAddQuiz={addQuiz}
          />
        ))}
      </div>

      {/* Add Module Button */}
      <button
        onClick={addModule}
        className="w-full border-2 border-dashed border-blue-300 rounded-md p-3 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
      >
        <span className="mr-2">+</span> Add Module
      </button>

      {/* Modals */}
      {activeModal.type === 'module' && (
        <ModuleModal onClose={() => setActiveModal({ type: null })} onSave={handleCreateModule} />
      )}

      {activeModal.type === 'lesson' && currentModuleId && (
        <LessonModal
          onClose={() => setActiveModal({ type: null })}
          onSave={(title, videoUrl) => handleCreateLesson(currentModuleId, title, videoUrl)}
        />
      )}

      {activeModal.type === 'quiz' && currentModuleId && (
        <QuizModal
          onClose={() => setActiveModal({ type: null })}
          onSave={(questions) => handleCreateQuiz(currentModuleId, questions)}
        />
      )}
    </div>
  );
};

// Module Card Component
const ModuleCard: React.FC<{
  module: Module;
  onDelete: (id: string) => void;
  onAddLesson: (id: string) => void;
  onAddQuiz: (id: string) => void;
}> = ({ module, onDelete, onAddLesson, onAddQuiz }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50">
        <div>
          <h3 className="font-medium">{module.title}</h3>
          <p className="text-sm text-gray-500">{module.description}</p>
        </div>
        <div className="flex items-center">
          {!module.isDefault && (
            <button
              onClick={() => onDelete(module.id)}
              className="text-gray-400 hover:text-red-500 mr-2"
            >
              <XCircle size={20} />
            </button>
          )}
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="p-4">
          {/* Lessons Section */}
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Lessons</h4>
            <div className="space-y-2">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-3 border border-gray-200 rounded-md flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs">📹</span>
                    </div>
                    <span>{lesson.title}</span>
                  </div>
                </div>
              ))}
              <button
                onClick={() => onAddLesson(module.id)}
                className="w-full border border-dashed border-gray-300 rounded-md p-2 flex items-center justify-center text-blue-600 hover:bg-gray-50 transition"
              >
                <span className="mr-1">+</span> Add Lesson
              </button>
            </div>
          </div>

          {/* Quiz Section */}
          <div>
            <h4 className="text-sm font-medium mb-2">Quiz</h4>
            {module.quiz ? (
              <div className="p-3 border border-gray-200 rounded-md">
                <h5 className="font-medium">Quiz</h5>
                <p className="text-sm text-gray-500">{module.quiz.questions.length} questions</p>
              </div>
            ) : (
              <button
                onClick={() => onAddQuiz(module.id)}
                className="w-full border border-dashed border-gray-300 rounded-md p-2 flex items-center justify-center text-blue-600 hover:bg-gray-50 transition"
              >
                <span className="mr-1">+</span> Add Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Module Modal Component
const ModuleModal: React.FC<{
  onClose: () => void;
  onSave: (title: string, description: string) => void;
}> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, description);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Module Title</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter module title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Enter module description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Lesson Modal Component
const LessonModal: React.FC<{
  onClose: () => void;
  onSave: (title: string, videoUrl: string | null) => void;
}> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title, videoUrl);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you'd upload the file to a server and get a URL back
      // For this example, we'll just create a local object URL
      const url = URL.createObjectURL(e.target.files[0]);
      setVideoUrl(url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-medium">Lesson title</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter lesson title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Video</label>
            <div className="border-2 border-dashed border-blue-300 rounded-md p-6 text-center cursor-pointer hover:bg-blue-50 transition">
              <div className="flex justify-center mb-2">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <span>📹</span>
                </div>
              </div>
              <p className="text-blue-600 font-medium">Upload Video</p>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="block w-full h-full cursor-pointer absolute top-0 left-0"
              ></label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Quiz Modal Component
const QuizModal: React.FC<{
  onClose: () => void;
  onSave: (questions: QuizQuestion[]) => void;
}> = ({ onClose, onSave }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: `question-${Date.now()}`,
      question: '',
      options: [
        { id: `option-${Date.now()}-1`, text: '' },
        { id: `option-${Date.now()}-2`, text: '' },
      ],
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (questions.some((q) => q.question.trim() !== '')) {
      onSave(questions);
    }
  };

  const handleQuestionChange = (id: string, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleOptionChange = (questionId: string, optionId: string, value: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text: value } : opt
              ),
            }
          : q
      )
    );
  };

  const addOption = (questionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [...q.options, { id: `option-${Date.now()}`, text: '' }],
            }
          : q
      )
    );
  };

  const removeOption = (questionId: string, optionId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      )
    );
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `question-${Date.now()}`,
        question: '',
        options: [
          { id: `option-${Date.now()}-1`, text: '' },
          { id: `option-${Date.now()}-2`, text: '' },
        ],
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-md max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white">
          <h3 className="font-medium">Quiz</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-2 text-sm font-medium">{questions.length} question</div>

          {questions.map((question, qIndex) => (
            <div key={question.id} className="mb-6 border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Question {qIndex + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeQuestion(question.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <XCircle size={18} />
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <h5 className="text-sm font-medium mb-2">Options</h5>
                {question.options.map((option) => (
                  <div key={option.id} className="flex items-center mb-2">
                    <div className="h-6 w-6 border border-gray-300 rounded-full mr-2"></div>
                    <input
                      type="text"
                      placeholder="Option text"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(question.id, option.id, e.target.value)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(question.id, option.id)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addOption(question.id)}
                  className="text-blue-600 text-sm hover:text-blue-800 mt-2"
                >
                  + Add Option
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="w-full border border-dashed border-gray-300 rounded-md p-3 flex items-center justify-center text-blue-600 hover:bg-gray-50 transition mb-6"
          >
            <span className="mr-1">+</span> Add Question
          </button>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 mr-2 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseModules;
