import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import './App.css';
import { useState } from 'react';

const fetchPerson = async (id: string) => {
  const res = await axios.get(`https://swapi.info/api/people/${id}`);
  return res.data;
};
// useQuery замість useEffect, тільки для get запитів
// Для інших типів запитів ми будемо використовувати хук useMutation.

function App() {
  const [characterId, setCharacterId] = useState('');

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['character', characterId],
    // унікальний ключ запиту, дозволяє React Query ідентифікувати цей запит
    // змінюємо ключ запиту залежно від characterId
    queryFn: () => fetchPerson(characterId),
    //функція запиту, яка викликається для отримання даних
    // React Query виконає цю функцію автоматично,
    // коли компонент буде монтуватися або коли буде необхідно оновити запит.
    enabled: characterId !== '',
    // enabled: true – запит виконується одразу або після зміни залежностей.
    // enabled: false – не виконується, навіть якщо монтування / зміна залежностей
  });

  const handleSearch = (formData: FormData) => {
    const id = formData.get('id') as string;
    setCharacterId(id);
  };

  return (
    <>
      <form action={handleSearch}>
        <input type="text" name="id" placeholder="Enter character ID" />
        <button type="submit">Search</button>
      </form>
      {/* <button onClick={() => setCharacterId(s => s + 1)}>Next person</button> */}
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occured: {error.message}</p>}
      {data && <pre>{JSON.stringify(data)}</pre>}
    </>
  );
}

export default App;
