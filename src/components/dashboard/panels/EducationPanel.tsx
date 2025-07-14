import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Target, Clock, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface Course {
  id: string;
  name: string;
  subject: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  color: string;
  description: string;
}

interface StudyMaterial {
  id: string;
  title: string;
  type: string;
  subject: string;
  url: string;
  notes: string;
}

interface StudyGoal {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const EducationPanel: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>([]);
  
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<StudyMaterial | null>(null);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);

  // Form states
  const [newCourse, setNewCourse] = useState<Omit<Course, 'id'>>({
    name: '',
    subject: '',
    progress: 0,
    totalLessons: 0,
    completedLessons: 0,
    color: 'from-blue-400 to-blue-600',
    description: '',
  });

  const [newMaterial, setNewMaterial] = useState<Omit<StudyMaterial, 'id'>>({
    title: '',
    type: '',
    subject: '',
    url: '',
    notes: '',
  });

  const [newGoal, setNewGoal] = useState<Omit<StudyGoal, 'id'>>({
    title: '',
    deadline: '',
    completed: false,
    priority: 'medium',
  });

  // Course functions
  const addCourse = () => {
    if (newCourse.name && newCourse.subject) {
      const course: Course = {
        id: Date.now().toString(),
        ...newCourse,
      };
      setCourses([...courses, course]);
      setNewCourse({
        name: '',
        subject: '',
        progress: 0,
        totalLessons: 0,
        completedLessons: 0,
        color: 'from-blue-400 to-blue-600',
        description: '',
      });
      setShowAddCourse(false);
    }
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourseProgress = (id: string, completed: number) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        const progress = (completed / course.totalLessons) * 100;
        return { ...course, completedLessons: completed, progress };
      }
      return course;
    }));
  };

  // Material functions
  const addMaterial = () => {
    if (newMaterial.title && newMaterial.type && newMaterial.subject) {
      const material: StudyMaterial = {
        id: Date.now().toString(),
        ...newMaterial,
      };
      setStudyMaterials([...studyMaterials, material]);
      setNewMaterial({
        title: '',
        type: '',
        subject: '',
        url: '',
        notes: '',
      });
      setShowAddMaterial(false);
    }
  };

  const deleteMaterial = (id: string) => {
    setStudyMaterials(studyMaterials.filter(material => material.id !== id));
  };

  // Goal functions
  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      const goal: StudyGoal = {
        id: Date.now().toString(),
        ...newGoal,
      };
      setStudyGoals([...studyGoals, goal]);
      setNewGoal({
        title: '',
        deadline: '',
        completed: false,
        priority: 'medium',
      });
      setShowAddGoal(false);
    }
  };

  const deleteGoal = (id: string) => {
    setStudyGoals(studyGoals.filter(goal => goal.id !== id));
  };

  const toggleGoalCompletion = (id: string) => {
    setStudyGoals(studyGoals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const colorOptions = [
    { value: 'from-blue-400 to-blue-600', label: 'Azul' },
    { value: 'from-green-400 to-green-600', label: 'Verde' },
    { value: 'from-purple-400 to-purple-600', label: 'Roxo' },
    { value: 'from-pink-400 to-pink-600', label: 'Rosa' },
    { value: 'from-orange-400 to-orange-600', label: 'Laranja' },
    { value: 'from-red-400 to-red-600', label: 'Vermelho' },
    { value: 'from-yellow-400 to-yellow-600', label: 'Amarelo' },
    { value: 'from-indigo-400 to-indigo-600', label: 'Índigo' },
  ];

  const materialTypes = [
    'Vídeo', 'PDF', 'Artigo', 'Livro', 'Apostila', 'Resumo', 'Exercício', 'Prova'
  ];

  const subjects = [
    'Matemática', 'Português', 'História', 'Geografia', 'Biologia', 'Física', 'Química', 
    'Inglês', 'Espanhol', 'Filosofia', 'Sociologia', 'Literatura', 'Redação', 'Arte'
  ];

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Education');

  useEffect(() => {
    if (conteudo) {
      setCourses(conteudo.courses || []);
      setStudyMaterials(conteudo.studyMaterials || []);
      setStudyGoals(conteudo.studyGoals || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ courses, studyMaterials, studyGoals });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses, studyMaterials, studyGoals]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800">Educação</h1>
            <p className="text-gray-600">Organize seus estudos e aprendizado 📚</p>
          </div>
        </div>
      </motion.div>

      {/* Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Meus Cursos</h2>
          <button
            onClick={() => setShowAddCourse(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Curso
          </button>
        </div>
        
        {courses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum curso adicionado ainda</p>
            <p className="text-sm">Clique em "Adicionar Curso" para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${course.color} rounded-lg flex items-center justify-center text-white`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingCourse(course)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{course.subject}</p>
                {course.description && (
                  <p className="text-sm text-gray-700 mb-3">{course.description}</p>
                )}
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progresso</span>
                    <span className="text-sm font-medium text-gray-800">{course.progress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${course.color} h-2 rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{course.completedLessons} de {course.totalLessons} aulas</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => updateCourseProgress(course.id, Math.max(0, course.completedLessons - 1))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateCourseProgress(course.id, Math.min(course.totalLessons, course.completedLessons + 1))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Study Materials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Materiais de Estudo</h2>
          <button
            onClick={() => setShowAddMaterial(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Material
          </button>
        </div>
        
        {studyMaterials.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum material adicionado ainda</p>
            <p className="text-sm">Adicione seus materiais de estudo</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {studyMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{material.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{material.type}</span>
                      <span>•</span>
                      <span>{material.subject}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingMaterial(material)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMaterial(material.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {material.notes && (
                  <p className="text-sm text-gray-700 mb-3">{material.notes}</p>
                )}
                
                {material.url && (
                  <a
                    href={material.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm w-full flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Abrir Material
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Study Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Metas de Estudo</h2>
          <button
            onClick={() => setShowAddGoal(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Meta
          </button>
        </div>
        
        {studyGoals.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma meta definida ainda</p>
            <p className="text-sm">Defina suas metas de estudo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {studyGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${
                  goal.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    goal.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-gray-300 hover:border-green-400'
                  }`}
                >
                  {goal.completed && <CheckCircle className="w-4 h-4" />}
                </button>
                
                <div className="flex-1">
                  <h3 className={`font-medium ${goal.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                    {goal.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Prazo: {goal.deadline}</span>
                    <span>•</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      goal.priority === 'high' ? 'bg-red-100 text-red-700' :
                      goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Study Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dicas de Estudo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">⏰ Técnica Pomodoro</h3>
            <p className="text-sm text-blue-700">
              Estude por 25 minutos, faça uma pausa de 5 minutos. A cada 4 ciclos, descanse 15 minutos.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">📝 Mapas Mentais</h3>
            <p className="text-sm text-green-700">
              Organize informações em mapas mentais para melhor memorização e compreensão.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🔄 Revisão Espaçada</h3>
            <p className="text-sm text-purple-700">
              Revise o conteúdo em intervalos crescentes para fixar melhor na memória.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-2">🎯 Metas Realistas</h3>
            <p className="text-sm text-yellow-700">
              Defina metas pequenas e alcançáveis para manter a motivação e o progresso.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add Course Modal */}
      {showAddCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddCourse(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Curso</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso</label>
                <input
                  type="text"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Matemática Básica"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matéria</label>
                <select
                  value={newCourse.subject}
                  onChange={(e) => setNewCourse({...newCourse, subject: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma matéria</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (opcional)</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Descreva o curso..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total de Aulas</label>
                <input
                  type="number"
                  min="0"
                  value={newCourse.totalLessons}
                  onChange={(e) => setNewCourse({...newCourse, totalLessons: parseInt(e.target.value)})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Curso</label>
                <select
                  value={newCourse.color}
                  onChange={(e) => setNewCourse({...newCourse, color: e.target.value})}
                  className="input-field"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddCourse(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addCourse}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Material Modal */}
      {showAddMaterial && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddMaterial(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Material</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Apostila de Matemática"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione o tipo</option>
                  {materialTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matéria</label>
                <select
                  value={newMaterial.subject}
                  onChange={(e) => setNewMaterial({...newMaterial, subject: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma matéria</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL (opcional)</label>
                <input
                  type="url"
                  value={newMaterial.url}
                  onChange={(e) => setNewMaterial({...newMaterial, url: e.target.value})}
                  className="input-field"
                  placeholder="https://exemplo.com/material"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                <textarea
                  value={newMaterial.notes}
                  onChange={(e) => setNewMaterial({...newMaterial, notes: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Observações sobre o material..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddMaterial(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addMaterial}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddGoal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Meta</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Meta</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Terminar capítulo 5 de Matemática"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prazo</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  className="input-field"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddGoal(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addGoal}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EducationPanel;