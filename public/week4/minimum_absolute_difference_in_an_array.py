#!/bin/python3

import os

def minimumAbsoluteDifference(arr):
    len_arr = len(arr)
    sort_arr = sorted(arr)
    min_abs = 9999999999
    for i in range(len_arr - 1):
        temp_abs = abs(sort_arr[i] - sort_arr[i + 1])
        if temp_abs < min_abs:
            min_abs = temp_abs

    return min_abs

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    arr = list(map(int, input().rstrip().split()))

    result = minimumAbsoluteDifference(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
