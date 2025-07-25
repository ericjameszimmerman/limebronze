import React, { useRef, useEffect, useContext, useState } from 'react'
import { Stage, Layer, Rect, Text, Arrow } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import { ViewBoxContext, ViewBoxProvider } from '../contexts/ViewBoxContext'

const MAP_WIDTH = 1200
const MAP_HEIGHT = 800

// 1. Main Diagram Component
const Diagram: React.FC = () => {
  const stageRef = useRef<any>(null)
  const { setScale, setStagePos } = useContext(ViewBoxContext)!

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault()
    const stage = stageRef.current
    if (!stage) return

    const oldScale = stage.scaleX()
    const pointer = stage.getPointerPosition()

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale
    }

    const newScale = e.evt.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1
    setScale(newScale)

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale
    }
    stage.position(newPos)
    setStagePos(newPos)
  }

  const handleDragEnd = () => {
    if (stageRef.current) {
      setStagePos(stageRef.current.position())
    }
  }

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth * 0.8} // Adjust as needed
      height={window.innerHeight - 100} // Adjust as needed
      draggable
      onWheel={handleWheel}
      onDragEnd={handleDragEnd}
      scaleX={useContext(ViewBoxContext)!.scale}
      scaleY={useContext(ViewBoxContext)!.scale}
      x={useContext(ViewBoxContext)!.stagePos.x}
      y={useContext(ViewBoxContext)!.stagePos.y}
    >
      <Layer>
        {/* Placeholder static block diagram */}
        <Rect x={100} y={100} width={150} height={80} fill="lightblue" stroke="black" />
        <Text x={140} y={135} text="Block A" />

        <Rect x={400} y={250} width={150} height={80} fill="lightgreen" stroke="black" />
        <Text x={440} y={285} text="Block B" />

        <Rect x={200} y={450} width={150} height={80} fill="lightcoral" stroke="black" />
        <Text x={240} y={485} text="Block C" />

        <Arrow points={[250, 140, 400, 290]} tension={0.5} stroke="black" />
        <Arrow points={[475, 330, 275, 450]} tension={0.5} stroke="black" />
      </Layer>
    </Stage>
  )
}

// 2. Minimap Component
const Minimap: React.FC = () => {
  const { scale, stagePos } = useContext(ViewBoxContext)!
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const minimapRef = useRef<any>(null)
  const viewboxRectRef = useRef<any>(null)

  const MINIMAP_SCALE = 0.2
  const MINIMAP_WIDTH = MAP_WIDTH * MINIMAP_SCALE
  const MINIMAP_HEIGHT = MAP_HEIGHT * MINIMAP_SCALE

  useEffect(() => {
    setViewBox({
      x: -stagePos.x * MINIMAP_SCALE / scale,
      y: -stagePos.y * MINIMAP_SCALE / scale,
      width: (window.innerWidth * 0.8) / scale * MINIMAP_SCALE,
      height: (window.innerHeight - 100) / scale * MINIMAP_SCALE,
    })
  }, [scale, stagePos])

  const handleDragMove = () => {
    if (viewboxRectRef.current) {
        const { x, y } = viewboxRectRef.current.getPosition();
        const { setStagePos } = useContext(ViewBoxContext)!;
        setStagePos({
            x: -x / MINIMAP_SCALE * scale,
            y: -y / MINIMAP_SCALE * scale,
        });
    }
  }

  return (
    <div className="absolute bottom-5 right-5 border-2 border-gray-400 bg-white bg-opacity-70">
      <Stage width={MINIMAP_WIDTH} height={MINIMAP_HEIGHT} ref={minimapRef}>
        <Layer scaleX={MINIMAP_SCALE} scaleY={MINIMAP_SCALE}>
            {/* Mirrored content from main diagram */}
            <Rect x={100} y={100} width={150} height={80} fill="lightblue" stroke="black" />
            <Rect x={400} y={250} width={150} height={80} fill="lightgreen" stroke="black" />
            <Rect x={200} y={450} width={150} height={80} fill="lightcoral" stroke="black" />
            <Arrow points={[250, 140, 400, 290]} tension={0.5} stroke="black" />
            <Arrow points={[475, 330, 275, 450]} tension={0.5} stroke="black" />
        </Layer>
        <Layer>
            <Rect
                ref={viewboxRectRef}
                {...viewBox}
                fill="rgba(0,0,255,0.2)"
                stroke="blue"
                strokeWidth={2 / scale}
                draggable
                onDragMove={handleDragMove}
            />
        </Layer>
      </Stage>
    </div>
  )
}


// 3. Zoom Controls
const ZoomControls: React.FC = () => {
    const { scale, setScale } = useContext(ViewBoxContext)!;

    const handleZoomIn = () => setScale(scale * 1.2);
    const handleZoomOut = () => setScale(scale / 1.2);

    return (
        <div className="absolute top-5 right-5 flex flex-col space-y-1">
            <button onClick={handleZoomIn} className="px-2 py-1 bg-gray-200 border rounded shadow">+</button>
            <button onClick={handleZoomOut} className="px-2 py-1 bg-gray-200 border rounded shadow">-</button>
            <div className="px-2 py-1 bg-gray-100 text-sm rounded">
                {`${Math.round(scale * 100)}%`}
            </div>
        </div>
    )
}


// 4. Main View Component
const CanvasView: React.FC = () => {
  return (
    <ViewBoxProvider>
      <div className="relative w-full h-full bg-gray-100">
        <Diagram />
        <Minimap />
        <ZoomControls />
      </div>
    </ViewBoxProvider>
  )
}

export default CanvasView
