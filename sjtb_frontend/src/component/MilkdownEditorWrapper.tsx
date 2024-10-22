'use client'

import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { Milkdown, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { MilkdownProvider } from '@milkdown/react'
import { gfm } from '@milkdown/kit/preset/gfm';
import { history, historyProviderConfig  } from '@milkdown/kit/plugin/history';

import { indent, indentConfig } from '@milkdown/kit/plugin/indent'

import { clipboard } from '@milkdown/kit/plugin/clipboard'
import { trailing } from '@milkdown/kit/plugin/trailing'
import { usePluginViewFactory } from '@prosemirror-adapter/react';

// import { tooltip, TooltipView } from './Tooltip';

import '@milkdown/theme-nord/style.css';

const markdown = `# Milkdown Next Commonmark
> You're scared of a world where you're needed.  
   
   
This is a demo for using Milkdown with **Next**.`

const MilkdownEditor: React.FC = () => {
  const pluginViewFactory = usePluginViewFactory();

  useEditor((root) => {
    return Editor
      .make()
      .config(ctx => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        // historyProviderConfig에 파라미터 설정 (redo, undo 주기 수정)
        // redo, undo 횟수 제한도 풀고 싶은데 일단 보류
        ctx.set(historyProviderConfig.key, {
          depth: 12, // 원하는 depth 값
          newGroupDelay: 120, // 원하는 newGroupDelay 값
        })


      })
      .config(nord)
      .use(commonmark)
      .use(history)
      .use(indent)
      .use(trailing)
      .use(clipboard)
      .use(gfm)
  }, [])

  return ( 
    <Milkdown />
  )
}

export const MilkdownEditorWrapper: React.FC = () => {
  return (
    <MilkdownProvider>
      <MilkdownEditor />
    </MilkdownProvider>
  );
};
