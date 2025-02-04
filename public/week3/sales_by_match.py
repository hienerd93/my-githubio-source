#!/bin/python3

import os

def sockMerchant(n, ar):
    ar.sort()
    count = 0
    step = 0
    for index in range(n - 1):
        if step > index:
            continue
        if ar[index] == ar[index + 1]:
            step += 2
            count += 1
        else:
            step += 1
    return count

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    ar = list(map(int, input().rstrip().split()))

    result = sockMerchant(n, ar)

    fptr.write(str(result) + '\n')

    fptr.close()
