import re

f = open('day1_input.txt', 'r')
data = f.read()

parsed_data = re.split(r'\s+', data)

left_side = parsed_data[0::2]
right_side = parsed_data[1::2]

right_counts = {}
for i in right_side:
    right_counts[i] = right_counts.get(i, 0) + 1 

counter = 0
for i in left_side:
    if i in right_counts:
       counter += int(i) * right_counts[i]

print(counter)
