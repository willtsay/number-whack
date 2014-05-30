// on key press "kill" something

Monster = function(delay, special, hp, timer){
  this.dead = false
  this.hp = hp,  // number of times it needs to get hit before it dies
  this.timer = 3 //amount of time it stays out
  this.grid = null//where to spawn it
  this.keycode = null //what button kills it
  this.signature = null
  this.delay = delay
  this.spikey = null
  this.special = special
  this.symbols = ["T","Y","U","G","H","J","B","N","M"] 
  this.startDespawn = function(monster, view, timer){
    if (timer <= 0){ //TIMER HIT 0?? LETS SEE IF THE MONSTERES HP iS 0 OR NOT
      if (monster.hp > 0 && monster.spikey != true){  //LOOKS LIKE YOU DIDNT KILL HIM
        view.decreaseHp()
      }
      //IN ANY CASE, LETS MAKE SURE THIS SHITS THE RIGHT THING TO ERASE
      if ($("#" + monster.grid).attr("signature") == monster.signature){
        $("#" + monster.grid).text("")
        if ($("#" + $("#" + monster.grid).attr("fake-location")).attr("signature") == monster.signature) {
        $("#" + $("#" + monster.grid).attr("fake-location")).text("")

        $("#" + monster.grid).attr("fake-location", "")
      }
  
        }
            }
    setTimeout(function(){
      timer--
      if(timer >= 0){
        monster.startDespawn(monster, view, timer)
      } 
    }, 1000)

  }
}

Monster.prototype = {
  makeFake: function(){
    var monster = new Monster(0, false, 0, 3)
    return monster
  }
}



Board = function(){
  this.level = []
  this.complete = false
  this.board = [0,0,0,0,0,0,0,0,0]
}





Board.prototype = {
  createBasicMonster: function(delay, health){
    var monster = new Monster(delay, false, health)
    return monster
  },
  createSpecialMonster: function(delay, health){
    var monster = new Monster(delay, true, health)
    return monster
  },
  createSpikeyMonster: function(delay){
    var monster = new Monster(delay, false, 4)
    monster.spikey = true
    return monster
  },
  createBasicLevel: function(amount, delay, maxhp){
    this.level = []
    for ( var times= 0; times <= amount; times++ ) {
      var hp = Math.floor(Math.random()*maxhp+1)
      this.level.push(this.createBasicMonster(delay, hp))
    }
  },
  // createHardLevel: function(amount){
  //   for ( var times= 0; times <= amount; times++ ) {
  //     this.level.push(this.createSpecialMonster())
  //   }
  // },

  createMixedLevel:function(amount,delay,maxhp){
    this.level = []
    for ( var times= 0; times <= amount; times++ ) {
      var monsterType = Math.floor(Math.random()*2)
      var hp = Math.floor(Math.random()*maxhp+1)
      if (monsterType == 1){
        this.level.push(this.createSpecialMonster(delay, hp))
      }
      else{
        this.level.push(this.createBasicMonster(delay, hp))

      }

    }
  },
  createMedleyLevel:function(amount,delay,maxhp){
    this.level = []
    for ( var times= 0; times <= amount; times++ ) {
      var monsterType = Math.floor(Math.random()*5)
      var hp = Math.floor(Math.random()*maxhp+1)
      if (monsterType == 0 || monsterType == 1){
        this.level.push(this.createSpecialMonster(delay, hp))
      }
      else if(monsterType ==2 || monsterType == 3) {
        this.level.push(this.createBasicMonster(delay, hp))

      }
      else{
        this.level.push(this.createSpikeyMonster(delay))
      }
    }
  }
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



