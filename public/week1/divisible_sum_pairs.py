#!/bin/python3

import os

def divisibleSumPairs(n, k, ar):
    res = []
    for x in range(n - 1):
        for y in range(x + 1, n):
            res.append(ar[x]+ar[y])
    count = 0
    for num in res:
        if num % k == 0:
            count += 1
    return count

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    first_multiple_input = input().rstrip().split()

    n = int(first_multiple_input[0])

    k = int(first_multiple_input[1])

    ar = list(map(int, input().rstrip().split()))

    result = divisibleSumPairs(n, k, ar)

    fptr.write(str(result) + '\n')

    fptr.close()
