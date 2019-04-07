import React from 'react';
import { Input } from 'reactstrap';
import Editor from './Editor';

const TextField = props => {
  const { values, onChange, withEditor = false } = props;
  const { value, config } = values;

  const editorBlockStyle = {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#CED4DA',
    borderRadius: 5,
  };

  return !withEditor ? (
    <Input
      type="textarea"
      {...config}
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
    />
  ) : (
    <div style={editorBlockStyle}>
      <Editor value={value} onChange={onChange} />
    </div>
  );
};

export default TextField;
