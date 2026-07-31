import { useState, useEffect } from 'react';
import { fetchAssignments, type Assignment } from '../../services/api';

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAssignments();
      setAssignments(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const moveAssignment = (id: number, newStatus: Assignment['status']) => {
    setAssignments(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-xl font-bold text-gray-800 animate-pulse">Loading assignments...</div>
      </div>
    );
  }

  const columns: { title: string; status: Assignment['status'] }[] = [
    { title: 'To Do', status: 'To Do' },
    { title: 'In Progress', status: 'In Progress' },
    { title: 'Completed', status: 'Completed' }
  ];

  const priorityStyles = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-orange-100 text-orange-800',
    Low: 'bg-green-100 text-green-800'
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900">Assignments</h1>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column.status} className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 flex flex-col min-h-[600px]">
            
            {/* COLUMN HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800">{column.title}</h2>
              <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-gray-100">
                {assignments.filter(a => a.status === column.status).length}
              </span>
            </div>

            {/* TASK LIST */}
            <div className="flex flex-col gap-4 flex-1">
              {assignments.filter(a => a.status === column.status).map(task => (
                <div key={task.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
                  
                  {/* TITLE + PRIORITY BADGE */}
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-bold text-gray-800 text-sm leading-snug">{task.title}</p>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shrink-0 ${priorityStyles[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* TASK FOOTER + ACTION BUTTONS */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 flex-wrap gap-2">
                    <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Due {task.dueDate}</span>
  
                    <div className="flex gap-3 shrink-0">
                      {task.status === 'To Do' && (
                        <button 
                          onClick={() => moveAssignment(task.id, 'In Progress')} 
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Start &rarr;
                        </button>
                      )}
                      
                      {task.status === 'In Progress' && (
                        <>
                          <button 
                            onClick={() => moveAssignment(task.id, 'To Do')} 
                            className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            &larr; Back
                          </button>
                          <button 
                            onClick={() => moveAssignment(task.id, 'Completed')} 
                            className="text-xs font-bold text-green-600 hover:text-green-800 transition-colors"
                          >
                            Finish &rarr;
                          </button>
                        </>
                      )}

                      {task.status === 'Completed' && (
                        <button 
                          onClick={() => moveAssignment(task.id, 'In Progress')} 
                          className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          &larr; Reopen
                        </button>
                      )}
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}