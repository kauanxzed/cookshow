import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import Logo from '../../assets/images/CookSHOW.png';

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const filtered = alimentos.filter((item) =>
        item.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
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
        className="h-[120px] md:h-[170px] lg:h-[200px] w-auto mb-1 md:mb-2"
      />

      <div className="w-full">
        <div className="flex flex-wrap items-center border-2 border-orange-500 rounded-lg p-1 md:p-2">
          <span
            className="text-lg mr-1 md:mr-2"
            aria-label="magnifying glass"
            role="img"
          >
            🔍
          </span>
          {chips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center bg-orange-500 text-white rounded-xl px-1 m-1 md:px-2 md:m-1.5"
            >
              <span>{chip}</span>
              <button
                onClick={() => handleRemoveChip(index)}
                className="ml-1 md:ml-2 text-white"
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
