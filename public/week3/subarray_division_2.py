#!/bin/python3

import os

def birthday(s, d, m):
    count = 0
    iterator = range(len(s) - m + 1) if len(s) > m else range(1)
    for index in iterator:
        print(index)
        sum_range = sum(s[index:index + m])
        if sum_range == d:
            count += 1
    return count

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    s = list(map(int, input().rstrip().split()))

    first_multiple_input = input().rstrip().split()

    d = int(first_multiple_input[0])

    m = int(first_multiple_input[1])

    result = birthday(s, d, m)

    fptr.write(str(result) + '\n')

    fptr.close()
