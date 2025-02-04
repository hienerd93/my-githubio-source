#!/bin/python3

import os

def diagonalDifference(arr):
    len_arr = len(arr)
    sum_LtR = 0
    sum_RtL = 0
    for i in range(len_arr):
        sum_LtR += arr[i][i]
        sum_RtL += arr[len_arr - i - 1][i]
    return abs(sum_LtR - sum_RtL)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    arr = []

    for _ in range(n):
        arr.append(list(map(int, input().rstrip().split())))

    result = diagonalDifference(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
