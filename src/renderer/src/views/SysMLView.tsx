import React, { useState, useMemo, useRef, useEffect } from 'react'
import SplitPane from '../components/SplitPane'
import { Stage, Layer, Rect, Text } from 'react-konva'

// A very basic parser and renderer
const parseAndRender = (text: string) => {
  const lines = text.split('\n').filter((line) => line.trim() !== '')
  const elements = lines.map((line, index) => {
    // This is a placeholder for a real SysML parser and layout engine.
    // It just creates a box for each line of text.
    const props = {
      key: index,
      x: 20,
      y: 20 + index * 40,
      width: 200,
      height: 30,
      fill: 'lightblue',
      stroke: 'black',
      strokeWidth: 1
    }
    const textProps = {
      key: `text-${index}`,
      x: 30,
      y: 25 + index * 40,
      text: line,
      fontSize: 14,
      fill: 'black'
    }
    return { rect: props, text: textProps }
  })
  return elements
}

const SysMLView: React.FC = () => {
  const [sysmlText, setSysmlText] = useState(
    `package "My System" {
  part def "Block A" {
    attribute "myAttribute": String
  }
  part def "Block B"
  connect "Block A" to "Block B"
}`
  )

  const renderedElements = useMemo(() => parseAndRender(sysmlText), [sysmlText])
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }
    checkSize()
    const resizeObserver = new ResizeObserver(checkSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div className="h-full w-full flex flex-col">
      <SplitPane split="vertical">
        <div className="h-full w-full p-4">
          <textarea
            className="w-full h-full border rounded-md p-2 font-mono"
            value={sysmlText}
            onChange={(e) => setSysmlText(e.target.value)}
            placeholder="Enter SysML v2 text here..."
          />
        </div>
        <div ref={containerRef} className="h-full w-full p-4 bg-gray-50">
          <Stage width={dimensions.width} height={dimensions.height}>
            <Layer>
              {renderedElements.map((el) => (
                <React.Fragment key={el.rect.key}>
                  <Rect {...el.rect} />
                  <Text {...el.text} />
                </React.Fragment>
              ))}
            </Layer>
          </Stage>
        </div>
      </SplitPane>
    </div>
  )
}

export default SysMLView
