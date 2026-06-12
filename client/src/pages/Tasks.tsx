import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDndContext, DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripVertical, User, Calendar, Trash2 } from 'lucide-react';
import { taskService, type Task } from '../services/task.service';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Card from '../components/common/Card';
import toast from 'react-hot-toast';

type Status = 'todo' | 'in-progress' | 'done';
const COLS: { id: Status; label: string; color: string }[] = [
  { id: 'todo',        label: 'To Do',       color: 'bg-gray-500' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { id: 'done',        label: 'Done',        color: 'bg-green-500' },
];
const PRIORITY_V: Record<string, 'danger' | 'warning' | 'info'> = { high: 'danger', medium: 'warning', low: 'info' };

const MOCK_TASKS: Task[] = [
  { _id: '1', title: 'Design new onboarding flow', status: 'todo', priority: 'high', assignedTo: { name: 'Sarah K.', email: 'sarah@co.com' }, dueDate: '2025-01-20', createdAt: '' },
  { _id: '2', title: 'Implement WebRTC reconnection', status: 'in-progress', priority: 'high', assignedTo: { name: 'Mike R.', email: 'mike@co.com' }, dueDate: '2025-01-18', createdAt: '' },
  { _id: '3', title: 'AI summary API integration', status: 'in-progress', priority: 'medium', createdAt: '' },
  { _id: '4', title: 'Write unit tests for auth', status: 'todo', priority: 'medium', createdAt: '' },
  { _id: '5', title: 'Deploy to staging', status: 'done', priority: 'low', createdAt: '' },
  { _id: '6', title: 'Setup CI/CD pipeline', status: 'done', priority: 'medium', createdAt: '' },
];

const TaskCard = ({ task, onDelete }: { task: Task; onDelete: (id: string) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task._id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }}
      className="bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-xl p-3 flex flex-col gap-2 hover:border-[var(--color-primary)]/40 transition-colors group"
    >
      <div className="flex items-start gap-2">
        <div {...listeners} {...attributes} className="cursor-grab mt-0.5 text-[var(--color-text-dim)] hover:text-[var(--color-text-muted)] flex-shrink-0">
          <GripVertical size={14} />
        </div>
        <p className="text-sm font-medium text-[var(--color-text)] flex-1 leading-snug">{task.title}</p>
        <button onClick={() => onDelete(task._id)} className="opacity-0 group-hover:opacity-100 p-0.5 text-[var(--color-text-dim)] hover:text-[var(--color-danger)] transition-all">
          <Trash2 size={12} />
        </button>
      </div>
      <div className="flex items-center justify-between pl-5">
        {task.priority && <Badge variant={PRIORITY_V[task.priority]} className="capitalize">{task.priority}</Badge>}
        <div className="flex items-center gap-2 ml-auto">
          {task.assignedTo && (
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 flex items-center justify-center text-white text-[9px] font-bold">
                {task.assignedTo.name.charAt(0)}
              </div>
            </div>
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1">
              <Calendar size={10} className="text-[var(--color-text-dim)]" />
              <span className="text-[10px] text-[var(--color-text-dim)]">{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [showCreate, setShowCreate] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium', status: 'todo' as Status });
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = ({ active, over }: any) => {
    if (!over || active.id === over.id) { setActiveId(null); return; }
    const colId = over.id as Status;
    if (COLS.some(c => c.id === colId)) {
      setTasks(t => t.map(task => task._id === active.id ? { ...task, status: colId } : task));
    }
    setActiveId(null);
  };

  const deleteTask = (id: string) => setTasks(t => t.filter(task => task._id !== id));

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const t: Task = { _id: Date.now().toString(), title: newTask.title, status: newTask.status, priority: newTask.priority as any, createdAt: new Date().toISOString() };
    setTasks(prev => [...prev, t]);
    toast.success('Task created!');
    setNewTask({ title: '', priority: 'medium', status: 'todo' });
    setShowCreate(false);
  };

  const activeTask = activeId ? tasks.find(t => t._id === activeId) : null;

  return (
    <div className="flex flex-col gap-5 animate-fade-in h-full">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">Task Board</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{tasks.length} tasks across all columns</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="gap-2"><Plus size={15} /> Add Task</Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={({ active }) => setActiveId(active.id as string)} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
          {COLS.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <span className="text-sm font-semibold text-[var(--color-text)]">{col.label}</span>
                  <span className="ml-auto text-xs bg-[var(--color-surface-2)] text-[var(--color-text-muted)] rounded-full px-2 py-0.5">{colTasks.length}</span>
                </div>
                <SortableContext id={col.id} items={colTasks.map(t => t._id)} strategy={verticalListSortingStrategy}>
                  <div className={`kanban-col flex flex-col gap-2 bg-[var(--color-surface)]/50 rounded-xl p-2 border border-dashed border-[var(--color-border)] min-h-[200px]`}>
                    {colTasks.map(task => <TaskCard key={task._id} task={task} onDelete={deleteTask} />)}
                    {colTasks.length === 0 && (
                      <div className="flex items-center justify-center h-24 text-xs text-[var(--color-text-dim)]">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
        <DragOverlay>
          {activeTask && <div className="bg-[var(--color-surface-2)] border border-[var(--color-primary)]/50 rounded-xl p-3 text-sm font-medium text-[var(--color-text)] shadow-2xl rotate-1">{activeTask.title}</div>}
        </DragOverlay>
      </DndContext>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create Task">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Task Title *</label>
            <input value={newTask.title} onChange={e => setNewTask(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Review API documentation" className="input-dark" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Priority</label>
              <select value={newTask.priority} onChange={e => setNewTask(p => ({ ...p, priority: e.target.value }))} className="input-dark">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] block mb-1.5">Column</label>
              <select value={newTask.status} onChange={e => setNewTask(p => ({ ...p, status: e.target.value as Status }))} className="input-dark">
                {COLS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button className="flex-1" onClick={addTask}>Create Task</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
