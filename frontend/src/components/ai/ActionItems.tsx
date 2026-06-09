import React from 'react';

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  status: 'Pending' | 'Completed';
}

interface ActionItemsProps {
  items: ActionItem[];
  onToggleStatus?: (id: string) => void;
}

const ActionItems: React.FC<ActionItemsProps> = ({ items, onToggleStatus }) => {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>Action Items Extracted</h4>
        <span style={{ fontSize: '0.75rem', background: '#ECFDF5', color: '#059669', padding: '4px 10px', borderRadius: '99px', fontWeight: 600 }}>
          ✓ Action Items
        </span>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '16px', color: '#9CA3AF', fontSize: '0.85rem' }}>
          No action items detected in this meeting.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '12px', border: '1px solid #F3F4F6', borderRadius: '8px',
                background: item.status === 'Completed' ? '#F9FAFB' : '#ffffff'
              }}
            >
              <input
                type="checkbox"
                checked={item.status === 'Completed'}
                onChange={() => onToggleStatus && onToggleStatus(item.id)}
                style={{ marginTop: '3px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '0.875rem', fontWeight: 500, color: '#1F2937',
                  textDecoration: item.status === 'Completed' ? 'line-through' : 'none'
                }}>
                  {item.task}
                </span>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.75rem', color: '#6B7280' }}>
                  <span>Assignee: <strong style={{ color: '#4B5563' }}>{item.assignee}</strong></span>
                  <span>Due: <strong>{item.dueDate}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionItems;
