export function DuplicateSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <g fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M16.83 20H8a3 3 0 0 1-3-3V6.17A3.001 3.001 0 0 0 3 9v10a3 3 0 0 0 3 3h8a3.001 3.001 0 0 0 2.83-2zM7 5v12a1 1 0 0 0 1 1h10a3 3 0 0 0 3-3V8.828a3 3 0 0 0-.879-2.12l-3.828-3.83A3 3 0 0 0 14.172 2H10a3 3 0 0 0-3 3z'
          fill='currentColor'
        ></path>
      </g>
    </svg>
  );
}
