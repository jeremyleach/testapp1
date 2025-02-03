import { rotatePoints,scaleAndShiftPoints, Vertex } from '../geometry.ts'

// to avoid js floating point giving very small numbers 
// on rotations which should actually be zero
// - just for testing purposes.
const roundPoints = (points: Vertex[]) => {
  return points.map(point => (
    {
      // have to "+ 0" to fix floating point -0 issue
      x: Math.round(point.x * 10000)/10000 + 0,
      y: Math.round(point.y * 10000)/10000 + 0
    }
  ))
}

test('rotate points', () => {
    const points: Vertex[] =  [
      {x: 0, y: 1},
      {x: 0, y: -1},
      {x: 1, y: 0}
    ]
    expect(roundPoints(rotatePoints(points, Math.PI / 2))).toEqual([
      {x: -1, y: 0},
      {x: 1, y: 0},
      {x: 0, y: 1}
    ])
})

test('scale and shift points', () => {
    const points: Vertex[] =  [
      {x: 0, y: 1},
      {x: 0, y: -1},
      {x: 1, y: 0}
    ]
    expect(scaleAndShiftPoints(points, 100, 10, 20)).toEqual([
      {x: 10, y: 120},
      {x: 10, y: -80},
      {x: 110, y: 20}
    ])
})
