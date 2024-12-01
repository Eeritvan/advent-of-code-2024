import re

f = open('day1_input.txt', 'r')
data = f.read()

parsed_data = re.split(r'\s+', data)

left_side = sorted(parsed_data[0::2])
right_side = sorted(parsed_data[1::2])

counter = 0
for i in range(len(left_side)):
    left_value = int(left_side[i])
    right_value = int(right_side[i])
    difference = abs(left_value - right_value)
    counter += difference

print(counter)
