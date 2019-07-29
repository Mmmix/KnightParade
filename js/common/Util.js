export default class Util{

  getAngle(x, y, xMouse, yMouse) {
    // console.log(xMouse - x)
    // console.log(yMouse - y)
    // console.log(Math.atan2(xMouse - x,yMouse - y)/Math.PI*180)
    return Math.atan2(xMouse - x,yMouse - y)/Math.PI*180
  }
  // Config.Direction = { "0": "N", "1": "NE", "2": "E", "3": "SE", "4": "S", "5": "SW", "6": "W", "7": "NW" }
  getDirection(angle){
    // console.log(angle,angle/22.5)
    switch(Math.floor(angle/22.5)){
      case 0:
      case -1:
        // console.log("S")
        return 4
        break
      case 1:
      case 2:
        // console.log("SE")
        return 3
        break
      case 3:
      case 4:
        // console.log("E")
        return 2
        break
      case 5:
      case 6:
        // console.log("NE")
        return 1
        break
      case 7:
      case -8:
        // console.log("N")
        return 0
        break
      case -7:
      case -6:
        // console.log("NW")
        return 7
        break
      case -5:
      case -4:
        // console.log("W")
        return 6
        break
      case -3:
      case -2:
        // console.log("SW")
        return 5
        break
      default:
        break
    }
  }
}
