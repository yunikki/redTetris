import { creatSpeactre } from "./creatSpectre"

let rotating_piece = [];

export function clearRotatingPiece(socketID) {
    //if (rotating_piece[socketID]){
    console.log("Piece cleared :", rotating_piece[socketID])
    rotating_piece[socketID] = undefined;
    console.log("After clear :", rotating_piece[socketID])
    //}
}

function getBarShape(grid, x, y, max_x, max_y, socketID) {
    if (rotating_piece[socketID] == undefined) {
        if ((x > 0 && grid[x - 1][y][0] == 'P') || x < max_x - 1 && grid[x + 1][y][0] == 'P')
            rotating_piece[socketID] = ['..#.', '..#.', '..#.', '..#.', [x, y - 2]];
        else
            rotating_piece[socketID] = ['....', '####', '....', '....', [x - 1, y]];
    }
    else {
        if (rotating_piece[socketID][1] == "####")
            rotating_piece[socketID][4] = [x - 1, y]
        else if (rotating_piece[socketID][0] == "..#.")
            rotating_piece[socketID][4] = [x, y - 2]
        else if (rotating_piece[socketID][0] == ".#..")
            rotating_piece[socketID][4] = [x, y - 1]
        else
            rotating_piece[socketID][4] = [x - 2, y]
    }
}

function getTShape(grid, x, y, max_x, max_y) {
    let local_pos
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        local_pos = ['###.', '.#..', '....', '....', [x, y + 1]]
    }
    else {
        if (x < max_x - 1 && y < max_y - 1 && grid[x + 1][y + 1][0] == 'P') {
            if (y > 0 && x < max_x - 1 && grid[x + 1][y - 1][0] == 'P')
                local_pos = ['.#..', '###.', '....', '....', [x + 1, y]]
            else
                local_pos = ['#...', '##..', '#...', '....', [x + 1, y]]
        }
        else
            local_pos = ['.#..', '##..', '.#..', '....', [x + 1, y]]
    }
    return local_pos
}

function getLShape(grid, x, y, max_x, max_y) {
    let local_pos
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        if (y < max_y - 2 && grid[x][y + 2][0] == 'P')
            local_pos = ['###.', '#...', '....', '....', [x, y + 1]];
        else
            local_pos = ['##..', '.#..', '.#..', '....', [x + 1, y + 1]]
    }
    else {
        if (x < max_x - 2 && grid[x + 2][y][0] == 'P')
            local_pos = ['#...', '#...', '##..', '....', [x + 1, y]]
        else
            local_pos = ['..#.', '###.', '....', '....', [x + 1, y - 1]]
    }
    return local_pos
}

function getlShape(grid, x, y, max_x, max_y) {
    let local_pos
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        if (y < max_y - 2 && grid[x][y + 2][0] == 'P')
            local_pos = ['###.', '..#.', '....', '....', [x, y + 1]];
        else
            local_pos = ['##..', '#...', '#...', '...', [x + 1, y]]
    }
    else {
        if (x < max_x - 2 && grid[x + 2][y][0] == 'P')
            local_pos = ['.#..', '.#..', '##..', '....', [x + 1, y]]
        else
            local_pos = ['#...', '###.', '....', '....', [x + 1, y + 1]]
    }
    return local_pos
}

function T_Rotate(grid, t_info, max_x, max_y) {
    let rot_x = t_info[4][0]
    let rot_y = t_info[4][1]
    if (t_info[0] == '###.' && t_info[1] == '.#..') {
        if (rot_x > 0) {
            if (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S') {
                grid[rot_x - 1][rot_y] = 'PT'
                grid[rot_x][rot_y + 1] = '.'
            }
        }
    }
    else if (t_info[0] == '.#..' && t_info[1] == '###.') {
        if (rot_x < max_x - 1) {
            if (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S') {
                grid[rot_x + 1][rot_y] = 'PT'
                grid[rot_x][rot_y - 1] = '.'
            }
        }
    }
    else if (t_info[0] == '#...' && t_info[1] == '##..' && t_info[2] == '#...') {
        if (rot_y > 0) {
            if (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S') {
                grid[rot_x][rot_y - 1] = 'PT'
                grid[rot_x - 1][rot_y] = '.'
            }
        }
    }
    else {
        if (rot_y < max_y - 1) {
            if (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S') {
                grid[rot_x][rot_y + 1] = 'PT'
                grid[rot_x + 1][rot_y] = '.'
            }
        }
    }
    return grid;
}

