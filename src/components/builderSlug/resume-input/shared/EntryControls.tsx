'use client';
import { DeleteSvg } from '@/components/builder/previousResumes/DeleteSvg';
import { Tooltip } from '@/components/tooltip/ToolTip';
import { FaArrowDown, FaArrowUp, FaGripVertical } from 'react-icons/fa6';

interface EntryControlsProps {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: (event: React.DragEvent<HTMLElement>) => void;
    onDragEnd: () => void;
  };
  isDragging?: boolean;
}

const iconClass =
  'text text-xl text-light-text-secondary dark:text-dark-text-secondary cursor-pointer';

export default function EntryControls({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onDelete,
  dragHandleProps,
  isDragging,
}: EntryControlsProps) {
  return (
    <div className='flex flex-row justify-end gap-4 items-center'>
      <Tooltip text='Drag to reorder'>
        <span
          {...dragHandleProps}
          aria-label='Drag to reorder'
          className={`${iconClass} cursor-grab active:cursor-grabbing ${
            isDragging ? 'opacity-40' : ''
          }`}
        >
          <FaGripVertical />
        </span>
      </Tooltip>

      {index === 0 ? null : (
        <Tooltip text='Move Up'>
          <FaArrowUp className={iconClass} onClick={onMoveUp} />
        </Tooltip>
      )}

      {index === total - 1 ? null : (
        <Tooltip text='Move Down'>
          <FaArrowDown className={iconClass} onClick={onMoveDown} />
        </Tooltip>
      )}

      <Tooltip text='Delete'>
        <DeleteSvg
          onClick={onDelete}
          className='text text-2xl text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500 hover:dark:text-red-500 cursor-pointer'
        />
      </Tooltip>
    </div>
  );
}
