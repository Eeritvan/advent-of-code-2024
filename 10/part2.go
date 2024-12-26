package main

import (
	"fmt"
	"os"
	"strings"
)

type Point struct {
	x, y int
}

func main() {
	rawData, _ := os.ReadFile("10/input.txt")
	lines := strings.Split(string(rawData), "\n")

	startingPoints := make([]Point, 0)
	grid := make(map[Point]int)

	for i, line := range lines {
		for j, num := range line {
			intLine := int(num - '0')
			grid[Point{i, j}] = intLine
			if intLine == 0 {
				startingPoints = append(startingPoints, Point{i, j})
			}
		}
	}

	result := 0
	for _, point := range startingPoints {
		stack := []Point{point}
		pathsFound := 0

		for len(stack) > 0 {
			pos := stack[len(stack)-1]
			currentValue := grid[pos]
			stack = stack[:len(stack)-1]

			if currentValue == 9 {
				pathsFound++
			}

			neighbors := []Point{
				{pos.x + 1, pos.y},
				{pos.x - 1, pos.y},
				{pos.x, pos.y + 1},
				{pos.x, pos.y - 1},
			}

			for _, neighbor := range neighbors {
				if val, exists := grid[neighbor]; exists && val == currentValue+1 {
					stack = append(stack, neighbor)
				}
			}
		}
		result += pathsFound
	}

	fmt.Println(result)
}
