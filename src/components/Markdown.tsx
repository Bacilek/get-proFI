import 'katex/dist/katex.min.css'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { rehypeSections, remarkPrettify } from './prettify'

/** `lesson` = long-form lesson text: split into blocks, cards per section, boxed formulas. */
export function Markdown({ children, lesson = false }: { children: string; lesson?: boolean }) {
  return (
    <div className={lesson ? 'prose-lesson lesson-rich' : 'prose-lesson'}>
      <ReactMarkdown remarkPlugins={lesson ? [remarkGfm, remarkMath, remarkPrettify] : [remarkGfm, remarkMath]}
        rehypePlugins={lesson ? [rehypeKatex, rehypeSections] : [rehypeKatex]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
