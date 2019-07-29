import Player from './player/index'
// import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Config from './common/Config.js'

const __ = {
  timer: Symbol('timer'),
}


let ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {

    this.renderLoopId = 0
    this.bindloopRender = this.loopRender.bind(this)
    this.updateInterval = 1000 / Config.UpdateRate
    this.bindloopUpdate = this.loopUpdate.bind(this)
    
    this.restart()
  }

  restart() {

    this.player = new Player()
    this.gameinfo = new GameInfo()
    this.background = new BackGround(ctx)

    this.updateInterval = 1000 / Config.UpdateRate
    this.updateTimes = 0
    this.lastRenderTime = new Date().getTime()

    //...
    //3.两个主循环
    if (this.updateTimer)
      clearInterval(this.updateTimer)
    this.updateTimer = setInterval(
      this.bindloopUpdate,
      this.updateInterval
    )
    if (this.renderLoopId != 0)
      window.cancelAnimationFrame(this.renderLoopId);
    this.renderLoopId = window.requestAnimationFrame(
      this.bindloopRender,
      canvas
    )
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.background.render(ctx)
    this.player.render(ctx)

    this.gameinfo.renderPlayer(ctx)
    if(Config.debug)
      this.gameinfo.renderDebug(ctx, this.player)
  }

  // 游戏逻辑更新主函数
  update(timeElapsed) {
    this.player.update(timeElapsed)
  }

  //-- 游戏数据【更新】主循环 ----
  loopUpdate() {
    let timeElapsed = 0
    if (!!this.lastUpdateTime) {
      timeElapsed = new Date().getTime() - this.lastUpdateTime
    }
    this.lastUpdateTime = new Date().getTime()
    this.update(timeElapsed)
  }

  //-- 游戏数据【渲染】主循环 ----
  loopRender() {
    this.render()
    this.renderLoopId = window.requestAnimationFrame(
      this.bindloopRender,
      canvas
    )
  }
}