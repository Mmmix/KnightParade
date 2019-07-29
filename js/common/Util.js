import Config from '../common/Config.js'

export default class Util{

  getAngle(x, y, xMouse, yMouse) {
    return Math.atan2(xMouse - x,yMouse - y)/Math.PI*180
  }
  // Config.Direction = {N:0,NE:1,E:2,SE:3,S:4,SW:5,W:6,NW:7}
  getDirection(angle){
    switch(Math.floor(angle/22.5)){
      case 0:
      case -1:
        return Config.Direction.S
        break
      case 1:
      case 2:
        return Config.Direction.SE
        break
      case 3:
      case 4:
        return Config.Direction.E
        break
      case 5:
      case 6:
        return Config.Direction.NE
        break
      case 7:
      case -8:
        return Config.Direction.N
        break
      case -7:
      case -6:
        return Config.Direction.NW
        break
      case -5:
      case -4:
        return Config.Direction.W
        break
      case -3:
      case -2:
        return Config.Direction.SW
        break
      default:
        break
    }
  }
}
