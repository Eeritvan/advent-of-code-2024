package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func isInvalidOrder(line []int, rules map[int][]int) bool {
	for i, currentNum := range line[:len(line)-1] {
		remainingNums := line[i+1:]
		for _, checking := range remainingNums {
			for _, num := range rules[checking] {
				if currentNum == num {
					return true
				}
			}
		}
	}
	return false
}

func main() {
	data, err := os.ReadFile("5/input.txt")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}

	stringData := string(data)
	parsedData := strings.Split(stringData, "\n")

	rules := make(map[int][]int)
	Lines := make([][]int, 0)

	for _, item := range parsedData {
		if strings.Contains(item, "|") {
			nums := strings.Split(item, "|")
			first, _ := strconv.Atoi(nums[0])
			second, _ := strconv.Atoi(nums[1])
			rules[first] = append(rules[first], second)
		} else if strings.Contains(item, ",") {
			nums := strings.Split(item, ",")
			convertedNumbers := make([]int, len(nums))
			for i, x := range nums {
				num, _ := strconv.Atoi(x)
				convertedNumbers[i] = num
			}
			Lines = append(Lines, convertedNumbers)
		}
	}

	sum := 0
	for _, line := range Lines {
		if isInvalidOrder(line, rules) {
			for isInvalidOrder(line, rules) {
				for i, num := range line[:len(line)-1] {
					remainingNums := line[i+1:]
					for j, checking := range remainingNums {
						for _, n := range rules[checking] {
							if num == n {
								line[i], line[i+j+1] = line[i+j+1], line[i]
							}
						}
					}
				}
			}
			midpoint := len(line) / 2
			sum += line[midpoint]
		}
	}

	fmt.Println(sum)
}
