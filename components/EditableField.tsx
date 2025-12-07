import React, { useState, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange, className = "", placeholder, multiline = false }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleBlur = () => {
    onChange(internalValue);
  };

  const commonClasses = `bg-transparent hover:bg-yellow-50 focus:bg-yellow-100 transition-colors border-b border-dashed border-gray-300 focus:border-blue-500 focus:outline-none print:border-none print:bg-transparent ${className}`;

  if (multiline) {
    return (
      <textarea
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onBlur={handleBlur}
        className={`${commonClasses} w-full resize-none`}
        placeholder={placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={handleBlur}
      className={commonClasses}
      placeholder={placeholder}
    />
  );
};

export default EditableField;