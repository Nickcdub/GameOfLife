class GameOfLife {
    constructor(w,h,size, percent) {
       Object.assign(this,w,h,size, percent);
       this.rows = [];
       this.rowSteps = Math.floor(w/size);
       this.colSteps = Math.floor(h/size);
       this.size = size;
       for(let i = 0; i < this.rowSteps; i++ ){
            let columns = [];
            for(let j = 0; j < this.colSteps; j++ ){
                if(randomInt(101)<percent) columns.push(1);
                else(columns.push(0));
            }
            this.rows.push(columns);

        }
    }

    update(){
        let temp = [];
        for(let i = 0; i < this.rowSteps; i++ ){
            let columns = [];
            for(let j = 0; j < this.colSteps; j++ ){
                let neighbors = this.countNeighbors(i,j);
                if(neighbors == 3) columns.push(1);
                else if(this.rows[i][j] == 1 && neighbors == 2){
                    columns.push(1);
                }
                else(columns.push(0));
            }
            temp.push(columns);
        }
        this.rows = temp;
    }

    draw(ctx){
        ctx.fillStyle = rgb(10,186,181);
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
          let count = 1;
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

};

