package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Point struct {
	x, y int
}

type QueueItem struct {
	pos   Point
	steps int
}

func bfs(grid map[Point]string) int {
	queue := []QueueItem{{Point{0, 0}, 0}}
	visited := make(map[Point]bool)
	visited[Point{0, 0}] = true

	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if current.pos.x == 70 && current.pos.y == 70 {
			return current.steps
		}

		neighbors := []Point{
			{current.pos.x + 1, current.pos.y},
			{current.pos.x - 1, current.pos.y},
			{current.pos.x, current.pos.y + 1},
			{current.pos.x, current.pos.y - 1},
		}

		for _, next := range neighbors {
			if val, exists := grid[next]; exists && val == "." && !visited[next] {
				visited[next] = true
				queue = append(queue, QueueItem{next, current.steps + 1})
			}
		}
	}
	return -1
}

func main() {
	rawData, _ := os.ReadFile("18/input.txt")
	stringData := string(rawData)
	lines := strings.Split(stringData, "\n")

	grid := make(map[Point]string)
	for i := range 71 {
		for j := range 71 {
			grid[Point{i, j}] = "."
		}
	}

	for _, line := range lines {
		coords := strings.Split(strings.TrimSpace(line), ",")
		x, _ := strconv.Atoi(coords[0])
		y, _ := strconv.Atoi(coords[1])
		grid[Point{x, y}] = "#"
		if bfs(grid) == -1 {
			fmt.Println(line)
			break
		}
	}
}
