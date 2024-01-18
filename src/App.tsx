import { Select } from './components/custom-select';
import { fruitOptions } from './data';

function App() {
  return (
    <div className={'App'}>
      <h1 className={'app-heading'}>Code Challenge with keyboard support</h1>
       <Select data={fruitOptions} placeholder="Choose a fruit:"/>
    </div>
  );
}

export default App;
