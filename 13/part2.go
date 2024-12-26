package main

import (
	"fmt"
	"math"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func strListToInt(part string) []int {
	re := regexp.MustCompile(`\d+`)
	strNumbers := re.FindAllString(part, -1)
	intList := make([]int, len(strNumbers))
	for i, str := range strNumbers {
		num, _ := strconv.Atoi(str)
		intList[i] = num
	}
	return intList
}

func main() {
	rawData, _ := os.ReadFile("13/input.txt")
	games := strings.Split(string(rawData), "\n\n")

	result := 0
	for _, game := range games {
		parts := strings.Split(game, "\n")
		buttonA := strListToInt(parts[0])
		buttonB := strListToInt(parts[1])
		prize := strListToInt(parts[2])
		prize[0] += 10000000000000
		prize[1] += 10000000000000

		pressesA := float64(prize[1]*buttonB[0]-prize[0]*buttonB[1]) / float64(buttonA[1]*buttonB[0]-buttonA[0]*buttonB[1])
		pressesB := (float64(prize[1]) - pressesA*float64(buttonA[1])) / float64(buttonB[1])

		if pressesA == math.Floor(pressesA) && pressesB == math.Floor(pressesB) {
			result += int(3*pressesA + pressesB)
		}
	}
	fmt.Println(result)
}
