  //IMPROVE 有效区域判断
  export default class Area {
    isInArea(testx, testy) {
      if (testx < 0 || testx > 680 || testy < 60 || testy > 320) { //IMPROVE:....
        return false
      }

      let vertx = [0, 140, 680, 680, 320, 250, 0]
      let verty = [60, 60, 260, 320, 320, 200, 190]
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
  }
  