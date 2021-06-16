function getRandomValue(min,max) {
    return Math.floor(Math.random()* (max-min)) + min;
    
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,            
            monsterHealth : 100,
            currentRound:0,
            winner: null
        }
    },
    watch: {
        playerHealth(value){
            if (value<=0 && this.monsterHealth<=0) {
                //draw  
                console.log('Draw');   
                this.winner = 'Draw';
            }else if (value <=0 ){
                //player lost
                console.log('player lost');
                this.winner = 'Monster';
            }
        },
        monsterHealth(value){
            if (value<=0 && this.playerHealth<=0) {
                //draw              
                console.log('Draw'); 
                this.winner = 'Draw'; 
            }else if (value <= 0 ){
                //monster lost
                console.log('monster lost');
                this.winner = 'Player';
            }

        }
    },
    computed: {
        monsterBarStyles(){
            if (this.monsterHealth < 0) 
                return {width: '0%'};
            
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles(){
            if (this.playerHealth < 0) 
                return {width: '0%'};
            return { width: this.playerHealth + '%' };
        },
        enableSpecialAttack(){
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        startGame(){
            this.playerHealth= 100,            
            this.monsterHealth=  100,
            this.currentRound =0,
            this.winner = null
        },
        attackMonster(){
            this.currentRound++;
            //reduce monster health
            const attackValue = getRandomValue(5,12)
            this.monsterHealth -= attackValue;
            console.log(this.monsterHealth);
            this.attackPlayer();
        },
        attackPlayer(){
            //reduce player health
            const attackValue = getRandomValue(8,15)
            this.playerHealth -= attackValue;
            console.log(this.playerHealth);
        },
        specialAttack(){
            this.currentRound++;            
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if (this.playerHealth + healValue >100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'Monster';
        }
    },

})
app.mount('#game');