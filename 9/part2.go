package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	rawData, _ := os.ReadFile("9/input.txt")
	data := string(rawData)

	reconstructedData := make([]string, 0)
	countMap := make(map[string]int)

	for i, char := range data {
		num := int(char - '0')
		id := "."
		if i%2 == 0 {
			id = fmt.Sprint(i / 2)
			countMap[id] = num
		}
		for j := 0; j < num; j++ {
			reconstructedData = append(reconstructedData, id)
		}
	}

	for i := len(data) / 2; i >= 0; i-- {
		currentID := fmt.Sprint(i)
		if _, exists := countMap[currentID]; !exists {
			continue
		}

		startPos := -1
		for i, value := range reconstructedData {
			if value == currentID {
				startPos = i
				break
			}
		}

		bestPos := -1
		for i := 0; i < startPos; i++ {
			if reconstructedData[i] != "." {
				continue
			}

			dotsInSequence := 0
			for j := i; j < len(reconstructedData) && reconstructedData[j] == "."; j++ {
				dotsInSequence++
			}

			if dotsInSequence >= countMap[currentID] {
				bestPos = i
				break
			}
		}

		if bestPos != -1 {
			for i := 0; i < countMap[currentID]; i++ {
				reconstructedData[startPos+i] = "."
			}
			for i := 0; i < countMap[currentID]; i++ {
				reconstructedData[bestPos+i] = currentID
			}
		}
	}

	result := 0
	for index, value := range reconstructedData {
		if value != "." {
			intValue, _ := strconv.Atoi(value)
			result += index * intValue
		}
	}

	fmt.Println(result)
}
