import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './style.css';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class TextAreaWithEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    text: '',
  };

  onEditorStateChange = editorState => {
    const text = editorState.getCurrentContent().getPlainText();
    this.props.onChange(text);
    this.setState({
      editorState,
      text,
    });
  };

  render() {
    const { editorState, text } = this.state;

    return (
      <Editor
        editorState={editorState}
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          options: ['inline', 'fontSize'],
          inline: {
            inDropdown: false,
            options: ['bold', 'italic', 'underline'],
          },
        }}
      />
    );
  }
}

export default TextAreaWithEditor;
