import { useEffect, useRef } from 'react';

interface ISelectProps {
  label?: string,
  optionalText?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  containerStyle?: string;
  allowClear?: boolean;
  disabled?: boolean;
  error?: string;
}

function Select({
  label = '',
  optionalText = '',
  placeholder = 'Select an option',
  options = [],
  value = '',
  onChange,
  containerStyle = '',
  allowClear = false,
  disabled = false,
  error = '',
}: ISelectProps) {

  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current && selectRef.current.value !== value) {
      selectRef.current.value = value;
    }
  }, [value]);

  const handleClear = () => {
    if (selectRef.current) {
      selectRef.current.value = '';
      onChange('');
    }
  };

  return (
    <div className={containerStyle}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label} 
          {optionalText && (
            <span className="text-[10px] sm:text-[12px] font-[200] sm:font-[300] text-gray-400">
              {optionalText}
            </span>
          )}
        </label>
      )}
      
      <div className={`mt-1 relative ${label ? 'mt-2' : ''}`}>
        <select
          ref={selectRef}
          value={value}
          disabled={disabled}
          className={`px-2 py-3 block w-full outline-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ${
            disabled ? 'bg-gray-100' : ''
          } ${
            error ? 'ring-red-500' : 'ring-gray-300 focus:ring-2 focus:ring-black'
          } sm:text-sm sm:leading-6`}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {allowClear && value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
            aria-label="Clear selection"
          >
            &times;
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default Select