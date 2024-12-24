package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type StackItem struct {
	value int
	index int
}

func concatenateNumbers(a, b int) int {
	// Mathematical way to concatenate numbers, which is faster than concatenating strings
	// https://stackoverflow.com/a/43826883
	digits := 1
	temp := b
	for temp >= 10 {
		digits++
		temp /= 10
	}
	multiplier := 1
	for i := 0; i < digits; i++ {
		multiplier *= 10
	}
	return a*multiplier + b
}

func main() {
	data, _ := os.ReadFile("7/input.txt")
	stringData := string(data)
	lines := strings.Split(stringData, "\n")

	result := 0
	for _, line := range lines {
		splitLine := strings.Split(line, ":")
		target, _ := strconv.Atoi(strings.TrimSpace(splitLine[0]))
		numberStrs := strings.Fields(strings.TrimSpace(splitLine[1]))
		numbers := make([]int, len(numberStrs))
		for i, v := range numberStrs {
			value, _ := strconv.Atoi(v)
			numbers[i] = value
		}

		stack := []StackItem{{value: numbers[0], index: 0}}
		for len(stack) > 0 {
			item := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if item.value == target && item.index == len(numbers)-1 {
				result += target
				break
			} else if item.index < len(numbers)-1 {
				next := numbers[item.index+1]
				stack = append(stack,
					StackItem{value: item.value + next, index: item.index + 1},
					StackItem{value: item.value * next, index: item.index + 1},
					StackItem{value: concatenateNumbers(item.value, next), index: item.index + 1},
				)
			}
		}
	}
	fmt.Println(result)
}
