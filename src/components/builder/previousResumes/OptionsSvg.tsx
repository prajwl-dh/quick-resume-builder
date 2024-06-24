export function OptionsSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 14 14'
      {...props}
    >
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <circle cx='7' cy='7' r='6.5'></circle>
        <circle cx='7' cy='7' r='.5'></circle>
        <circle cx='4' cy='7' r='.5'></circle>
        <circle cx='10' cy='7' r='.5'></circle>
      </g>
    </svg>
  );
}
