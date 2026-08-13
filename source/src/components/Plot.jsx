import { useEffect, useRef } from 'react'

/**
 * 极薄的 Plotly React 适配层。
 * 避免完整 plotly.js peer dependency，同时保留响应式绘图与高清导出能力。
 */
export default function Plot({ data, layout, config, style }) {
  const element = useRef(null)

  useEffect(() => {
    if (!element.current) return undefined
    const Plotly = window.Plotly
    if (!Plotly) {
      element.current.textContent = '可视化组件加载失败，请检查网络后刷新页面。'
      return undefined
    }
    Plotly.react(element.current, data, { autosize: true, ...layout }, config)
    const observer = new ResizeObserver(() => Plotly.Plots.resize(element.current))
    observer.observe(element.current)
    return () => {
      observer.disconnect()
      if (element.current) Plotly.purge(element.current)
    }
  }, [data, layout, config])

  return <div ref={element} style={style} />
}
