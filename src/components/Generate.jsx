import React, { useState } from 'react'
import arrow from '../assets/images/icon-arrow-right.svg'
import _ from 'lodash';
import Result from './Result';

const Generate = () => {
  const [sliderValue, setSliderValue] = useState(10);
  const [strength, setStrength] = useState('#E6E5EA');
  const [count, setCount] = useState(0)
  const [strengthName, setStrengthName] = useState('')
  const [res, setRes] = useState('')

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSliderValue(value); 
  };

  const progress = (sliderValue / 20) * 100; // Zakładając max=20

  //upper, lower, number, symbol
  const [checkboxes, setCheckboxes] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });

  const countClicked = (checks) => {
    const names = ['uppercase', 'lowercase', 'numbers', 'symbols']
    let counter = 0
    for(let i = 0; i < 4; i++){
      if(checks[names[i]]){
        counter += 1
      }
    }

    if(counter === 1){
      setStrength('border-[#F64A4A] bg-[#F64A4A]')
      setStrengthName('TOO WEAK!')
    }else if(counter === 2){
      setStrength('border-[#FB7C58] bg-[#FB7C58]')
      setStrengthName('WEAK')
    }else if(counter === 3){
      setStrength('border-[#F8CD65] bg-[#F8CD65]')
      setStrengthName('MEDIUM')
    }else if(counter === 4){
      setStrength('border-[#A4FFAF] bg-[#A4FFAF]')
      setStrengthName('STRONG')
    }else if(counter === 0){
      setStrength('border-[#A4FFAF] bg-[#A4FFAF]')
      setStrengthName('')
    }

    setCount(counter)
  }


  const handleCheckboxChange = (name) => {
    setCheckboxes(prev => ({...prev, [name]: !prev[name]}));
  };

  const lower = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i));
  const upper = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
  const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',]
  const symbol = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')']

  const calculate = () => {
      countClicked(checkboxes)
      let result = ''
      const working = []

      if(checkboxes['lowercase']){
        result += _.sample(lower)
        working.push(...lower)
      }
      if(checkboxes['uppercase']){
        if(sliderValue >= 2){
          result += _.sample(upper)
        }
        working.push(...upper)
      }
      if(checkboxes['numbers']){
        if(sliderValue >= 3){
          result += _.sample(number)
        }
        working.push(...number)
      }
      if(checkboxes['symbols']){
        if(sliderValue >= 4){
          result += _.sample(symbol)
        }
        working.push(...symbol)
      }

      const len = result.length

      for(let i = 0; i < (sliderValue - len); i++){
        result += _.sample(working)
      }
      
      setRes(result)
  }

  return (
    <>
      <Result 
      result = {res}
      count = {count}
      />
      <div className='flex flex-col items-center pt-[16px] lg:pt-[24px]'>

        <div className='flex min-w-[350px] lg:min-w-[540px] justify-between items-center px-[16px] lg:px-[32px] pt-[24px] pb-[16px] bg-gray'>
          <p className='text-difwhite text-[18px]'>Character Length</p>
          <p className='text-green text-[23px]'>{sliderValue}</p>
        </div>
        
        <div>
          
        </div>
        <div className='min-w-[350px] lg:min-w-[540px] bg-gray px-[16px] lg:px-[32px] flex flex-col text-left'>
          <div className='slidecontainer'>
              <input
                min="0" 
                max="20" 
                type="range" 
                className="slider w-full" 
                id="myRange"
                value={sliderValue}
                onChange={handleSliderChange}
                style={{ '--progress': `${progress}%` }} 
              />
          </div>
          <div className="text-difwhite flex gap-6 pt-[32px] pb-[20px] items-center">
            <label className="custom-checkbox cursor-pointer">
              <input 
                type="checkbox" 
                className="hidden-checkbox"
                checked={checkboxes.uppercase}
                onChange={() => handleCheckboxChange('uppercase')}
              />
              <span className="checkmark"></span>
            </label>
            Include Uppercase Letters
          </div>

          {/* Lowercase */}
          <div className="text-difwhite flex gap-6 pb-[20px] items-center">
            <label className="custom-checkbox cursor-pointer">
              <input 
                type="checkbox" 
                className="hidden-checkbox"
                checked={checkboxes.lowercase}
                onChange={() => handleCheckboxChange('lowercase')}
              />
              <span className="checkmark"></span>
            </label>
            Include Lowercase Letters
          </div>

          {/* Numbers */}
          <div className="text-difwhite flex gap-6 pb-[20px] items-center">
            <label className="custom-checkbox cursor-pointer">
              <input 
                type="checkbox" 
                className="hidden-checkbox"
                checked={checkboxes.numbers}
                onChange={() => handleCheckboxChange('numbers')}
              />
              <span className="checkmark"></span>
            </label>
            Include Numbers
          </div>

          {/* Symbols */}
          <div className="text-difwhite flex gap-6 pb-[20px] items-center">
            <label className="custom-checkbox cursor-pointer">
              <input 
                type="checkbox" 
                className="hidden-checkbox"
                checked={checkboxes.symbols}
                onChange={() => handleCheckboxChange('symbols')}
              />
              <span className="checkmark"></span>
            </label>
            Include Symbols
          </div>

          <div className='flex items-center justify-between bg-blackest py-[19px] px-[32px]'>
              <p className='text-blue font-bold text-[14px] lg:text-[16px]'>STRENGTH</p>
              <div className='flex gap-[15.5px] items-center'>
                  <div className='text-difwhite text-[16px] lg:text-[22px] font-bold'>{strengthName}</div>
                  <div className='flex gap-[4px]'>
                      <div className={`min-w-[10px] min-h-[28px] border-2 ${count >= 1 ? `${strength}` : 'border-difwhite'}`}></div>
                      <div className={`min-w-[10px] min-h-[28px] border-2 ${count >= 2 ? `${strength}` : 'border-difwhite'}`}></div>
                      <div className={`min-w-[10px] min-h-[28px] border-2 ${count >= 3 ? `${strength}` : 'border-difwhite'}`}></div>
                      <div className={`min-w-[10px] min-h-[28px] border-2 ${count >= 4 ? `${strength}` : 'border-difwhite'}`}></div>
                  </div>
              </div>
          </div>

          <div className='bg-green py-[19px] mt-[32px] cursor-pointer hover:bg-gray hover:border-2 hover:border-green hover:text-green hover:py-[17px] mb-[16px] lg:mb-[32px]'>
              <button onClick={calculate} className='flex items-center justify-center gap-[24px] w-full cursor-pointer'>GENERATE <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"/></svg></button>
          </div>
        </div>

      </div>
    </>
    
  )
}

export default Generate
