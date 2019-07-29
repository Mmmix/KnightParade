const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let paladin = new Image()
paladin.src = 'images/ic_paladin.png'
let swordman = new Image()
swordman.src = 'images/ic_swordman.png'

export default class GameInfo {
  renderPlayer(ctx, player) {
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

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