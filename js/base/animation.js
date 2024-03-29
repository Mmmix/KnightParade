/**
 * 简易的帧动画类实现
 */
export default class Animation {
  constructor(atlasImgSrc, atlasTexture, frameNames, roleType, frameRate = 6.6) {
    this.atlasImg = new Image()
    this.atlasImg.src = atlasImgSrc
    // this.allFrameNames = allFrameNames
    this.roleType = roleType
    this.interval = 1000 / frameRate
    this.frameNames = frameNames
    // this.frameNames = this.allFrameNames.stand
    // this.count = this.frameNames.length
    this.atlasTexture = atlasTexture.dataList.atlas.texture;//Temp
    this.init()
  }

  //初始化（frame[]）
  init() {
    this.standFrames = []
    this.moveFrames = []
    for (var i in this.frameNames.stand) {
      var frame = this.atlasTexture[this.roleType].frames[this.frameNames.stand[i]]
      this.standFrames.push({
        sX: frame.x,
        sY: frame.y,
        sW: frame.width,
        sH: frame.height,
        offsetX: frame.offsetX,
        offsetY: frame.offsetY,
        width: frame.width,
        height: frame.height
      })
    }
    for (var i in this.frameNames.move) {
      var frame = this.atlasTexture[this.roleType].frames[this.frameNames.move[i]]
      this.moveFrames.push({
        sX: frame.x,
        sY: frame.y,
        sW: frame.width,
        sH: frame.height,
        offsetX: frame.offsetX,
        offsetY: frame.offsetY,
        width: frame.width,
        height: frame.height
      })
    }
    this.status = 'Stand'
    this.frames = this.standFrames
    this.count = this.frames.length
    this.start()
  }

  start() {
    this.age = 0
    this.index = 0
    this.currentFrame = this.frames[this.index]
  }

  finish() {
    this.age = this.count * this.interval
    this.index = this.count
  }

  isFinished() {
    return this.age / this.interval >= this.count
  }

  changeStatus() {
    if (this.status == 'Stand') {
      this.status = 'Move'
      this.frames = this.moveFrames
    } else {
      this.status = 'Stand'
      this.frames = this.standFrames
    }
  }

  //更新
  update(timeElapsed, status = 'Stand') {
    if (this.status != status) {
      this.changeStatus()
    }
    this.age = this.age + timeElapsed
    this.index = Math.floor(this.age / this.interval) % this.count
    this.currentFrame = this.frames[this.index]
  }

  // 渲染
  render(ctx, x, y, dirction, width = 0, height = 0) {

    this.currentFrame.sY = dirction * this.atlasTexture[this.roleType].maxFrameHeight
    this.currentFrame.destX = x - this.currentFrame.width / 2
    this.currentFrame.destY = y - this.currentFrame.height / 2
    ctx.drawImage(
      this.atlasImg,
      this.currentFrame.sX,
      this.currentFrame.sY,
      this.currentFrame.sW,
      this.currentFrame.sH,
      this.currentFrame.destX,
      this.currentFrame.destY,
      this.currentFrame.width,
      this.currentFrame.height
    )
  }

}

Animation.MOVE_FRAMES = ['move01', 'move02', 'move03', 'move04', 'move05', 'move01']
Animation.STAND_FRAMES = ['stand01', 'stand02', 'stand03', 'stand04', 'stand05', 'stand01']