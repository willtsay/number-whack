$(document).ready(function() {
  var board = new Board()
  var view = new View(board)
  var controller = new Controller(view, board)
  controller.currentLevel = 0
  controller.bindListeners()
  $("#gridplacer").css("display", "none")

})

Controller = function(view,board){
  this.gameover = false
  this.view = view
  this.board = board
  this.completed = 0
  this.levels = []
  this.currentLevel = 0
}


Controller.prototype = {
  bindListeners: function(){
    $('body').keydown(this.whack.bind(this))
    $('#start').click(this.startCurrentLevel.bind(this))
  },
  start: function(){
    this.board.createHardLevel(10)
    // this.board.createLevel(10, this.board.createMixedMonster)
    this.spawnMonstersLoop(this.view, this, this.board, 0)
    // this.despawnMonstersLoop(this.view, this, this.board, 0) 
  },
  spawnMonstersLoop: function(view, controller, board, i){
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    // CHECK MONSTER TYPE -> IF SPECIAL RUN SPECIAL SPAWN LOOP
    var monsterLocation = Math.floor(Math.random()*9) 
    var monster = board.level[i]
    if (monster.special === true){
      view.specialSpawn(monster)
    }
    else {
    view.spawn(monsterLocation, monster)
    }
    i++                     //  increment the counter
    if (i < board.level.length) {            //  if the counter < 10, call the loop function
      controller.spawnMonstersLoop(view, controller, board, i);             //  ..  again which will trigger another 
    }
    if (i==board.level.length) {
      controller.checkWin(5, view, controller)
    }
    }, board.level[i].delay)
  },
  checkWin: function(timer, view, controller){
    setTimeout(function(){
      if (timer>0){
        timer--
        controller.checkWin(timer, view, controller)
      }
      if (timer==0 && view.hp != 0){
        controller.gameover = view.win()
        $("#start").css("display", "")
      }
    }, 1000)
  },
  whack: function(e){
    if (this.view.hp <= 0 || this.gameover){
      e.preventDefault()
      var ajaxRequest = $.ajax({
        url: '/newscore',
        type: 'GET',
        data: {highscore: this.view.points}
      })
    }
    else if (e.keyCode == 84){
      this.view.hit(0)
      this.view.kill(0)
    }
    else if (e.keyCode == 89) {
      this.view.hit(1)
      this.view.kill(1)
    }
    else if (e.keyCode == 85) {
      this.view.hit(2)
      this.view.kill(2)
    }
    else if (e.keyCode == 71) {
      this.view.hit(3)
      this.view.kill(3)

    }
    else if (e.keyCode == 72) {
      this.view.hit(4)
      this.view.kill(4)

    }
    else if (e.keyCode == 74) {
      this.view.hit(5)
      this.view.kill(5)
    }
    else if (e.keyCode == 66) {
      this.view.hit(6)
      this.view.kill(6)
    }
    else if (e.keyCode == 78) {
      this.view.hit(7)
      this.view.kill(7)
    }
    else if (e.keyCode == 77) {
      this.view.hit(8)
      this.view.kill(8)
    }
    else{

    }
 },
 startCurrentLevel: function(){
  $("#level").text(this.currentLevel)
  switch (this.currentLevel) {
    case 0:
      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      this.board.createBasicLevel(10, Math.floor(Math.random()*2500 + 500), 1)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break       
    case 1:

      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      $("#death").text("")
      this.gameover = false
      this.board.createBasicLevel(10, Math.floor(Math.random()*2500 + 500), 2)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
    case 2:
    $("#gridplacer").css("display", "")
    $("#start").css("display", "none")
    $("#death").text("")
    this.gameover = false
      this.board.createMixedLevel(15, Math.floor(Math.random()*2000 + 500), 2)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
    case 3:
      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      $("#death").text("")
      this.gameover = false    
      this.board.createMedleyLevel(15, Math.floor(Math.random()*2000 + 500), 2)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
    case 4:
      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      $("#death").text("")
      this.gameover = false    
      this.board.createMedleyLevel(15, Math.floor(Math.random()*2000 + 500), 3)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
    case 5:
      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      $("#death").text("")
      this.gameover = false    
      this.board.createMedleyLevel(20, Math.floor(Math.random()*1500 + 500), 4)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
    case 6:
      $("#gridplacer").css("display", "")
      $("#start").css("display", "none")
      $("#death").text("")
      this.gameover = false    
      this.board.createMedleyLevel(20, Math.floor(Math.random()*1000 + 500), 4)
      this.view.signature = 0
      this.spawnMonstersLoop(this.view, this, this.board, 0)
      this.currentLevel++
      break
  }
  

 }
   // despawnMonstersLoop: function(view, controller, board, i){
  //   setTimeout(function () {  // loop through level and do a .kill and such

  //     setTimeout(function() {view.dKill(i)}, 3000)
  //     i++
  //     if (i < board.level.length) {
  //       controller.despawnMonstersLoop(view,controller,board, i)
  //     }
  //     if (i == board.level.length){
  //       controller.checkCompleteLoop(view, controller)
  //     }
  //   }, board.level[i].delay)
  // },
  // checkCompleteLoop: function(view, controller){
  //   setTimeout(function() {
  //     controller.completed++
  //     if (view.hp > 0 && controller.completed <= 4){
  //       console.log(controller.completed)
  //       controller.checkCompleteLoop(view,controller)
  //     }
  //     if (controller.completed >= 4){
  //       console.log("hello")
  //       view.win()
  //     }
  //   }, 1000)
  // },
}



//0 b 66 
//1 h 72 
//2 u 85
//3 n 78 
//4 j 74 
//5 i 73
//6 m 77 
//7 k 75 
//8 l 76