View  = function(board){
  this.board = board
  this.hp = 10
  this.points = 0
  this.signature = 0
  this.color = ["#000000","#800100", "#c60200", "#ff5b5e"]
}

View.prototype = {
  spawn: function(location, monster){
    if (this.checkEmpty(location) === true){
      //ONLY HAPPENS IF A MONSTER ACTUALLY GETS PLACED
      monster.grid = location //OKAY MONSTER, YOUR TRUE LOCATION IS HERE.
      this.board.board[location] = monster
      $("#" + location).css("color", this.color[monster.hp-1])
      monster.signature = this.signature
      $("#" + location).attr("signature", this.signature)
      var timer = monster.timer
      monster.startDespawn(monster,this, timer)
      this.signature ++
      if (monster.spikey == true){
        $("#" + location).text("*")  
      }
      else {
        $("#" + location).text(monster.hp) // OKAY YOU APPEAR HERE. 
      }
    }
    else { 
      this.spawn(this.checkEmpty(location), monster)
    }
  },
  specialSpawn: function(monster){
    //loop until first location is empty, then loop again until second shit is empty


    //change how we get empty locations 


    var truelocation = parseInt($(".holder:empty").eq(Math.floor(Math.random() * $(".holder:empty").length))[0].id)
    $("#" + truelocation).text(" ")
    var fakelocation = parseInt($(".holder:empty").eq(Math.floor(Math.random() * $(".holder:empty").length))[0].id)


    // if (this.checkEmpty(fakelocation)===true && this.checkEmpty(truelocation)===true && fakelocation != truelocation){

      // I HAVE 2 INDICES IN BOARD THAT ARE SUPPOSEDLY EMPTY
      //I NOW PUT WHERE THE MONSTER TRUEL RESIDES AT
      var monsterFake = monster.makeFake() //SOMETHING THAT ACTS SOMETHING LIKE A MONSTER? it mostly just needs... a .grid/.signature.. maybe anothe flag 
      this.board.board[truelocation] = monster
      this.board.board[fakelocation] = monsterFake
      //^sets info for hp to be decreased
      $("#" + fakelocation).css("color", this.color[monster.hp-1])
      monster.grid = truelocation
      //^sets info that lets despawn logic work

      monster.signature = this.signature
      //^sets info that lets despawn logic work 

      $("#" + fakelocation).attr("signature", monster.signature)
      $("#" + truelocation).attr("signature", monster.signature)
      //^sets the signatures on the view so despawn logic will work

      $("#" + truelocation).attr("fake-location", fakelocation)
      //SET THE THING YOU CAN HITS FAKE-LOCATION TO THE FAKE LOCATION


      this.signature++

      var timer = monster.timer
      monster.startDespawn(monster,this,timer)
      // monsterFake.startDespawn(monsterFake,this,timer)
      //^starts despawn on both things so they do disappear
      monsterSymbol = monster.symbols[truelocation]
      //get the symbol that corresponds with the fake location given, set it to the monsters symbol
      $("#" + fakelocation).text(monsterSymbol)
      $("#" + truelocation).text("  ")
      //SPAWNS!

    // }
    // else {
    //   this.specialSpawn(this.checkEmpty(fakelocation), this.checkEmpty(truelocation), monster)
    // }
  },
  kill: function(id){

    // check if the place is empty AND not occupied
    if ($("#"+id).text() == "" || $("#"+id).text() =="T" || $("#"+id).text() =="Y" || $("#"+id).text() =="U" || $("#"+id).text() =="G" || $("#"+id).text() =="H" || $("#"+id).text() =="J" || $("#"+id).text() == "B" || $("#"+id).text() =="N" || $("#"+id).text() =="M" || $("#"+id).text() == "*" ){
      this.decreaseHp()  //change this to check the model or something
    }
    else {

      //HURT THE MONSTER
      this.board.board[id].hp--  


      //CHANGE MONSTER APPEARANCE IF ITS A BASIC TYPE
      if ($("#"+id).text() == 1 || $("#"+id).text() == 2 || $("#"+id).text() == 3 || $("#"+id).text() == 4){
        $("#"+id).text( $("#"+id).text() - 1 )
      }


      //CHANGE THE MONSTERS COLOR TOO 
      if ($("#"+id).attr("fake-location") != ""){
        ($("#"+$("#"+id).attr("fake-location")).css("color", this.color[this.board.board[id].hp-1]))
      }
      else{
        $("#"+id).css("color", this.color[this.board.board[id].hp-1])
      }
      if (this.board.board[id].hp == 0){

        //looks at the id you just hit, what signature does it have? itll clear whatever the signature is
        $("#" + id).text("")
 
        //get rid of the text at the fake-location
        if ($("#" + id).attr("fake-location") != ""){
          $("#" + $("#" + id).attr("fake-location")).text("")
          $("#" + id).attr("fake-location", "")
        } 
      }
      this.points++
      $("#points").text(this.points)
    }

    // NEED A KILL CHECK HERE. IF A GOOD KILL POINT INCREASE ETC ETC ETC.
  },
  // dKill: function(id){
  //   var monster = this.board.despawnList[id]
  //   if (this.board.despawnList[id].hp != 0){
  //     this.decreaseHp()
  //     if (this.board.board[monster.grid].signature == monster.signature){
  //       $("#"+monster.grid).text("")
  //     }

  //   }
  //   if (this.hp == 0){
  //     $("#death").text("GAME OVER")
  //     $("#gridplacer").css("display", "none")
  //   }
  // },
  checkEmpty: function(location){
    if ($("#" + location).text() == ""){
      return true
    }
    else {
      return Math.floor(Math.random()*9)
    }
  },
  decreaseHp: function(){
  if (this.hp > 0) {
    this.hp--
    $("#hp").text(this.hp)
  }
  if (this.hp == 0){
    $("#gridplacer").css("display", "none")
    $("#death").text("GAME OVER")
  }
  },
  win: function(){
    $("#gridplacer").css("display", "none")
    $("#death").text("LEVEL COMPLETE")
    return true
  },
  hit: function(id){
    if ( $("#" + id).text() != "" && $("#"+id).text() !="T" && $("#"+id).text() != "Y" && $("#"+id).text() != "U" && $("#"+id).text() !="G" && $("#"+id).text() !="H" && $("#"+id).text() !="J" && $("#"+id).text() != "B" && $("#"+id).text() !="N" && $("#"+id).text() !="M" && $("#"+id).text() != "*")  {
        $(".spawn_location .holder[id=" + id + "]").parent().css("background-color", "green")}
    else{
      $(".spawn_location .holder[id=" + id + "]").parent().css("background-color", "red")
    }
    setTimeout(function(){
      $(".spawn_location .holder[id=" + id + "]").parent().css("background-color", "#c8e99c")
    }, 125)
    











  }
}
