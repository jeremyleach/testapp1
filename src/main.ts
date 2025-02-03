import { Application, Graphics, Text } from 'pixi.js'
import { Vertex, rotatePoints, scaleAndShiftPoints } from './geometry' 
import shapesData from './shapes.json' 

// Define the structure of the shapes object
interface ShapesJson {
  [shapeName: string]: Vertex[]
}

type AllowedShapes = keyof typeof shapesData
const shapes: ShapesJson = shapesData
const shapeNames: AllowedShapes[] = Object.keys(shapes) as AllowedShapes[]

// colurs for background and stroke of shape
const colours = [
  "0xFF0000", // red
  "0x00FF00", // green
  "0xFFFF00", // yellow
  "0x0000FF", // blue
]

// stroke widths to cycle through
const widths = [
  2,4,6,8
]

// Create the PixiJS application
const app = new Application()
const defaultSize = 100.0;

(async () => {
  await app.init({
      antialias: true,
      resizeTo: window,
      backgroundColor: 0xeeeeee    
  })

  // add canvas to page
  document.body.appendChild(app.canvas)

  // Create shape
  let shape = new Graphics()
  let shapeText = new Text({

  })
  
  // Set rotation parameters
  let currentRotation = 0
  let zoom = 1.0
  let shapeIndex = 0
  let colourIndex = 0
  let bgIndex = 1
  let widthIndex = 0
  
  const renderScene = () => {

    shape.clear();
    
    // Calculate new points and draw
    const rotatedPoints = rotatePoints(shapes[shapeNames[shapeIndex]], currentRotation)
    const scaledPoints = scaleAndShiftPoints(rotatedPoints, defaultSize * zoom, app.screen.width/2, app.screen.height/2)

    shape.moveTo(scaledPoints[0].x, scaledPoints[0].y)      
    for(let i=1; i<=scaledPoints.length; i++) {
      // do an arc if we have a radius defined (for the rounded rectangle)
      if(typeof scaledPoints[i % scaledPoints.length].radius !== 'undefined') {
        shape.arcTo(
          scaledPoints[i % scaledPoints.length].x, 
          scaledPoints[i % scaledPoints.length].y,
          scaledPoints[(i+1) % scaledPoints.length].x, 
          scaledPoints[(i+1) % scaledPoints.length].y,
          scaledPoints[(i) % scaledPoints.length].radius ||= 0
        )
      } else {
        // otherwise straight line.
        shape.lineTo(scaledPoints[i % scaledPoints.length].x, scaledPoints[i % scaledPoints.length].y)
      }
    }
    
    shape.fill(colours[bgIndex])
    .stroke({ color: colours[colourIndex], width: widths[widthIndex] })

    // set the text to new shape name
    shapeText.text = shapeNames[shapeIndex]
    shapeText.x = app.screen.width/2 - shapeText.width/2; // show text in x-axis centre
    shapeText.y = 10; // bit of top margin
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const key = event.key;

    switch(key) {
      case 'ArrowUp':
        if(zoom < 4) zoom *= 1.2
        break
      case 'ArrowDown':
        if(zoom > 0.25) zoom /= 1.2
        break
      case 'ArrowLeft':
        currentRotation -= Math.PI / 20
        break
      case 'ArrowRight':
        currentRotation += Math.PI / 20
        break
      case 's':
        shapeIndex++
        shapeIndex %= shapeNames.length
        break
      case 'e':
        colourIndex++
        colourIndex %= colours.length
        break
      case 'b':
        bgIndex++
        bgIndex %= colours.length
        break
      case 't':
        widthIndex++
        widthIndex %= widths.length
        break;
      default:
        break
    }
    console.log(key)
    renderScene()
  }

  app.renderer.on('resize', () => {
    renderScene()
  })

  document.addEventListener('keydown', onKeyDown)

  app.stage.addChild(shape)
  app.stage.addChild(shapeText)

  // we call renderScene three times in this code, here on init, on resize and after keypress. 
  // Alternatively we could just call once in an ticker animation loop but that would be wasteful as 
  // we're not actually doing animations. 
  renderScene() 
})()
