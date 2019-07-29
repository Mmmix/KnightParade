import Player     from './player/index'
// import Enemy      from './npc/enemy'
// import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import Music      from './runtime/music'
import DataBus    from './databus'
import Config from './common/Config.js'

const __ = {
  timer: Symbol('timer'),
}


let ctx   = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0

    // 静态背景
    this.bg = new Image()
    this.bg.src = './images/background.jpg'

    this.renderLoopId = 0
    this.bindloopRender = this.loopRender.bind(this)
    this.updateInterval = 1000 / Config.UpdateRate
    this.bindloopUpdate = this.loopUpdate.bind(this)

    this.restart()
  }

  restart() {

    

    databus.reset()

        

    // canvas.removeEventListener(
    //   'touchstart',
    //   this.touchHandler
    // )

    // this.bg       = new BackGround(ctx)
    this.player   = new Player()
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.updateInterval = 1000 / Config.UpdateRate
    this.updateTimes = 0
    this.lastRenderTime = new Date().getTime()

    // this.bindLoop     = this.loop.bind(this)
    // this.hasEventBind = false

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
    // // 清除上一局的动画
    // window.cancelAnimationFrame(this.aniId);

    // this.aniId = window.requestAnimationFrame(
    //   this.bindLoop,
    //   canvas
    // )
  }

  

  

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    // console.log(databus.frame)
    if(databus.frame)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      this.bg,
      0, 0, window.innerWidth, window.innerHeight
    )
    

    this.player.render(ctx)

    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderPlayer(ctx, this.player)

    // // 游戏结束停止帧循环
    // if ( databus.gameOver ) {
    //   this.gameinfo.renderGameOver(ctx, databus.score)

    //   if ( !this.hasEventBind ) {
    //     this.hasEventBind = true
    //     this.touchHandler = this.touchEventHandler.bind(this)
    //     canvas.addEventListener('touchstart', this.touchHandler)
    //   }
    // }
  }

  // 游戏逻辑更新主函数
  update(timeElapsed) {
    if ( databus.gameOver )
      return;
    this.player.update(timeElapsed)

    databus.frame++  //IMPROVE
  }

  //-- 游戏数据【更新】主循环 ----
  loopUpdate() {
    let timeElapsed = new Date().getTime() - this.lastUpdateTime
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

  // // 实现游戏帧循环
  // loop() {
  //   databus.frame++

  //   this.update()
  //   this.render()

  //   this.aniId = window.requestAnimationFrame(
  //     this.bindLoop,
  //     canvas
  //   )
  // }
}
