import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Editor, Toolbar } from '@wangeditor-next/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor-next/editor';
import '@wangeditor-next/editor/dist/css/style.css';
import './index.scss';

export default forwardRef((_props, ref) => {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器内容
  const [html, setHtml] = useState('');

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: ['headerSelect', 'blockquote', 'emotion', 'group-video', 'group-image', 'formatPainter', 'divider', 'codeBlock', 'numberedList', 'bulletedList', 'todo', 'fontFamily', 'fontSize', 'fontColor'],
  };

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '记录此刻美好...',
    autoFocus: true, // 默认获取焦点
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  // 暴露方法
  useImperativeHandle(ref, () => {
    return {
      setValue: (value: string) => {
        setHtml(value);
      },
      getValue: () => {
        return editor?.getHtml();
      },
    };
  }, [editor]);

  return (
    <div className="overflow-hidden border border-stroke rounded-xl z-40 w-full">
      <Toolbar editor={editor} defaultConfig={toolbarConfig} mode="default" className="border-b border-stroke" />

      <Editor defaultConfig={editorConfig} value={html} onCreated={setEditor} onChange={(editor) => setHtml(editor.getHtml())} mode="default" className="min-h-64" />
    </div>
  );
});
