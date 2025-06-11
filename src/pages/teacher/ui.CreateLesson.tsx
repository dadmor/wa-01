// src/pages/teacher/ui.CreateLesson.tsx
import { useInsert } from '@/pages/api/hooks';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const routeConfig = { path: "/teacher/lessons/create", title: "Create Lesson" };

export default function CreateLesson() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const insertLesson = useInsert('teacher-lessons', 'lessons');
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    topic: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await insertLesson.mutateAsync({
        ...form,
        author_id: user?.id
      });
      navigate('/teacher/lessons');
    } catch (error) {
      console.error('Error creating lesson:', error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm mb-6">
          <div className="card-body py-4">
            <h1 className="card-title text-2xl">
              <span className="text-primary">📝</span>
              Nowa lekcja
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Form Cards */}
          <div className="space-y-4">
            {/* Basic Info Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">📖 Podstawowe informacje</h2>
                <div className="space-y-4">
                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Tytuł lekcji</label>
                    <input 
                      type="text"
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Wprowadź tytuł lekcji..."
                      value={form.title}
                      onChange={(e) => setForm({...form, title: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Opis</label>
                    <textarea 
                      className="textarea textarea-bordered focus:textarea-primary h-24 resize-none w-full"
                      placeholder="Opisz czego dotyczy lekcja..."
                      value={form.description}
                      onChange={(e) => setForm({...form, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Classification Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">🏷️ Klasyfikacja</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="block text-sm font-medium mb-1">Przedmiot</label>
                      <select 
                        className="select select-bordered focus:select-primary w-full"
                        value={form.subject}
                        onChange={(e) => setForm({...form, subject: e.target.value})}
                      >
                        <option value="">Wybierz przedmiot</option>
                        <option value="Matematyka">📐 Matematyka</option>
                        <option value="Polski">📚 Polski</option>
                        <option value="Historia">🏛️ Historia</option>
                        <option value="Biologia">🧬 Biologia</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="block text-sm font-medium mb-1">Klasa</label>
                      <select 
                        className="select select-bordered focus:select-primary w-full"
                        value={form.grade}
                        onChange={(e) => setForm({...form, grade: e.target.value})}
                      >
                        <option value="">Wybierz klasę</option>
                        <option value="Klasa 1">🥇 Klasa 1</option>
                        <option value="Klasa 2">🥈 Klasa 2</option>
                        <option value="Klasa 3">🥉 Klasa 3</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-control">
                    <label className="block text-sm font-medium mb-1">Temat</label>
                    <input 
                      type="text"
                      className="input input-bordered focus:input-primary w-full"
                      placeholder="Główny temat lekcji..."
                      value={form.topic}
                      onChange={(e) => setForm({...form, topic: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="card-actions justify-end">
                  <button 
                    type="button"
                    onClick={() => navigate('/teacher/lessons')}
                    className="btn btn-ghost"
                  >
                    Anuluj
                  </button>
                  <button 
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    disabled={insertLesson.isPending}
                  >
                    {insertLesson.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Tworzenie...
                      </>
                    ) : (
                      <>
                        <span>✅</span>
                        Utwórz lekcję
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}