import React from 'react';
import './App.css';
import * as math from "mathjs";

class Calculator extends React.Component { 

  constructor(props){
    super(props);
    this.state = {
      Calcu: [],
      displayValue: '0',
      waitingForOperand: false,
      operator: ""
      
    }
  }
  
  inputDigit(digit){ 
    const displayValue = this.state.displayValue;
    const waitingForOperand = this.state.waitingForOperand;

    if(waitingForOperand){
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else{
      this.setState({
        displayValue: (displayValue === '0') ? String(digit) : displayValue + digit
      })
    }
   
  }

  inputDot(){
    const displayValue = this.state.displayValue;
    const waitingForOperand = this.state.waitingForOperand;

    if(waitingForOperand){
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else if(displayValue.indexOf('.') === -1){
      this.setState({
        displayValue: displayValue + '.'
      })
    }   
  }

  clearDisplay(){
    this.setState({
      displayValue: '0'
    })
  }

  inputPercent(){
    const displayValue = this.state.displayValue;

    this.setState({
      displayValue: String(displayValue/100)
    })
  }


  handleEqual = () => {

    this.setState({ displayValue: math.eval(this.state.displayValue) });
    let computedValue = math.eval(this.state.displayValue);

    if(localStorage.getItem('Calcu') == null){
      let Calcu = [];
      let localValues=`${this.state.displayValue} = ${computedValue}`;
      Calcu.push(localValues);
      localStorage.setItem('Calcu', JSON.stringify(Calcu));
    } else{
      let Calcu = JSON.parse(localStorage.getItem('Calcu'));
      let localValues=`${this.state.displayValue} = ${computedValue}`;
      Calcu.push(localValues);
      localStorage.setItem('Calcu', JSON.stringify(Calcu));
    }

  };

  history = () => {    
   this.setState({
      Calcu: JSON.parse(localStorage.getItem('Calcu'))
    }); 
  }

  componentDidMount(){
    localStorage.clear('Calcu');
  }

  render() { 
    const historyValue =this.state.Calcu;
    return ( 
      <div className="container-fluid p-0">
          <div className="calculator">
          <div className="history-screen">
            {historyValue && historyValue.length ? <span>{historyValue.join(',\n')}</span> : ''}
          </div>
            <div className="calculator-display">{this.state.displayValue}</div>
            <div className="input-keys">
              <div className="row m-0">
                <div className="col-md-3 p-0">
                  <button className="calc-ac" onClick={() => this.clearDisplay()}>AC</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-history" onClick={() => this.history()}>HISTORY</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-percent" onClick={() => this.inputPercent()}>%</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-divide" onClick={() => this.inputDigit('/')}>/</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-7" onClick={()=> this.inputDigit(7)}>7</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-8" onClick={()=> this.inputDigit(8)}>8</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-9" onClick={()=> this.inputDigit(9)}>9</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-multiply" onClick={() => this.inputDigit('*')}>*</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-4" onClick={()=> this.inputDigit(4)}>4</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-5" onClick={()=> this.inputDigit(5)}>5</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-6" onClick={()=> this.inputDigit(6)}>6</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-sub" onClick={() => this.inputDigit('-')}>-</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-1" onClick={()=> this.inputDigit(1)}>1</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-2" onClick={()=> this.inputDigit(2)}>2</button>
                </div>
                <div className="col-md-3 p-0">  
                  <button className="calc-3" onClick={()=> this.inputDigit(3)}>3</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-plus" onClick={() => this.inputDigit('+')}>+</button>
                </div>
                <div className="col-md-6 p-0">
                  <button className="calc-zero" onClick={()=> this.inputDigit(0)}>0</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-dot" onClick={()=> this.inputDot()}>.</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-equal" onClick={() => this.handleEqual()}>=</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    ); 
  } 
} 

export default Calculator;
