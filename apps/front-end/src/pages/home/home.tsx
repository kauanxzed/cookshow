import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import Logo from '../../assets/images/Logo.png';
import ModalDefault from '../recipe/recipe/recipe';

const SearchBar: React.FC = () => {
  const alimentos: string[] = [
    'Banana',
    'Maçã',
    'Laranja',
    'Morango',
    'Maionese',
    'Mostarda',
    'Molho de uva',
    'Maminha',
    'Uva',
    'Pêra',
    'Mamão',
    'Kiwi',
    'Melancia',
    'Abacaxi',
    'Carne',
    'Feijão',
    'Arroz',
    'Macarrão',
    'Peixe',
    'Frango',
    'Ovo',
    'Leite',
    'Queijo',
    'Iogurte',
    'Azeite',
    'Manteiga',
    'Açúcar',
    'Sal',
    'Café',
    'Suco',
    'Refrigerante',
    'Bolo',
    'Biscoito',
  ];

  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = alimentos.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    setSuggestions(value ? filtered.slice(0, 5) : []);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue) {
      setChips([...chips, inputValue]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const handleRemoveChip = (index: number) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  const addSuggestionToChips = (suggestion: string) => {
    setChips([...chips, suggestion]);
    setInputValue('');
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col w-full max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto justify-start items-center space-y-2 p-4 sm:p-8 mt-8 md:mt-4 lg:mt-0">
      <img
        src={Logo}
        alt="Logo CookShow"
        className="h-[120px] md:h-[130px] lg:h-[170px] w-auto mb-2.5 lg: mt-16"
      />
      <ModalDefault />

      <div className="w-full">
        <div
          className={`flex flex-wrap items-center border-2 ${
            isInputFocused ? 'border-orange-500' : 'border-gray-300'
          } rounded-lg p-1 md:p-2`}
        >
          <span
            className="text-lg mr-1 md:mr-2"
            aria-label="magnifying glass"
            role="img"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="27"
              height="27"
              viewBox="0,0,256,256"
            >
              <g
                fill="#787474"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <g transform="scale(5.33333,5.33333)">
                  <path d="M20.5,6c-7.99037,0 -14.5,6.50964 -14.5,14.5c0,7.99036 6.50963,14.5 14.5,14.5c3.45636,0 6.63371,-1.22096 9.12891,-3.25l9.81055,9.81055c0.37623,0.39185 0.9349,0.54969 1.46055,0.41265c0.52565,-0.13704 0.93616,-0.54754 1.07319,-1.07319c0.13704,-0.52565 -0.0208,-1.08432 -0.41265,-1.46055l-9.81055,-9.81055c2.02904,-2.4952 3.25,-5.67255 3.25,-9.12891c0,-7.99036 -6.50963,-14.5 -14.5,-14.5zM20.5,9c6.36905,0 11.5,5.13096 11.5,11.5c0,3.10261 -1.2238,5.90572 -3.20898,7.9707c-0.12237,0.08994 -0.23037,0.19794 -0.32031,0.32031c-2.06499,1.98518 -4.86809,3.20898 -7.9707,3.20898c-6.36905,0 -11.5,-5.13096 -11.5,-11.5c0,-6.36904 5.13095,-11.5 11.5,-11.5z"></path>
                </g>
              </g>
            </svg>
          </span>
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-1.5"
            >
              <span>{chip}</span>
              <button
                onClick={() => handleRemoveChip(index)}
                className="ml-1 relative bottom-0.5 md:ml-2 text-white"
              >
                x
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Digite os alimentos desejados..."
            className="p-1 flex-1 min-w-0 focus:outline-none"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="mt-2 bg-gray-100 rounded-md shadow">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="p-1.5 border-t border-gray-300 cursor-pointer text-orange-500 hover:bg-gray-200"
                onClick={() => addSuggestionToChips(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