function L_Rotate(grid, L_info, max_x, max_y) {
    let rot_x = L_info[4][0]
    let rot_y = L_info[4][1]
    if (L_info[0] == '###.' && L_info[1] == '#...') {
        if (rot_x < max_x - 1 && rot_x > 0) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')) {
                grid[rot_x + 1][rot_y] = 'PL'
                grid[rot_x - 1][rot_y] = 'PL'
                grid[rot_x - 1][rot_y - 1] = 'PL'
                grid[rot_x][rot_y - 1] = '.'
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x + 1][rot_y - 1] = '.'
            }
        }
    }
    else if (L_info[0] == '##..' && L_info[1] == '.#..' && L_info[2] == '.#..') {
        if (rot_y < max_y - 1 && rot_x > 0) {
            if ((grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x - 1][rot_y + 1] == '.' || grid[rot_x - 1][rot_y + 1] == 'S')) {
                grid[rot_x][rot_y - 1] = 'PL'
                grid[rot_x][rot_y + 1] = 'PL'
                grid[rot_x - 1][rot_y + 1] = 'PL'
                grid[rot_x - 1][rot_y] = '.'
                grid[rot_x - 1][rot_y - 1] = '.'
                grid[rot_x + 1][rot_y] = '.'
            }
        }
    }
    else if (L_info[0] == '#...' && L_info[1] == '#...' && L_info[2] == '##..') {
        if (rot_y > 0 && rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x + 1][rot_y - 1] == '.' || grid[rot_x + 1][rot_y - 1] == 'S')) {
                grid[rot_x][rot_y + 1] = 'PL'
                grid[rot_x][rot_y - 1] = 'PL'
                grid[rot_x + 1][rot_y - 1] = 'PL'
                grid[rot_x - 1][rot_y] = '.'
                grid[rot_x + 1][rot_y] = '.'
                grid[rot_x + 1][rot_y + 1] = '.'
            }
        }
    }
    else {
        if (rot_y < max_y - 1 && rot_x > 0) {
            if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y + 1] == '.' || grid[rot_x + 1][rot_y + 1] == 'S')) {
                grid[rot_x - 1][rot_y] = 'PL'
                grid[rot_x + 1][rot_y] = 'PL'
                grid[rot_x + 1][rot_y + 1] = 'PL'
                grid[rot_x][rot_y - 1] = '.'
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x - 1][rot_y + 1] = '.'
            }
        }
    }
}

function l_rotate(grid, l_info, max_x, max_y) {
    let rot_x = l_info[4][0]
    let rot_y = l_info[4][1]
    if (l_info[0] == '###.' && l_info[1] == '..#.') {
        if (rot_x > 0) {
            if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y - 1] == '.' || grid[rot_x + 1][rot_y - 1] == 'S')) {
                grid[rot_x - 1][rot_y] = 'Pl'
                grid[rot_x + 1][rot_y] = 'Pl'
                grid[rot_x + 1][rot_y - 1] = 'Pl'
                grid[rot_x][rot_y - 1] = '.'
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x + 1][rot_y + 1] = '.'
            }
        }
    }
    else if (l_info[0] == '##..' && l_info[1] == '#...' && l_info[2] == '#...') {
        if (rot_y > 0) {
            if ((grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x + 1][rot_y + 1] == '.' || grid[rot_x + 1][rot_y + 1] == 'S')) {
                grid[rot_x][rot_y - 1] = 'Pl'
                grid[rot_x][rot_y + 1] = 'Pl'
                grid[rot_x + 1][rot_y + 1] = 'Pl'
                grid[rot_x - 1][rot_y] = '.'
                grid[rot_x - 1][rot_y + 1] = '.'
                grid[rot_x + 1][rot_y] = '.'
            }
        }
    }
    else if (l_info[0] == '.#..' && l_info[1] == '.#..' && l_info[2] == '##..') {
        if (rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')) {
                grid[rot_x][rot_y + 1] = 'Pl'
                grid[rot_x][rot_y - 1] = 'Pl'
                grid[rot_x - 1][rot_y - 1] = 'Pl'
                grid[rot_x - 1][rot_y] = '.'
                grid[rot_x + 1][rot_y] = '.'
                grid[rot_x + 1][rot_y - 1] = '.'
            }
        }
    }
    else {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y + 1] == "." || grid[rot_x - 1][rot_y + 1] == "S")) {
                grid[rot_x + 1][rot_y] = 'Pl'
                grid[rot_x - 1][rot_y] = 'Pl'
                grid[rot_x - 1][rot_y + 1] = 'Pl'
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x][rot_y - 1] = '.'
                grid[rot_x - 1][rot_y - 1] = '.'
            }
        }
    }
}

