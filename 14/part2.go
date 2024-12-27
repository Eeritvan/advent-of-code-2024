package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Robot struct {
	x, y, vx, vy int
}

func main() {
	rawData, _ := os.ReadFile("14/input.txt")
	lines := strings.Split(string(rawData), "\n")

	robots := make([]Robot, 0)
	for _, line := range lines {
		parts := strings.Split(line, "v=")

		posPart := strings.ReplaceAll(parts[0], "p=", "")
		posValues := strings.Split(strings.TrimSpace(posPart), ",")
		px, _ := strconv.Atoi(posValues[0])
		py, _ := strconv.Atoi(posValues[1])

		velValues := strings.Split(strings.TrimSpace(parts[1]), ",")
		vx, _ := strconv.Atoi(velValues[0])
		vy, _ := strconv.Atoi(velValues[1])

		robots = append(robots, Robot{x: px, y: py, vx: vx, vy: vy})
	}

	for seconds := 1; true; seconds++ {
		grid := make([][]string, 103)
		for i := range grid {
			grid[i] = make([]string, 101)
			for j := range grid[i] {
				grid[i][j] = "."
			}
		}

		for i := range robots {
			robots[i].x = (robots[i].x + robots[i].vx + 101) % 101
			robots[i].y = (robots[i].y + robots[i].vy + 103) % 103
			x := robots[i].x
			y := robots[i].y
			grid[y][x] = "#"
		}

		// brute-forcing the rendering of all images since i figured out the pattern
		// Probably not the optimal solution but i had no clue how to solve it more efficiently
		if seconds%101 == 46 || seconds%103 == 1 {
			time.Sleep(100 * time.Millisecond)
			for _, row := range grid {
				fmt.Println(strings.Join(row, ""))
			}
			fmt.Println(seconds)

			// easter egg for my input
			if seconds == 7520 {
				break
			}
		}
	}
}
