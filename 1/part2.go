package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
)

func main() {
	data, err := os.ReadFile("1/input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}

	stringData := string(data)

	re := regexp.MustCompile(`\s+`)
	parsedData := re.Split(stringData, -1)

	left_side := make([]string, 0, len(parsedData)/2)
	right_side := make([]string, 0, len(parsedData)/2)
	var right_counts = make(map[string]int)
	for index, num := range parsedData {
		if index%2 == 0 {
			left_side = append(left_side, parsedData[index])
		} else {
			right_side = append(right_side, parsedData[index])
			right_counts[num] += 1
		}
	}

	counter := 0
	for _, num := range left_side {
		if count, exists := right_counts[num]; exists {
			value, _ := strconv.Atoi(num)
			counter += int(value * count)
		}
	}

	fmt.Println("part 2:", counter)
}
