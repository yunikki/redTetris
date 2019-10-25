export function okForFall(grid, room) {
    if (!grid)
        return (false)
    let x = room.rules[1] ? 11 : 19
    let ret = true
    let c = 0
    while (x >= 0) {
        let y = room.rules[1] ? 7 : 9
        while (y >= 0) {
            if (grid[x][y][0] == "P")
                c += 1
            if (grid[x][y][0] == "P" && (grid[x + 1] == undefined || (grid[x + 1][y] != "." && grid[x + 1][y] != "S" && grid[x + 1][y][0] != "P")))
                return false
            y -= 1
        }
        x -= 1
    }
    if (c != 4)
        return false
    return ret
}