function getPos(grid, max_x, max_y) {
    let x = 0;
    let y = 0;
    while (x < max_x) {
        y = 0
        while (y < max_y) {
            if (grid[x][y].length != 1 && (grid[x][y][0] == 'P' || grid[x][y][0] == 'S'))
                return ([x, y])
            y += 1
        }
        x += 1
    }
    return undefined
}

function B_rotate(grid, max_x, max_y, socketID) {
    let rot_x = rotating_piece[socketID][4][0]
    let rot_y = rotating_piece[socketID][4][1]
    if (rotating_piece[socketID][1] == '####') {
        if (rot_x > 0 && rot_x < max_x - 3) {
            if ((grid[rot_x][rot_y + 2] == '.' || grid[rot_x][rot_y + 2] == 'S')
                && (grid[rot_x + 2][rot_y + 2] == '.' || grid[rot_x + 2][rot_y + 2] == 'S')
                && (grid[rot_x + 3][rot_y + 2] == '.' || grid[rot_x + 3][rot_y + 2] == 'S')) {
                grid[rot_x][rot_y + 2] = 'PB'
                grid[rot_x + 2][rot_y + 2] = 'PB'
                grid[rot_x + 3][rot_y + 2] = 'PB'
                grid[rot_x + 1][rot_y] = '.'
                grid[rot_x + 1][rot_y + 1] = '.'
                grid[rot_x + 1][rot_y + 3] = '.'
                rotating_piece[socketID][0] = "..#."
                rotating_piece[socketID][1] = "..#."
                rotating_piece[socketID][2] = "..#."
                rotating_piece[socketID][3] = "..#."
            }
        }
    }
    else if (rotating_piece[socketID][0] == '..#.') {
        if (rot_y > 0 && rot_y < max_y - 3) {
            if ((grid[rot_x + 2][rot_y + 3] == '.' || grid[rot_x + 2][rot_y + 3] == 'S')
                && (grid[rot_x + 2][rot_y + 1] == '.' || grid[rot_x + 2][rot_y + 1] == 'S')
                && (grid[rot_x + 2][rot_y] == '.' || grid[rot_x + 2][rot_y] == 'S')) {
                grid[rot_x][rot_y + 2] = '.'
                grid[rot_x + 1][rot_y + 2] = '.'
                grid[rot_x + 3][rot_y + 2] = '.'
                grid[rot_x + 2][rot_y + 3] = 'PB'
                grid[rot_x + 2][rot_y + 1] = 'PB'
                grid[rot_x + 2][rot_y] = 'PB'
                rotating_piece[socketID][0] = "...."
                rotating_piece[socketID][1] = "...."
                rotating_piece[socketID][2] = "####"
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else if (rotating_piece[socketID][2] == '####') {
        if (rot_x > 0 && rot_x < max_x - 3) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x + 1][rot_y + 1] == '.' || grid[rot_x + 1][rot_y + 1] == 'S')
                && (grid[rot_x + 3][rot_y + 1] == '.' || grid[rot_x + 3][rot_y + 1] == 'S')) {
                grid[rot_x][rot_y + 1] = 'PB'
                grid[rot_x + 1][rot_y + 1] = 'PB'
                grid[rot_x + 3][rot_y + 1] = 'PB'
                grid[rot_x + 2][rot_y] = '.'
                grid[rot_x + 2][rot_y + 2] = '.'
                grid[rot_x + 2][rot_y + 3] = '.'
                rotating_piece[socketID][0] = ".#.."
                rotating_piece[socketID][1] = ".#.."
                rotating_piece[socketID][2] = ".#.."
                rotating_piece[socketID][3] = ".#.."
            }
        }
    }
    else {
        if (rot_y > 0 && rot_y < max_y - 3) {
            if ((grid[rot_x + 1][rot_y + 3] == '.' || grid[rot_x + 1][rot_y + 3] == 'S')
                && (grid[rot_x + 1][rot_y + 2] == '.' || grid[rot_x + 1][rot_y + 2] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')) {
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x + 2][rot_y + 1] = '.'
                grid[rot_x + 3][rot_y + 1] = '.'
                grid[rot_x + 1][rot_y + 3] = 'PB'
                grid[rot_x + 1][rot_y + 2] = 'PB'
                grid[rot_x + 1][rot_y] = 'PB'
                rotating_piece[socketID][0] = "...."
                rotating_piece[socketID][1] = "####"
                rotating_piece[socketID][2] = "...."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    return grid
}

function getZShape(grid, x, y, max_x, max_y, socketID) {
    if (rotating_piece[socketID] == undefined) {
        if (y < max_y - 1 && grid[x][y + 1][0] == 'P')
            rotating_piece[socketID] = ['##..', '.##.', '....', '....', [x, y]];
        else
            rotating_piece[socketID] = ['.#..', '##..', '#...', '....', [x, y - 1]];
    }
    else {
        if (rotating_piece[socketID][0] == "##..")
            rotating_piece[socketID][4] = [x, y]
        else if (rotating_piece[socketID][0] == ".#..")
            rotating_piece[socketID][4] = [x, y - 1]
        else if (rotating_piece[socketID][0] == "....")
            rotating_piece[socketID][4] = [x - 1, y]
        else
            rotating_piece[socketID][4] = [x, y - 2]
    }
}

function Z_rotate(grid, max_x, max_y, socketID) {
    let rot_x = rotating_piece[socketID][4][0]
    let rot_y = rotating_piece[socketID][4][1]
    if (rotating_piece[socketID][0] == '##..') {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x][rot_y + 2] == '.' || grid[rot_x][rot_y + 2] == 'S')
                && (grid[rot_x + 2][rot_y + 1] == '.' || grid[rot_x + 2][rot_y + 1] == 'S')) {
                grid[rot_x + 2][rot_y + 1] = 'PZ'
                grid[rot_x][rot_y + 2] = 'PZ'
                grid[rot_x][rot_y] = '.'
                grid[rot_x][rot_y + 1] = '.'
                rotating_piece[socketID][0] = "..#."
                rotating_piece[socketID][1] = ".##."
                rotating_piece[socketID][2] = ".#.."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else if (rotating_piece[socketID][0] == "..#.") {
        if (rot_y > 0) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x + 2][rot_y + 2] == '.' || grid[rot_x + 2][rot_y + 2] == 'S')) {
                grid[rot_x + 1][rot_y] = 'PZ'
                grid[rot_x + 2][rot_y + 2] = 'PZ'
                grid[rot_x][rot_y + 2] = '.'
                grid[rot_x + 1][rot_y + 2] = '.'
                rotating_piece[socketID][0] = "...."
                rotating_piece[socketID][1] = "##.."
                rotating_piece[socketID][2] = ".##."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else if (rotating_piece[socketID][0] == "....") {
        if (rot_x > 0) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x + 2][rot_y] == '.' || grid[rot_x + 2][rot_y] == 'S')) {
                grid[rot_x + 2][rot_y] = 'PZ'
                grid[rot_x][rot_y + 1] = 'PZ'
                grid[rot_x + 2][rot_y + 1] = '.'
                grid[rot_x + 2][rot_y + 2] = '.'
                rotating_piece[socketID][0] = ".#.."
                rotating_piece[socketID][1] = "##.."
                rotating_piece[socketID][2] = "#..."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else {
        if (rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y] == '.' || grid[rot_x][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y + 2] == '.' || grid[rot_x + 1][rot_y + 2] == 'S')) {
                grid[rot_x][rot_y] = 'PZ'
                grid[rot_x + 1][rot_y + 2] = 'PZ'
                grid[rot_x + 1][rot_y] = '.'
                grid[rot_x + 2][rot_y] = '.'
                rotating_piece[socketID][0] = "##.."
                rotating_piece[socketID][1] = ".##."
                rotating_piece[socketID][2] = "...."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
}


