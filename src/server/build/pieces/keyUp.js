"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var creatSpectre_1 = require("./creatSpectre");
function getBarShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if ((x > 0 && grid[x - 1][y][0] == 'P') || x < max_x && grid[x + 1][y][0] == 'P')
        local_pos = ['#...', '#...', '#...', '#...', [x + 2, y]];
    else
        local_pos = ['####', '....', '....', '....', [x, y + 1]];
    return local_pos;
}
function getTShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        local_pos = ['###.', '.#..', '....', '....', [x, y + 1]];
    }
    else {
        if (x < max_x - 1 && y < max_y - 1 && grid[x + 1][y + 1][0] == 'P') {
            if (y > 0 && x < max_x - 1 && grid[x + 1][y - 1][0] == 'P')
                local_pos = ['.#..', '###.', '....', '....', [x + 1, y]];
            else
                local_pos = ['#...', '##..', '#...', '....', [x + 1, y]];
        }
        else
            local_pos = ['.#..', '##..', '.#..', '....', [x + 1, y]];
    }
    return local_pos;
}
function getLShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        if (y < max_y - 2 && grid[x][y + 2][0] == 'P')
            local_pos = ['###.', '#...', '....', '....', [x, y + 1]];
        else
            local_pos = ['##..', '.#..', '.#..', '....', [x + 1, y + 1]];
    }
    else {
        if (x < max_x - 2 && grid[x + 2][y][0] == 'P')
            local_pos = ['#...', '#...', '##..', '....', [x + 1, y]];
        else
            local_pos = ['..#.', '###.', '....', '....', [x + 1, y - 1]];
    }
    return local_pos;
}
function getlShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P') {
        if (y < max_y - 2 && grid[x][y + 2][0] == 'P')
            local_pos = ['###.', '..#.', '....', '....', [x, y + 1]];
        else
            local_pos = ['##..', '#...', '#...', '...', [x + 1, y]];
    }
    else {
        if (x < max_x - 2 && grid[x + 2][y][0] == 'P')
            local_pos = ['.#..', '.#..', '##..', '....', [x + 1, y]];
        else
            local_pos = ['#...', '###.', '....', '....', [x + 1, y + 1]];
    }
    return local_pos;
}
function getZShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P')
        local_pos = ['##..', '.##.', '....', '....', [x + 1, y + 1]];
    else
        local_pos = ['.#..', '##..', '#...', '....', [x + 1, y - 1]];
    return local_pos;
}
function getzShape(grid, x, y, max_x, max_y) {
    var local_pos;
    if (y < max_y - 1 && grid[x][y + 1][0] == 'P')
        local_pos = ['.##.', '##..', '....', '....', [x + 1, y]];
    else
        local_pos = ['#...', '##..', '.#..', '....', [x + 1, y + 1]];
    return local_pos;
}
function T_Rotate(grid, t_info, max_x, max_y) {
    var rot_x = t_info[4][0];
    var rot_y = t_info[4][1];
    if (t_info[0] == '###.' && t_info[1] == '.#..') {
        if (rot_x > 0) {
            if (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S') {
                grid[rot_x - 1][rot_y] = 'PT';
                grid[rot_x][rot_y + 1] = '.';
            }
        }
    }
    else if (t_info[0] == '.#..' && t_info[1] == '###.') {
        if (rot_x < max_x - 1) {
            if (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S') {
                grid[rot_x + 1][rot_y] = 'PT';
                grid[rot_x][rot_y - 1] = '.';
            }
        }
    }
    else if (t_info[0] == '#...' && t_info[1] == '##..' && t_info[2] == '#...') {
        if (rot_y > 0) {
            if (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S') {
                grid[rot_x][rot_y - 1] = 'PT';
                grid[rot_x - 1][rot_y] = '.';
            }
        }
    }
    else {
        if (rot_y < max_y - 1) {
            if (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S') {
                grid[rot_x][rot_y + 1] = 'PT';
                grid[rot_x + 1][rot_y] = '.';
            }
        }
    }
    return grid;
}
function L_Rotate(grid, L_info, max_x, max_y) {
    var rot_x = L_info[4][0];
    var rot_y = L_info[4][1];
    if (L_info[0] == '###.' && L_info[1] == '#...') {
        if (rot_x < max_x - 1 && rot_x > 0) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')) {
                grid[rot_x + 1][rot_y] = 'PL';
                grid[rot_x - 1][rot_y] = 'PL';
                grid[rot_x - 1][rot_y - 1] = 'PL';
                grid[rot_x][rot_y - 1] = '.';
                grid[rot_x][rot_y + 1] = '.';
                grid[rot_x + 1][rot_y - 1] = '.';
            }
        }
    }
    else if (L_info[0] == '##..' && L_info[1] == '.#..' && L_info[2] == '.#..') {
        if (rot_y < max_y - 1 && rot_x > 0) {
            if ((grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x - 1][rot_y + 1] == '.' || grid[rot_x - 1][rot_y + 1] == 'S')) {
                grid[rot_x][rot_y - 1] = 'PL';
                grid[rot_x][rot_y + 1] = 'PL';
                grid[rot_x - 1][rot_y + 1] = 'PL';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x - 1][rot_y - 1] = '.';
                grid[rot_x + 1][rot_y] = '.';
            }
        }
    }
    else if (L_info[0] == '#...' && L_info[1] == '#...' && L_info[2] == '##..') {
        if (rot_y > 0 && rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x + 1][rot_y - 1] == '.' || grid[rot_x + 1][rot_y - 1] == 'S')) {
                grid[rot_x][rot_y + 1] = 'PL';
                grid[rot_x][rot_y - 1] = 'PL';
                grid[rot_x + 1][rot_y - 1] = 'PL';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x + 1][rot_y] = '.';
                grid[rot_x + 1][rot_y + 1] = '.';
            }
        }
    }
    else {
        if (rot_y < max_y - 1 && rot_x > 0) {
            if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y + 1] == '.' || grid[rot_x + 1][rot_y + 1] == 'S')) {
                grid[rot_x - 1][rot_y] = 'PL';
                grid[rot_x + 1][rot_y] = 'PL';
                grid[rot_x + 1][rot_y + 1] = 'PL';
                grid[rot_x][rot_y - 1] = '.';
                grid[rot_x][rot_y + 1] = '.';
                grid[rot_x - 1][rot_y + 1] = '.';
            }
        }
    }
}
function l_rotate(grid, l_info, max_x, max_y) {
    var rot_x = l_info[4][0];
    var rot_y = l_info[4][1];
    if (l_info[0] == '###.' && l_info[1] == '..#.') {
        if (rot_x > 0) {
            if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x + 1][rot_y - 1] == '.' || grid[rot_x + 1][rot_y - 1] == 'S')) {
                grid[rot_x - 1][rot_y] = 'Pl';
                grid[rot_x + 1][rot_y] = 'Pl';
                grid[rot_x + 1][rot_y - 1] = 'Pl';
                grid[rot_x][rot_y - 1] = '.';
                grid[rot_x][rot_y + 1] = '.';
                grid[rot_x + 1][rot_y + 1] = '.';
            }
        }
    }
    else if (l_info[0] == '##..' && l_info[1] == '#...' && l_info[2] == '#...') {
        if (rot_y > 0) {
            if ((grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x + 1][rot_y + 1] == '.' || grid[rot_x + 1][rot_y + 1] == 'S')) {
                grid[rot_x][rot_y - 1] = 'Pl';
                grid[rot_x][rot_y + 1] = 'Pl';
                grid[rot_x + 1][rot_y + 1] = 'Pl';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x - 1][rot_y + 1] = '.';
                grid[rot_x + 1][rot_y] = '.';
            }
        }
    }
    else if (l_info[0] == '.#..' && l_info[1] == '.#..' && l_info[2] == '##..') {
        if (rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')) {
                grid[rot_x][rot_y + 1] = 'Pl';
                grid[rot_x][rot_y - 1] = 'Pl';
                grid[rot_x - 1][rot_y - 1] = 'Pl';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x + 1][rot_y] = '.';
                grid[rot_x + 1][rot_y - 1] = '.';
            }
        }
    }
    else {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y + 1] == "." || grid[rot_x - 1][rot_y + 1] == "S")) {
                grid[rot_x + 1][rot_y] = 'Pl';
                grid[rot_x - 1][rot_y] = 'Pl';
                grid[rot_x - 1][rot_y + 1] = 'Pl';
                grid[rot_x][rot_y + 1] = '.';
                grid[rot_x][rot_y - 1] = '.';
                grid[rot_x - 1][rot_y - 1] = '.';
            }
        }
    }
}
function Z_rotate(grid, Z_info, max_x, max_y) {
    var rot_x = Z_info[4][0];
    var rot_y = Z_info[4][1];
    if (Z_info[0] == '##..' && Z_info[1] == ".##.") {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y + 1] == '.' || grid[rot_x - 1][rot_y + 1] == 'S')) {
                grid[rot_x + 1][rot_y] = 'PZ';
                grid[rot_x - 1][rot_y + 1] = 'PZ';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x - 1][rot_y - 1] = '.';
            }
        }
    }
    else {
        if (rot_y > 0) {
            if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
                && (grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')) {
                grid[rot_x - 1][rot_y] = 'PZ';
                grid[rot_x - 1][rot_y - 1] = 'PZ';
                grid[rot_x + 1][rot_y] = '.';
                grid[rot_x - 1][rot_y + 1] = '.';
            }
        }
    }
}
function z_rotate(grid, z_info, max_x, max_y) {
    var rot_x = z_info[4][0];
    var rot_y = z_info[4][1];
    if (z_info[0] == '.##.' && z_info[1] == '##..') {
        if (rot_x < max_x - 1) {
            if ((grid[rot_x - 1][rot_y - 1] == '.' || grid[rot_x - 1][rot_y - 1] == 'S')
                && (grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == 'S')) {
                grid[rot_x - 1][rot_y - 1] = 'Pz';
                grid[rot_x + 1][rot_y] = 'Pz';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x - 1][rot_y + 1] = '.';
            }
        }
    }
    else {
        if ((grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == 'S')
            && (grid[rot_x - 1][rot_y + 1] == '.' || grid[rot_x - 1][rot_y + 1] == 'S')) {
            grid[rot_x - 1][rot_y] = 'Pz';
            grid[rot_x - 1][rot_y + 1] = 'Pz';
            grid[rot_x - 1][rot_y - 1] = '.';
            grid[rot_x + 1][rot_y] = '.';
        }
    }
}
function B_rotate(grid, B_info, max_x, max_y) {
    var rot_x = B_info[4][0];
    var rot_y = B_info[4][1];
    if (B_info[0] == '####') {
        if (rot_x > 1 && rot_x < max_x - 1) {
            if ((grid[rot_x + 1][rot_y] == '.' || grid[rot_x + 1][rot_y] == '.')
                && (grid[rot_x - 1][rot_y] == '.' || grid[rot_x - 1][rot_y] == '.')
                && (grid[rot_x - 2][rot_y] == '.' || grid[rot_x - 2][rot_y] == '.')) {
                grid[rot_x + 1][rot_y] = 'PB';
                grid[rot_x - 1][rot_y] = 'PB';
                grid[rot_x - 2][rot_y] = 'PB';
                grid[rot_x][rot_y - 1] = '.';
                grid[rot_x][rot_y + 1] = '.';
                grid[rot_x][rot_y + 2] = '.';
            }
        }
    }
    else {
        if (rot_y > 0 && rot_y < max_y - 1) {
            if ((grid[rot_x][rot_y - 1] == '.' || grid[rot_x][rot_y - 1] == 'S')
                && (grid[rot_x][rot_y + 1] == '.' || grid[rot_x][rot_y + 1] == 'S')
                && (grid[rot_x][rot_y + 2] == '.' || grid[rot_x][rot_y + 2] == '.')) {
                grid[rot_x + 1][rot_y] = '.';
                grid[rot_x - 1][rot_y] = '.';
                grid[rot_x - 2][rot_y] = '.';
                grid[rot_x][rot_y - 1] = 'PB';
                grid[rot_x][rot_y + 1] = 'PB';
                grid[rot_x][rot_y + 2] = 'PB';
            }
        }
    }
}
function getPos(grid, max_x, max_y) {
    var x = 0;
    var y = 0;
    while (x < max_x) {
        y = 0;
        while (y < max_y) {
            if (grid[x][y].length != 1 && (grid[x][y][0] == 'P' || grid[x][y][0] == 'S'))
                return ([x, y]);
            y += 1;
        }
        x += 1;
    }
}
function keyUp(room, socketID) {
    var grid = room.players[0].grid;
    for (var i in room.players) {
        if (room.players[i].socketID == socketID) {
            grid = room.players[i].grid;
            if (room.players[i].loose)
                return room;
            break;
        }
    }
    var max_x = room.rules[1] ? 12 : 20;
    var max_y = room.rules[1] ? 8 : 10;
    var coor = getPos(grid, max_x, max_y);
    var x = coor[0];
    var y = coor[1];
    switch (grid[x][y][1]) {
        case 'C': //carré
            break;
        case 'B': //Barre
            var B_info = getBarShape(grid, x, y, max_x, max_y);
            B_rotate(grid, B_info, max_x, max_y);
            break;
        case 'T': //Forme de T ->DONE
            var t_info = getTShape(grid, x, y, max_x, max_y);
            grid = T_Rotate(grid, t_info, max_x, max_y);
            break;
        case 'L': //L vers la droite -> DONE
            var L_info = getLShape(grid, x, y, max_x, max_y);
            grid = L_Rotate(grid, L_info, max_x, max_y);
            break;
        case 'l': //L vers la gauche -> DONE
            var l_info = getlShape(grid, x, y, max_x, max_y);
            l_rotate(grid, l_info, max_x, max_y);
            break;
        case 'Z': //Z vers la droite -> DONE
            var Z_info = getZShape(grid, x, y, max_x, max_y);
            Z_rotate(grid, Z_info, max_x, max_y);
            break;
        case 'z': // Z vers la gauche -> DONE
            var z_info = getzShape(grid, x, y, max_x, max_y);
            z_rotate(grid, z_info, max_x, max_y);
            break;
        default:
            console.log("Error, piece not found");
    }
    room = creatSpectre_1.creatSpeactre(room);
    return room;
}
exports.keyUp = keyUp;
