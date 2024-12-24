package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func checkLine(line []string) bool {
	isIncreasing := true
	isDecreasing := true

	for i := 1; i < len(line); i++ {
		currentNum, _ := strconv.Atoi(line[i])
		previousNum, _ := strconv.Atoi(line[i-1])
		difference := float64(currentNum - previousNum)

		if math.Abs(difference) < 1 || math.Abs(difference) > 3 {
			isIncreasing = false
			isDecreasing = false
		}

		if difference <= 0 {
			isIncreasing = false
		}

		if difference >= 0 {
			isDecreasing = false
		}
	}
	return isDecreasing || isIncreasing
}

func main() {
	data, _ := os.ReadFile("2/input.txt")
	stringData := string(data)
	lines := strings.Split(stringData, "\n")

	counter := 0

	for _, line := range lines {
		parsedLine := strings.Split(line, " ")

		if checkLine(parsedLine) {
			counter++
		} else {
			for i := 0; i < len(parsedLine); i++ {
				filtered := make([]string, 0)
				filtered = append(filtered, parsedLine[:i]...)
				filtered = append(filtered, parsedLine[i+1:]...)

				if checkLine(filtered) {
					counter++
					break
				}
			}
		}
	}
	fmt.Println(counter)
}