function getzShape(grid, x, y, max_x, max_y, socketID) {
    if (rotating_piece[socketID] == undefined) {
        if (y < max_y - 1 && grid[x][y + 1][0] == 'P')
            rotating_piece[socketID] = ['.##.', '##..', '....', '....', [x, y - 1]]
        else
            rotating_piece[socketID] = ['#...', '##..', '.#..', '....', [x, y]]
    }
    else {
        if (rotating_piece[socketID][0] == ".##.")
            rotating_piece[socketID][4] = [x, y - 1]
        else if (rotating_piece[socketID][0] == ".#..")
            rotating_piece[socketID][4] = [x, y - 1]
        else if (rotating_piece[socketID][0] == "....")
            rotating_piece[socketID][4] = [x - 1, y - 1]
        else
            rotating_piece[socketID][4] = [x, y]
    }
}

function z_rotate(grid, max_x, max_y, socketID) {
    let rot_x = rotating_piece[socketID][4][0]
    let rot_y = rotating_piece[socketID][4][1]
    if (rotating_piece[socketID][0] == '.##.') {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x + 1][rot_y + 2] == '.' || grid[rot_x + 1][rot_y + 2] == 'S')
                && (grid[rot_x + 2][rot_y + 2] == '.' || grid[rot_x + 2][rot_y + 2] == 'S')) {
                grid[rot_x + 1][rot_y + 2] = 'Pz'
                grid[rot_x + 2][rot_y + 2] = 'Pz'
                grid[rot_x + 1][rot_y] = '.'
                grid[rot_x][rot_y + 2] = '.'
                rotating_piece[socketID][0] = ".#.."
                rotating_piece[socketID][1] = ".##."
                rotating_piece[socketID][2] = "..#."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else if (rotating_piece[socketID][0] == ".#..") {
        if (rot_y > 0) {
            if ((grid[rot_x + 2][rot_y] == '.' || grid[rot_x + 2][rot_y] == 'S')
                && (grid[rot_x + 2][rot_y + 1] == '.' || grid[rot_x + 2][rot_y + 1] == 'S')) {
                grid[rot_x + 2][rot_y] = 'Pz'
                grid[rot_x + 2][rot_y + 1] = 'Pz'
                grid[rot_x][rot_y + 1] = '.'
                grid[rot_x + 2][rot_y + 2] = '.'
                rotating_piece[socketID][0] = "...."
                rotating_piece[socketID][1] = ".##."
                rotating_piece[socketID][2] = "##.."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else if (rotating_piece[socketID][0] == '....') {
        if (rot_x > 0) {
            if ((grid[rot_x][rot_y] == '.' || grid[rot_x][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')) {
                grid[rot_x][rot_y] = 'Pz'
                grid[rot_x + 1][rot_y] = 'Pz'
                grid[rot_x + 2][rot_y] = '.'
                grid[rot_x + 1][rot_y + 2] = '.'
                rotating_piece[socketID][0] = "#..."
                rotating_piece[socketID][1] = "##.."
                rotating_piece[socketID][2] = ".#.."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
    else {
        if (rot_y < max_y - 1){
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y + 2] == '.' || grid[rot_x][rot_y + 2] == 'S')) {
                grid[rot_x][rot_y + 2] = 'Pz'
                grid[rot_x][rot_y + 1] = 'Pz'
                grid[rot_x][rot_y] = '.'
                grid[rot_x + 2][rot_y + 1] = '.'
                rotating_piece[socketID][0] = ".##."
                rotating_piece[socketID][1] = "##.."
                rotating_piece[socketID][2] = "...."
                rotating_piece[socketID][3] = "...."
            }
        }
    }
}

export function keyUp(room, socketID) {
    let grid = room.players[0].grid;
    for (let i in room.players) {
        if (room.players[i].socketID == socketID) {
            grid = room.players[i].grid;
            if (room.players[i].loose || room.players[i].spec)
                return room
            break
        }
    }
    let max_x = room.rules[1] ? 12 : 20
    let max_y = room.rules[1] ? 8 : 10
    let coor = getPos(grid, max_x, max_y);
    if (coor == undefined)
        return room
    let x = coor[0];
    let y = coor[1];
    switch (grid[x][y][1]) {
        case 'C': //carré
            break;
        case 'B': //Barre
            getBarShape(grid, x, y, max_x, max_y, socketID)
            grid = B_rotate(grid, max_x, max_y, socketID)
            break;
        case 'T'://Forme de T ->DONE
            let t_info = getTShape(grid, x, y, max_x, max_y);
            grid = T_Rotate(grid, t_info, max_x, max_y)
            break;
        case 'L': //L vers la droite -> DONE
            let L_info = getLShape(grid, x, y, max_x, max_y)
            grid = L_Rotate(grid, L_info, max_x, max_y)
            break;
        case 'l': //L vers la gauche -> DONE
            let l_info = getlShape(grid, x, y, max_x, max_y)
            l_rotate(grid, l_info, max_x, max_y)
            break;
        case 'Z': //Z vers la droite -> DONE
            getZShape(grid, x, y, max_x, max_y, socketID)
            Z_rotate(grid, max_x, max_y, socketID)
            break;
        case 'z': // Z vers la gauche -> DONE
            getzShape(grid, x, y, max_x, max_y, socketID)
            z_rotate(grid, max_x, max_y, socketID)
            break
        default:
            console.log("Error, piece not found")
    }
    room = creatSpeactre(room)
    return room
}
