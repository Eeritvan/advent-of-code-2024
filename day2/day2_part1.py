f = open('day2_input.txt', 'r')
data = f.read()
parsed = data.split('\n')

def is_strictly_monotonic(lst: list) -> bool:
    increasing = decreasing = True
    for i in range(1, len(lst)):
        diff = int(lst[i]) - int(lst[i - 1])
        if abs(diff) < 1 or abs(diff) > 3:
            return False
        if diff <= 0:
            increasing = False
        if diff >= 0:
            decreasing = False
    return increasing or decreasing

counter = 0
for i in parsed:
    testi = i.split()
    print(testi, is_strictly_monotonic(testi))
    if is_strictly_monotonic(testi):
        counter += 1
print(counter)
