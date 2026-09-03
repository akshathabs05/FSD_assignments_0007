import React, { useState } from 'react';

export default function App() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sum, setSum] = useState(null);

  // Push to stack
  const handlePush = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    
    setStack([...stack, parseFloat(inputValue)]);
    setInputValue('');
    setSum(null); // Reset sum when new items are added
  };

  // Pop everything to calculate sum (FILO)
  const handleCalculateSum = () => {
    let currentSum = 0;
    let tempStack = [...stack]; // Copy state array
    
    // Process in First-In-Last-Out order
    while (tempStack.length > 0) {
      currentSum += tempStack.pop(); 
    }
    
    setSum(currentSum);
    setStack([]); // Empty the stack visually after calculation
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>FILO (Stack) Sum Calculator</h2>
      
      <form onSubmit={handlePush} style={{ marginBottom: '20px' }}>
        <input 
          type="number" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter a number"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '5px 15px' }}>Push to Stack</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <h3>Current Stack:</h3>
        {stack.length === 0 ? <p>Stack is empty.</p> : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {/* Reversing for display so the "Top" of the stack is visible first */}
            {[...stack].reverse().map((num, index) => (
              <li key={index} style={{ border: '1px solid #ccc', margin: '5px 0', padding: '10px', width: '100px', textAlign: 'center' }}>
                {num}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleCalculateSum} disabled={stack.length === 0} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Calculate Sum (Pop All)
      </button>

      {sum !== null && (
        <h3 style={{ color: 'green' }}>Total Sum: {sum}</h3>
      )}
    </div>
  );
}