#!/bin/python3

import os

def pickingNumbers(a):
    a.sort()
    set_a = list(set(a))
    count_a = [0] * len(set_a)
    for num in a:
        count_a[set_a.index(num)] += 1
    tmp = []
    for index in range(len(set_a) - 1):
        if set_a[index + 1] - set_a[index] == 1:
            count_a[index] += count_a[index + 1]
    return max(count_a)
            

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    a = list(map(int, input().rstrip().split()))

    result = pickingNumbers(a)

    fptr.write(str(result) + '\n')

    fptr.close()
