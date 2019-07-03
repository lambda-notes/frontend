import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Editor } from 'slate-react';
import Code from '@convertkit/slate-code';
import PasteLinkify from 'slate-paste-linkify';
import InsertImages from 'slate-drop-or-paste-images';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import { isKeyHotkey } from 'is-hotkey';
import { Button, Icon, Toolbar } from './components';

import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { MODIFY_CURRENT_NOTE, SET_NOTE_TITLE } from '../../store/constants';

class Image extends React.Component {
  state = {};

  componentDidMount() {
    const { node } = this.props;
    const { data } = node;
    const file = data.get('file');
    this.load(file);
  }

  load(file) {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      this.setState({ src: reader.result })
    );
    reader.readAsDataURL(file);
  }

  render() {
    const { attributes } = this.props;
    const { src } = this.state;
    return src ? (
      <img {...attributes} src={src} alt="default" />
    ) : (
      <div {...attributes}>Loading...</div>
    );
  }
}
const commands = {
  wrapLink(change, url) {
    change.wrapInline({ type: 'link', data: { url } });
  },
  unwrapLink(change) {
    change.unwrapInline('link');
  }
};

const queries = {
  isLinkActive(editor, value) {
    const { inlines } = value;
    const active = inlines.some(i => i.type === 'link');
    return active;
  }
};

const plugins = [
  PasteLinkify(),
  DropOrPasteImages({
    insertImage: (transform, file) => {
      return transform.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file }
      });
    }
  }),
  InsertImages({
    extensions: ['png', 'jpg'],
    insertImage: (change, file) => {
      return change.insertBlock({
        type: 'image',
        isVoid: true,
        data: { file }
      });
    }
  }),
  Code({
    highlight: true,
    block: 'code',
    line: 'code-line',
    classNames: {
      block: 'code',
      line: 'code-line'
    }
  })
];
/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const Note = props => {
  const [state, dispatch] = useStateValue(notesContext);
  const { note } = state.currentNote;
  console.log(note);

  const onChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== state.currentNote.note.document) {
      const content = JSON.stringify(value);
      localStorage.setItem('content', content);
    }

    dispatch({
      type: MODIFY_CURRENT_NOTE,
      payload: value
    });
  };
  const handleKeyDown = (event, editor, next) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case 'y':
          event.preventDefault();
          editor.insertCode({
            code: '<h1>Heading 1</h1>',
            language: 'html'
          });
          break;
        default:
          return next();
      }
    } else {
      return next();
    }
  };
  const renderNode = (props, next) => {
    const { node, attributes, children } = props;
    switch (node.type) {
      case 'image':
        return <Image {...props} />;
      case 'link':
        return (
          <a {...attributes} href={node.data.get('url')}>
            {children}
          </a>
        );
      default:
        return next();
    }
  };

  const handleChanges = e => {
    dispatch({ type: SET_NOTE_TITLE, payload: e.target.value });
  };

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  const hasMark = type => {
    // const { value } = this.state;
    return note.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  const hasBlock = type => {
    // const { value } = this.state;
    return note.blocks.some(node => node.type === type);
  };

  /**
   * Store a reference to the `editor`.
   *
   * @param {Editor} editor
   */

  let editor = useRef(null);

  return (
    <Styles>
      <input
        placeholder="Untitled"
        type="text"
        value={state.currentNote.noteTitle}
        onChange={handleChanges}
      />
      <Toolbar>
        {renderMarkButton('bold', 'format_bold')}
        {renderMarkButton('italic', 'format_italic')}
        {renderMarkButton('underlined', 'format_underlined')}
        {renderMarkButton('code', 'code')}
        {renderBlockButton('heading-one', 'looks_one')}
        {renderBlockButton('heading-two', 'looks_two')}
        {renderBlockButton('block-quote', 'format_quote')}
        {renderBlockButton('numbered-list', 'format_list_numbered')}
        {renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </Toolbar>
      <Editor
        className="editor"
        spellCheck
        autoFocus
        value={state.currentNote.note}
        onChange={onChange}
        // onKeyDown={handleKeyDown}
        onKeyDown={onKeyDown}
        commands={commands}
        queries={queries}
        renderNode={renderNode}
        plugins={plugins}
        renderBlock={renderBlock}
        renderMark={renderMark}
        ref={editor}
      />
    </Styles>
  );

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  function renderMarkButton(type, icon) {
    const isActive = hasMark(type);

    return (
      <Button active={isActive} onMouseDown={event => onClickMark(event, type)}>
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  function renderBlockButton(type, icon) {
    let isActive = hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        note: { document, blocks }
      } = state.currentNote;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = hasBlock('list-item') && parent && parent.type === type;
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  }

  /**
   * Render a Slate block.
   *
   * @param {Object} props
   * @return {Element}
   */

  function renderBlock(props, editor, next) {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  function renderMark(props, editor, next) {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Editor} editor
   */

  // onChange = ({ value }) => {
  //   this.setState({ value })
  // }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Editor} editor
   * @return {Change}
   */

  function onKeyDown(event, editor, next) {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  function onClickMark(event, type) {
    event.preventDefault();
    editor.toggleMark(type);
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  function onClickBlock(event, type) {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = hasBlock(type);
      const isList = hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  }
};

export default Note;

const Styles = styled.div`
  border: 1px solid #dedede;
  margin-top: 15px;
  padding: 20px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);
  box-shadow: 0px 0px 5px -1px rgba(0, 0, 0, 0.14);

  .editor {
    line-height: 1.4;
    height: calc(100vh - 230px);
    overflow-y: scroll;
    font-size: 1.6rem;
    margin-top: 20px;
  }

  input {
    font-size: 2.5rem;
    border: 0;
    font-weight: 700;
    outline: none;
    width: 100%;
  }
`;
