import React from 'react';

export const TextInput = (props) => {
  const onSubmit = event => {
    const form = event.target;
    event.preventDefault();

    // A) Prevent "trailing space " submissions
    const value = form.input.value.trim();
    // B) Prevent "empty" submissions
    if (!value) return;

    props.onSubmit(value);
    form.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="TextForm__input"
        name="input"
        placeholder={props.placeholder}
        autoComplete="off"
      />
    </form>
  );
}