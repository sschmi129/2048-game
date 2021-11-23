import React, { useEffect, useState } from 'react';
import './App.css';

interface Tile {
  id: number,
  value: number
}


function App() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState<number>(0);
  const [zeroValueArray, setZeroValueArray] = useState<number[]>();
  const [tileColor] = useState<any>(
    {
      2: '#eee4da', 4: '#ede0c8', 8: '#f3b27a', 16: '#f69664',
      32: '#f77c5f', 64: '#f75f3b', 128: '#edd073', 256: '#f3b27a',
      512: '#f3b27a', 1024: '#f3b27a', 2048: '#eee4da'
    }
  );
  const [win, setWin] = useState<boolean>(false);
  const [lose, setLose] = useState<boolean>(false);
  // const [i, setI] = useState<number>(0);

  useEffect(() => {
    if (!win && !lose) {
      let i = Date.now();
      console.log('i: ' + i);
      const logger = (e: KeyboardEvent) => {
        i = i + 1000;
        console.log(i);
      }
      window.addEventListener('keydown', keyPressHandler);
      return () => {
        window.removeEventListener('keydown', keyPressHandler);
      };
    }
  });



  //initializing tiles + random values for tiles
  useEffect(() => {
    let tempTiles: Tile[] = [];
    for (let i = 0; i < 16; i++) {
      tempTiles.push({ id: i, value: 0 });
    }
    let x: number;
    let y: number;
    do {
      x = Math.floor(Math.random() * 16);
      y = Math.floor(Math.random() * 16);
    } while (x === y);
    tempTiles[x].value = 2;
    tempTiles[y].value = 2;
    // tempTiles[0].value = 2;
    // tempTiles[1].value = 4;
    // tempTiles[2].value = 2;
    // tempTiles[3].value = 4;
    // tempTiles[4].value = 4;
    // tempTiles[5].value = 2;
    // tempTiles[6].value = 4;
    // tempTiles[7].value = 2;
    // tempTiles[8].value = 2;
    // tempTiles[9].value = 4;
    // tempTiles[10].value = 2;
    // tempTiles[11].value = 4;
    // tempTiles[12].value = 4;
    // tempTiles[13].value = 2;
    // tempTiles[14].value = 4;
    // tempTiles[15].value = 2;
    setTiles(tempTiles);
  }, []);



  useEffect(() => {
    if (typeof (tiles) !== 'undefined') {
      tiles.map((tile) => {
        if (tile.value === 2048) {
          setWin(true);
        }
      });
    }
  }, [tiles]);

  const keyPressHandler = (e: KeyboardEvent) => {
    e.preventDefault();
    let changed = false;
    let tempScore = score;
    if (e.code === 'ArrowLeft') {
      let x = 0;
      for (let k = 0; k < 4; k++) {
        loopX:
        for (let i = x; i < x + 3; i++) {
          if (tiles[i].value === 0) {
            for (let j = i + 1; j < x + 4; j++) {
              if (tiles[j].value !== 0) {
                changed = true;
                tiles[i].value = tiles[j].value;
                tiles[j].value = 0;
                i--;
                break;
              }
              if (tiles[j].value !== 0 && j === x + 3) {
                break loopX;
              }
            }
          } else {
            for (let j = i + 1; j < x + 4; j++) {
              if (tiles[j].value === 0) {
                continue;
              }
              if (tiles[j].value === tiles[i].value) {
                changed = true;
                tiles[i].value = tiles[i].value + tiles[j].value;
                tiles[j].value = 0;
                tempScore = tempScore + tiles[i].value + tiles[j].value;
                break;
              } else {
                break;
              }
            }
          }
        }
        x = x + 4;
      }
    } else if (e.code === 'ArrowUp') {
      let x = 0;
      for (let k = 0; k < 4; k++) {
        for (let i = x; i < tiles.length; i = i + 4) {
          if (tiles[i].value === 0) {
            for (let j = i + 4; j < tiles.length; j = j + 4) {
              if (tiles[j].value !== 0) {
                changed = true;
                tiles[i].value = tiles[j].value;
                tiles[j].value = 0;
                i = i - 4;
                break;
              }
            }
          } else {
            for (let j = i + 4; j < tiles.length; j = j + 4) {
              if (tiles[j].value === 0) {
                continue;
              }
              if (tiles[j].value === tiles[i].value) {
                changed = true;
                tiles[i].value = tiles[i].value + tiles[j].value;
                tiles[j].value = 0;
                tempScore = tempScore + tiles[i].value + tiles[j].value;
                break;
              } else {
                break;
              }
            }
          }
        }
        x = x + 1;
      }
    } else if (e.code === 'ArrowRight') {
      let x = 15;

      for (let k = 0; k < 4; k++) {
        loopX:
        for (let i = x; i >= x - 3; i--) {
          if (tiles[i].value === 0) {
            for (let j = i - 1; j >= x - 3; j--) {
              if (tiles[j].value !== 0) {
                changed = true;
                tiles[i].value = tiles[j].value;
                tiles[j].value = 0;
                i = i + 1;
                break;
              }
              if (tiles[j].value !== 0 && j === x - 3) {
                break loopX;
              }
            }
          } else {
            for (let j = i - 1; j >= x - 3; j--) {
              if (tiles[j].value === 0) {
                continue;
              }
              if (tiles[i].value === tiles[j].value) {
                changed = true;
                tiles[i].value = tiles[i].value + tiles[j].value;
                tiles[j].value = 0;
                tempScore = tempScore + tiles[i].value + tiles[j].value;
                break;
              } else {
                break;
              }
            }
          }
        }
        x = x - 4;
      }
    } else if (e.code === 'ArrowDown') {
      let x = 15;
      for (let k = 0; k < 4; k++) {
        for (let i = x; i >= 0; i = i - 4) {
          if (tiles[i].value === 0) {
            for (let j = i - 4; j >= 0; j = j - 4) {
              if (tiles[j].value !== 0) {
                changed = true;
                tiles[i].value = tiles[j].value;
                tiles[j].value = 0;
                i = i + 4;
                break;
              }
            }
          } else {
            for (let j = i - 4; j >= 0; j = j - 4) {
              if (tiles[j].value === tiles[i].value) {
                if (tiles[j].value === 0) {
                  continue;
                }
                changed = true;
                tiles[i].value = tiles[i].value + tiles[j].value;
                tiles[j].value = 0;
                tempScore = tempScore + tiles[i].value + tiles[j].value;
                break;
              } else {
                break;
              }
            }
          }
        }
        x = x - 1;
      }
    } else {
      return;
    }
    let tempZeroValueArray: number[] = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].value === 0) {
        tempZeroValueArray.push(i);
      }
    }
    //setTiles only if position or value changed
    if (changed === true) {

      if (typeof (tempZeroValueArray) !== 'undefined') {
        tiles[tempZeroValueArray[Math.floor(tempZeroValueArray.length * Math.random())]].value = 2;
      }
      setZeroValueArray([...tempZeroValueArray])
      setTiles([...tiles]);
      setScore(tempScore);
    } else {
      if (tempZeroValueArray.length === 0) {
        let tempLose = true;
        for (let i = 0; i < tiles.length; i++) {
          if (i === 15) {
            break;
          }
          if (i === 3 || i === 7 || i === 11) {
            if (tiles[i].value === tiles[i + 4].value) {
              tempLose = false;
            }
            continue;
          }
          if (i === 12 || i === 13 || i === 14) {
            if (tiles[i].value === tiles[i + 1].value) {
              tempLose = false;
            }
            continue;
          }
          console.log(i);
          if (tiles[i].value === tiles[i + 1].value || tiles[i].value === tiles[i + 4].value) {
            tempLose = false;
            continue;
          }
        }
        setLose(tempLose);
      }
    }
  }

  function tileDrawer(): JSX.Element | JSX.Element[] {
    if (typeof (tiles) !== 'undefined') {
      let tileGrid = [];
      for (let i: number = 0; i < tiles.length; i++) {
        if (tiles[i].value === 0) {
          tileGrid.push(
            <div className='Tile' id={(tiles[i].id).toString()}></div>
          );
        } else {
          tileGrid.push(
            <div className='Tile' style={{ backgroundColor: tileColor[tiles[i].value] /*backgroundColorPicker(tiles[i].id)*/ }} id={(tiles[i].id).toString()}>{tiles[i].value}</div>
          );
        }
      }
      return tileGrid;
    } else {
      return <></>;
    }
  }

  function mainDrawer() {
    let tempMain = [];
    if (win === true) {
      tempMain.push(
        <main className="Main">
          <div className="GameField">
            {tileDrawer()}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }} >Score: {score}</div>
          <div className='LoseWinLayerShow'>
            <h1 style={{ top: '100px' }}>You Won!!!</h1>
            <button onClick={(e) => window.location.reload()}>New Game</button>
          </div>
        </main>)
      return tempMain;
    }
    if (lose === true) {
      tempMain.push(
        <main className="Main">
          <div className="GameField">
            {tileDrawer()}
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }} >Score: {score}</div>
          <div className='LoseWinLayerShow'>
            <h1 style={{ top: '100px' }}>You Lost!!!</h1>
            <button onClick={(e) => window.location.reload()}>New Game</button>
          </div>
        </main>)
      return tempMain;
    } else {
      tempMain.push(
        <main className="Main">
          <div className="GameField" >
            {tileDrawer()}
          </div>
          {/* <div style={{ whiteSpace: 'pre-wrap' }} >Score: {score}</div> */}
        </main>)
      return tempMain;
    }
  }

  return (
    <div className="App">
      <header>
        <h1>
          2048
        </h1>
      </header>
      {mainDrawer()}
    </div>
  );
}

export default App;
