'use client';
import { ResumeInterface, SectionKey } from '@/components/builder/previousResumes/ResumeInterface';
import { Tooltip } from '@/components/tooltip/ToolTip';
import { DEFAULT_SECTION_ORDER } from '@/lib/resumeDefaults';
import {
  reorderSections,
  toggleSectionVisibility,
} from '@/lib/slices/resumeSlice';
import { useAppDispatch } from '@/lib/store/hooks';
import { FaArrowDown, FaArrowUp, FaEye, FaEyeSlash, FaGripVertical } from 'react-icons/fa6';
import { useSectionDrag } from './SectionDragContext';

const iconClass =
  'text text-lg text-light-text-secondary dark:text-dark-text-secondary cursor-pointer';

export default function SectionControls({
  resume,
  section,
}: {
  resume: ResumeInterface | undefined;
  section: SectionKey;
}) {
  const dispatch = useAppDispatch();
  const { dragHandleProps } = useSectionDrag();
  const order = resume?.sectionOrder ?? DEFAULT_SECTION_ORDER;
  const index = order.indexOf(section);
  const hidden = resume?.hiddenSections?.includes(section) ?? false;

  return (
    <div className='ml-auto flex flex-row items-center gap-3'>
      {hidden ? (
        <span className='text text-xs px-2 py-0.5 rounded-full ring-1 ring-light-ring-secondary dark:ring-dark-ring-secondary text-light-text-secondary dark:text-dark-text-secondary'>
          Hidden
        </span>
      ) : null}

      <Tooltip text={hidden ? 'Show in resume' : 'Hide from resume'}>
        <button
          type='button'
          aria-label={hidden ? 'Show section in resume' : 'Hide section from resume'}
          onClick={() =>
            dispatch(
              toggleSectionVisibility({
                id: resume?.id ?? '',
                section,
              })
            )
          }
          className={iconClass}
        >
          {hidden ? <FaEyeSlash /> : <FaEye />}
        </button>
      </Tooltip>

      <Tooltip text='Drag to reorder section'>
        <span
          {...dragHandleProps(index)}
          aria-label='Drag to reorder section'
          className={`${iconClass} cursor-grab active:cursor-grabbing`}
        >
          <FaGripVertical />
        </span>
      </Tooltip>

      {index > 0 ? (
        <Tooltip text='Move section up'>
          <FaArrowUp
            className={iconClass}
            onClick={() =>
              dispatch(
                reorderSections({ id: resume?.id ?? '', from: index, to: index - 1 })
              )
            }
          />
        </Tooltip>
      ) : null}

      {index < order.length - 1 ? (
        <Tooltip text='Move section down'>
          <FaArrowDown
            className={iconClass}
            onClick={() =>
              dispatch(
                reorderSections({ id: resume?.id ?? '', from: index, to: index + 1 })
              )
            }
          />
        </Tooltip>
      ) : null}
    </div>
  );
}
