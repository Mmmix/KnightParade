const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let paladin = new Image()
paladin.src = 'images/ic_paladin.png'
let swordman = new Image()
swordman.src = 'images/ic_swordman.png'

export default class GameInfo {
  renderPlayer(ctx) {
    ctx.drawImage(
      paladin,
      20,
      screenHeight - 80,
      45, 60
    )
    ctx.drawImage(
      swordman,
      80,
      screenHeight - 80,
      45, 60
    )
  }

  renderDebug(ctx,player){
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    let vertx = [10, 140, 660, 660, 400, 250, 10,10]
    let verty = [60, 60, 260, 370, 370, 200, 190,60]

    ctx.beginPath()
    ctx.lineWidth = "2";
    ctx.moveTo(10,60)
    for(var i=1;i<vertx.length;i++){
      ctx.lineTo(vertx[i],verty[i])
    }
    ctx.stroke(); // 进行绘制


    ctx.fillText(
      player.x,
      10,
      30
    )
    ctx.fillText(
      player.y,
      10,
      70
    )
    ctx.fillText(
      player.currDirection,
      300,
      30
    )
  }
  onTouchEvent(xMouse,yMouse,player){
    
  }
}
 GameInfo.icPaladinArea = {
  startX: 20,
  startY: screenHeight - 80,
  endX: 65,
  endY: screenHeight - 20
}

GameInfo.icSwordmanArea = {
  startX: 80,
  startY: screenHeight - 80,
  endX: 125,
  endY: screenHeight - 20
}