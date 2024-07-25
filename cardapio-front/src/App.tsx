import { useState } from 'react'
import './App.css'
import { Card } from './components/card/card';
import { FoodData } from './interface/FoodData';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';

function App() {
  const { data, setData } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const deleteFood = async (id: number) => {
    try {
      console.log(`Deleting food item with id: ${id}`);
      const response = await fetch(`http://localhost:8080/foods/${id}`, {method: 'DELETE',
      });
      console.log('Response status:', response.status);
      if (response.ok){
        console.log('Food item deleted successfully');
        setData(prevData => prevData?.filter(food => food.id !== id));
      } else {
        console.error('Failed to delete food item');
      }
    } catch (error) {
      console.error('Error deleting food item', error)
    }
  }

  return (
    <div className='container'>
      <h1>Cardápio</h1>
      <div className='card-grid'>
        {data?.map(foodData => 
          <Card
            key={foodData.id}
            id={foodData.id} 
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
            onDelete={deleteFood}
          />
        )}
      </div>
        {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
        <button onClick={handleOpenModal}>Novo item</button>
    </div>
  )
}

export default App
