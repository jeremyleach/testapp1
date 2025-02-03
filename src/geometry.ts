// Define the structure of a single vertex
export interface Vertex {
  x: number
  y: number
  radius?: number
}

// Get vertices for a specific shape, rotated around centre.
export const rotatePoints = (points: Vertex[], angle: number) => {

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);

    const vertices: Vertex[] = points.map((vertex: Vertex) => ({
        x: (cosA * vertex.x - sinA * vertex.y),
        y: (sinA * vertex.x + cosA * vertex.y),
        radius: vertex.radius
    }))
    return vertices
}

// scale and translate the points of a shape
export const scaleAndShiftPoints = (points: Vertex[], scale: number, deltaX: number, deltaY: number) => {
    return points.map(point => ({
        x: point.x * scale + deltaX,
        y: point.y * scale + deltaY,
        radius: point.radius ? point.radius * scale : undefined
    }))
}
