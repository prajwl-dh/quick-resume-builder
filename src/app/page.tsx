export default function Home() {
  return (
    <div className='w-1/2 flex flex-col items-start gap-5 p-5 bg-light-foreground m-10 ring-1 ring-light-ring-secondary hover:ring-light-ring-primary transition duration-200 shadow-md rounded-md'>
      <p className='text text-light-text-primary text-3xl'>Home</p>
      <p className='text text-light-text-secondary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
        explicabo quo magnam nisi quae at officiis tempore vitae ex,
        voluptatibus beatae omnis praesentium labore nostrum, hic numquam
        assumenda saepe corrupti.
      </p>
      <div className='flex flex-row gap-5'>
        <button className='text-light-button-primary-text bg-light-button-primary-background hover:bg-light-button-primary-active ring-1 ring-light-button-primary-background hover:ring-light-button-primary-active px-3 py-1.5 rounded-md outline-none transition duration-200 text-md shadow-sm'>
          Click Me
        </button>
        <button className='text-light-button-secondary-text bg-light-button-secondary-background hover:bg-light-button-secondary-active ring-1 ring-light-ring-secondary px-3 py-1.5 rounded-md outline-none transition duration-200 text-md shadow-sm'>
          Go Back
        </button>
      </div>
    </div>
  );
}
