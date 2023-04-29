import { Audio } from 'react-loader-spinner';

export function Loader() {
  return (
    <div>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        // wrapperClass
      />
      <h1>Загружаем...</h1>
    </div>
  );
}
