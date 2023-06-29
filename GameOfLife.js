function debounce(func, delay) {
    let timeoutIds = {};
  
    return function (...args) {
      const context = this;
  
      clearTimeout(timeoutIds[func]);
  
      timeoutIds[func] = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

class GameOfLife {
    constructor(w,h,size, percent) {
       Object.assign(this,w,h,size, percent);
       this.rows = [];
       this.rowSteps = Math.floor(w/size);
       this.colSteps = Math.floor(h/size);
       this.w = w;
       this.h = h;
       this.size = size;
       this.percent = percent;
       this.color = 23;
       this.rgb = false;
         
       this.initButtons();
       this.initSliders();
        
       this.load();
    }

    initButtons() {
        const button1 = document.getElementById('Rerun');
        const button2 = document.getElementById('Rainbow');

        button1.addEventListener('click', () => {
           this.rgb = false;
           this.color = 23;
           this.load();
        });
      
          button2.addEventListener('click', () => {
            this.rgb = !this.rgb
          });
    }
    

    initSliders() {
        const sizeSlider = document.getElementById('Size');
        const densitySlider = document.getElementById('Density');
        const sizeValueElement = document.getElementById('sizeValue');
        const densityValueElement = document.getElementById('densityValue');

       sizeValueElement.textContent = sizeSlider.value;
       densityValueElement.textContent = densitySlider.value;

       sizeSlider.addEventListener(
        "input",
        debounce((event) => {
            const value = event.target.value;
            this.updateSize(value);
            sizeValueElement.textContent = sizeSlider.value;
        }, 200) // Set the desired debounce delay (in milliseconds)
        );

        densitySlider.addEventListener(
            "input",
            debounce((event) => {
                const value = event.target.value;
                this.updateDensity(value);
                densityValueElement.textContent = densitySlider.value;
            }, 200) // Set the desired debounce delay (in milliseconds)
        );
    }

    load() {
        let array = [];
        for(let i = 0; i < this.rowSteps; i++ ){
            let columns = [];
            for(let j = 0; j < this.colSteps; j++ ){
                if(randomInt(101)<this.percent) columns.push(1);
                else(columns.push(0));
            }
            array.push(columns);

        }
        this.rows = array;
    }

    update(){
        if(this.rgb) {
            this.color = this.color+2;
             if(this.color > 360){
                this.color = 0;
            }
        }
        let temp = [];
        for(let i = 0; i < this.rowSteps; i++ ){
            let columns = [];
            for(let j = 0; j < this.colSteps; j++ ){
                let neighbors = this.countNeighbors(i,j);
                if(this.rows[i][j] == 1 && (neighbors == 3 || neighbors == 2)) columns.push(1);
                else if(this.rows[i][j] == 0 && neighbors == 3) columns.push(1);
                /*if(neighbors == 3) columns.push(1);
                else if(this.rows[i][j] == 1 && neighbors == 2){
                    columns.push(1);
                }*/
                else(columns.push(0));
            }
            temp.push(columns);
        }
        this.rows = temp;
    }

    draw(ctx){
        //ctx.fillStyle = rgb(10,186,181);
        ctx.fillStyle = hsl(this.color,100,50);
        for(let i = 0; i < this.rowSteps; i++ ){
            for(let j = 0; j < this.colSteps; j++ ){
                if (this.rows[i][j] == 1) ctx.fillRect(i*this.size,j*this.size,this.size,this.size);
            }
        }
    }

    countNeighbors(x,y){
        const neighbors = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
          ];
          let count = 0;
          let rowCount = this.rows.length;
          let colCount = this.rows[0].length;

        for (const [rowOffset, colOffset] of neighbors) {
            const newRow = x + rowOffset;
            const newCol = y + colOffset;
        
            // Check if the neighbor is within bounds
            if (newRow >= 0 && newRow < rowCount && newCol >= 0 && newCol < colCount) {
              if (this.rows[newRow][newCol] == 1) {
                count++;
              }
            }
        }
        return count;
    }

    updateSize(value) {
        const newSize = parseInt(value);
        this.size = newSize;
        this.rowSteps = Math.floor(this.w/this.size);
        this.colSteps = Math.floor(this.h/this.size);
        this.load();
        //this.updateGame(newSize,this.percent);
        /*const updatedGame = new GameOfLife(this.w, this.h, newSize, this.percent);
      
        // Assign the updated properties to "this"
        Object.assign(this, updatedGame);
      
        // Perform any additional actions needed when the size changes
        // ...
      
        // Call the update method to reflect the changes in the game
        this.update();*/
    }
    
    updateDensity(value) {
        // Update the density of the game grid and perform any necessary calculations
        const newPercent = parseInt(value);
        this.percent = newPercent;
        this.load();
        //this.updateGame(this.size,newPercent);
        /*const updatedGame = new GameOfLife(this.w, this.h, this.size, newPercent);
      
        // Assign the updated properties to "this"
        Object.assign(this, updatedGame);
      
        // Perform any additional actions needed when the size changes
        // ...
      
        // Call the update method to reflect the changes in the game
        this.update();*/
    }

    /*updateGame(size,percent) {
        const newGame = new GameOfLife(this.w,this.h,size,percent);
        Object.assign(this,newGame);

        this.update();
    }*/
    
      // Rest of your GameOfLife class methods...
    
};
