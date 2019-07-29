
import Util from '../common/Util'
import Animation from '../base/animation'
import GameInfo from '../runtime/gameinfo'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// // 玩家相关常量设置
// const PLAYER_IMG_SRC = ''
// const PLAYER_WIDTH = 80
// const PLAYER_HEIGHT = 80

let gameinfo = new GameInfo()

export default class Player { //TEMP
  constructor(x, y) {
    // super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT) //TEMP

    // 玩家默认处于屏幕底部居中位置
    this.name = "Swordman"
    this.x = screenWidth / 2 + 50
    this.y = screenHeight - 100
    this.speed = 10
    this.xspeed = 0
    this.yspeed = 0

    this.isFindWay = false

    this.tempx = 250
    this.tempy = 200

    this.PaladinAnim = new Animation('images/Paladin.png', require('../base/json.js'), {
      stand: Animation.STAND_FRAMES,
      move: Animation.MOVE_FRAMES
    }, "Paladin")
    this.SwordmanAnim = new Animation('images/Swordman.png', require('../base/json.js'), {
      stand: Animation.STAND_FRAMES,
      move: Animation.MOVE_FRAMES
    }, "Swordman")

    this.destX = this.x
    this.destY = this.y

    this.status = "Stand"
    this.currDirection = 0

    this.util = new Util() //TEMP

    // 初始化事件监听
    this.initEvent()
  }

  update(timeElapsed) {

    if (this.name == 'Swordman')
      this.SwordmanAnim.update(timeElapsed, this.status)
    else
      this.PaladinAnim.update(timeElapsed, this.status)

    // this.moveTo(timeElapsed)
    switch (this.status) {
      case "Stand":
        this.stand()
        break
      case "Move":
        this.moveTo(timeElapsed)
    }

  }

  stand(){
    if(this.name=="Swordman"){
      if (this.SwordmanAnim.isFinished()) {
        this.SwordmanAnim.start()
        this.changeDirection()
      }
    }else{
      if (this.PaladinAnim.isFinished()) {
        this.PaladinAnim.start()
        this.changeDirection()
      }
    }
    
  }

  change() {
    if (this.name == 'Swordman') {
      this.name = "Paladin"
      this.speed = 10
    } else {
      this.name = "Swordman"
      this.speed = 6
    }
  }

  changeDirection() {
    let random = Math.floor(Math.random()*3) - 1
    this.currDirection = (this.currDirection + random + 8) % 8
  }

  render(ctx) {
    if (this.name == 'Paladin')
      this.PaladinAnim.render(ctx, Math.floor(this.x), Math.floor(this.y), this.currDirection, 80, 80)
    else
      this.SwordmanAnim.render(ctx, Math.floor(this.x), Math.floor(this.y), this.currDirection, 80, 80)
  }

  moveTo(timeElapsed) {
    let tempX = this.destX,
      tempY = this.destY
    if (this.isFindWay) {
      tempX = this.tempx
      tempY = this.tempy
    }
    let a = this.util.getAngle(this.x, this.y, tempX, tempY)
    this.xspeed = Math.sin(a / 180 * Math.PI) * this.speed
    this.yspeed = Math.cos(a / 180 * Math.PI) * this.speed
    this.currDirection = this.util.getDirection(a)
    if (Math.abs(this.x - tempX) >= Math.abs(this.xspeed))
      this.x += this.xspeed
    if (Math.abs(this.y - tempY) >= Math.abs(this.yspeed)) {
      this.y += this.yspeed
    }
    if (Math.abs(this.x - tempX) < Math.abs(this.xspeed) && Math.abs(this.y - tempY) < Math.abs(this.yspeed)) {
      if (this.isFindWay == false) {
        this.status = "Stand"
      } else {
        this.isFindWay = false
      }
    }
  }

  //点击坐标是否在区域内

  isInActiveArea(testx, testy) {
    if (testx < 0 || testx > 680 || testy < 60 || testy > 390) { //IMPROVE:....
      return false
    }

    let vertx = [0, 140, 680, 680, 400, 250, 0]
    let verty = [60, 60, 260, 390, 390, 200, 190]
    let i = 0
    let j = 0
    let nvert = 7
    let c = false
    for (i = 0, j = nvert - 1; i < nvert; j = i++) {
      if (((verty[i] > testy) != (verty[j] > testy)) &&
        (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
        c = !c;
    }
    return c;
  }

  //路径是否超出边界

  isCrossActiveArea(testx, testy, x, y) {
    let vertx = [320, 250, 0]
    let verty = [320, 200, 190]

    if (((testx > 250) != (x > 250)) &&
      (vertx[0] < (x - testx) * (verty[0] - testy) / (y - testy) + testx) &&
      (vertx[1] > (x - testx) * (verty[1] - testy) / (y - testy) + testx) &&
      (vertx[2] < (x - testx) * (verty[2] - testy) / (y - testy) + testx))
      return true
    return false
  }


  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  initEvent() {
    this.hasEventBind = true
    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)

  }

  touchEventHandler(e) {
    // e.preventDefault()
    let xMouse = e.touches[0].clientX
    let yMouse = e.touches[0].clientY
    if (this.isInActiveArea(xMouse, yMouse)) {
      this.destX = xMouse
      this.destY = yMouse
      this.status = "Move"
      if (this.isCrossActiveArea(xMouse, yMouse, this.x, this.y)) {
        this.isFindWay = true
      }
    } else {
      if (xMouse >= GameInfo.icPaladinArea.startX &&
        xMouse <= GameInfo.icPaladinArea.endX &&
        yMouse >= GameInfo.icPaladinArea.startY &&
        yMouse <= GameInfo.icPaladinArea.endY) {
        if (this.name != "Paladin") {
          this.change()
        }
      } else if (xMouse >= GameInfo.icSwordmanArea.startX &&
        xMouse <= GameInfo.icSwordmanArea.endX &&
        yMouse >= GameInfo.icSwordmanArea.startY &&
        yMouse <= GameInfo.icSwordmanArea.endY) {
        if (this.name != "Swordman") {
          this.change()
        }
      } else {
        wx.showToast({
          title: '无效区域',
          icon: 'none'
        })
      }
      // this.gameinfo.onTouchEvent(xMouse,yMouse,this)
    }

  }

}