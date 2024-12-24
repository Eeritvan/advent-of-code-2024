package main

import (
	"fmt"
	"os"
	"strings"
)

type Point struct {
	i, j int
}

func main() {
	data, _ := os.ReadFile("4/input.txt")
	stringData := string(data)
	lines := strings.Split(stringData, "\n")

	var grid = make(map[Point]string)
	for i, line := range lines {
		for j, char := range line {
			grid[Point{i, j}] = string(char)
		}
	}

	count := 0
	for i, line := range lines {
		if i == 0 || i == len(lines)-1 {
			continue
		}
		for j, char := range line {
			if j == 0 || j == len(line)-1 {
				continue
			}
			string1 := grid[Point{i - 1, j - 1}] + string(char) + grid[Point{i + 1, j + 1}]
			string2 := grid[Point{i + 1, j - 1}] + string(char) + grid[Point{i - 1, j + 1}]

			if string1 == "MAS" || string1 == "SAM" {
				if string2 == "MAS" || string2 == "SAM" {
					count++
				}
			}
		}
	}
	fmt.Println(count)
}
