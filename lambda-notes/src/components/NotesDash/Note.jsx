import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'slate-react';
// import { Value } from 'slate';
import Code from '@convertkit/slate-code';
import PasteLinkify from 'slate-paste-linkify';
import InsertImages from 'slate-drop-or-paste-images';
import DropOrPasteImages from 'slate-drop-or-paste-images';
// import initialValue from './value.json';

import { useStateValue } from 'react-conflux';
import { notesContext } from '../../store/contexts';
import { SET_CURRENT_NOTE } from '../../store/constants';

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
const Note = props => {
    const [state, dispatch] = useStateValue(notesContext);

    const onChange = ({ value }) => {
        console.log(state.currentNote);
        console.log(value);

        // Check to see if the document has changed before saving.
        // if (value.document !== state.currentNote) {
        // const content = JSON.stringify(value.toJSON());
        // localStorage.setItem('content', value);
        // }
        // props.setState({ value });
        dispatch({
            type: SET_CURRENT_NOTE,
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

    return (
        <Styles>
            <Editor
                className="editor"
                value={state.currentNote}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                commands={commands}
                queries={queries}
                renderNode={renderNode}
                plugins={plugins}
            />
        </Styles>
    );
};

export default Note;

const Styles = styled.div`
    padding: 10px;
    .editor {
        line-height: 1.4;
        height: 100%;
        min-height: 800px;
        font-size: 1.3rem;
    }
`;
