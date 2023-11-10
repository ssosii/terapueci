import { h, render, Component } from 'preact';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class Editor extends Component {
    constructor(props) {
        super(props);
        this.setContent = props.setContent;
        this.content = props.content;

    }

    render() {
        return (

            <CKEditor
                editor={ClassicEditor}
                data={this.content}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    this.setContent(data);
                    // console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    // console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    // console.log('Focus.', editor);
                }}
            />

        );
    }
}

export default Editor;