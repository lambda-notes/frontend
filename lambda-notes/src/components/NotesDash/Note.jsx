import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import Code from '@convertkit/slate-code';
import PasteLinkify from 'slate-paste-linkify';
import InsertImages from 'slate-drop-or-paste-images';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import initialValue from './value.json';

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

class Note extends React.Component {
    constructor() {
        super();
        this.state = {
            value: Value.fromJSON(initialValue)
        };
    }

    componentDidMount = () => {
        let existingValue = JSON.parse(localStorage.getItem('content'));
        if (existingValue) {
            this.setState.value = existingValue;
        }
    };
    commands = {
        wrapLink(change, url) {
            change.wrapInline({ type: 'link', data: { url } });
        },
        unwrapLink(change) {
            change.unwrapInline('link');
        }
    };

    queries = {
        isLinkActive(editor, value) {
            const { inlines } = value;
            const active = inlines.some(i => i.type === 'link');
            return active;
        }
    };
    plugins = [
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

    onChange = ({ value }) => {
        // Check to see if the document has changed before saving.
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON());
            localStorage.setItem('content', content);
        }
        this.setState({ value });
    };
    handleKeyDown = (event, editor, next) => {
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
    renderNode = (props, next) => {
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
    render() {
        const existingValue = JSON.parse(localStorage.getItem('content'));

        return (
            <Styles>
                <Editor
                    className="editor"
                    value={this.state.value}
                    onChange={this.onChange}
                    // onKeyDown={handleKeyDown}
                    commands={this.commands}
                    queries={this.queries}
                    renderNode={this.renderNode}
                    plugins={this.plugins}
                />
            </Styles>
        );
    }
}

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
