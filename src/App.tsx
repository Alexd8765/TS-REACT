import { useState  } from 'react';
import './App.css';
import { SizeSelector } from './components/SizeSelector';
import { SizeList } from './components/SizeList';

function App() {
  const [currentSize, setCurrentSize] = useState('none');

  return (
    <div className='App App-header'>
      <h1>Talla seleccionada: { currentSize }</h1>
      <SizeSelector selectedSize ={ currentSize }  onSizeChange={ (size) => setCurrentSize(size)}/>
      <SizeList selectedSize= { currentSize } onSizeChange={(size) => setCurrentSize(size)}></SizeList>
    </div>   
  )
}

export default App
