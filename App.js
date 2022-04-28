import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

export default function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operations, setOperations] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  const addDigit = n => {
    const clearingDisplay = displayValue === '0' || clearDisplay

    if(n === '.' && !clearingDisplay && displayValue.includes('.')) {
      return
    }
    const currentValue = clearingDisplay ? '' : displayValue
    const displayVal = currentValue + n
    setDisplayValue(displayVal)
    setClearDisplay(false)

    if(n !== '.') {
      const newValue = parseFloat(displayVal)
      const newValues = [...values]
      newValues[current] = newValue
      setValues(newValues)
    }
  }

  const clearMemory = () => {
    setValues([0, 0])
    setDisplayValue('0')
    setClearDisplay(false)
    setOperations(null)
  }

  const setOperation = operation => {
    if(current === 0) {
      setOperations(operation)
      setCurrent(1)
      setClearDisplay(true)
    }
    if(current === 1) {
      const equals = operation === '='

      try {
        const value = values[0]
        values[0] = eval(`${value} ${operations} ${values[1]}`)
      }
      catch(e) {
        values[0] = values[1]
      }


      values[1] = 0

      setDisplayValue(`${values[0]}`)
      setOperations(equals ? null : operation)
      setCurrent(equals ? 0 : 1)
      setClearDisplay(!equals)
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={() => clearMemory()} />
        <Button label="/" operation onClick={() => setOperation('/')} />
        <Button label="7" onClick={() => addDigit(7)} />
        <Button label="8" onClick={() => addDigit(8)} />
        <Button label="9" onClick={() => addDigit(9)} />
        <Button label="*" operation onClick={() => setOperation('*')} />
        <Button label="4" onClick={() => addDigit(4)} />
        <Button label="5" onClick={() => addDigit(5)} />
        <Button label="6" onClick={() => addDigit(6)} />
        <Button label="-" operation onClick={() => setOperation('-')} />
        <Button label="1" onClick={() => addDigit(1)} />
        <Button label="2" onClick={() => addDigit(2)} />
        <Button label="3" onClick={() => addDigit(3)} />
        <Button label="+" operation onClick={() => setOperation('+')}/>
        <Button label="0" double onClick={() => addDigit(0)} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button label="=" operation onClick={() => setOperation('=')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
