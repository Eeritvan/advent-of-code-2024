package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	data, _ := os.ReadFile("3/input.txt")
	stringData := string(data)
	lines := strings.Split(stringData, "\n")

	doCount := true
	result := 0
	for _, line := range lines {
		re := regexp.MustCompile(`mul\((\d+),(\d+)\)|do\(\)|don't\(\)`)
		parsedLine := re.FindAllStringSubmatch(line, -1)
		for _, action := range parsedLine {
			if action[0] == "don't()" {
				doCount = false
				continue
			}
			if action[0] == "do()" {
				doCount = true
				continue
			}
			if doCount {
				first, _ := strconv.Atoi(action[1])
				second, _ := strconv.Atoi(action[2])
				result += first * second
			}
		}
	}
	fmt.Println(result)
}
