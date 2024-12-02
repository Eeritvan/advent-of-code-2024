f = open('day2_input.txt', 'r')
data = f.read()
parsed = data.split('\n')

counter = 0
for i in parsed:
    testi = i.split()
    increasing = decreasing = True
    for j in range(1, len(testi)):
        diff = int(testi[j]) - int(testi[j - 1])
        if abs(diff) < 1 or abs(diff) > 3:
            increasing = decreasing = False
        if diff <= 0:
            increasing = False
        if diff >= 0:
            decreasing = False
    if increasing or decreasing:
        counter += 1
print(counter)
