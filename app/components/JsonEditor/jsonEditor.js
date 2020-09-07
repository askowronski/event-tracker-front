import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import React from 'react';

export const JsonEditor = props => {
  return <Editor value={props.value} onChange={props.onChange} />;
};
