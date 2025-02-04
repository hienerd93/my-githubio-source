#!/bin/python3

import os

def maxMin(k, arr):
    sorted_arr = sorted(arr)
    res = []
    len_arr = len(arr)
    for index in range(len_arr - k + 1):
        res.append(sorted_arr[index + k - 1] - sorted_arr[index])
    return min(res)

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    k = int(input().strip())

    arr = []

    for _ in range(n):
        arr_item = int(input().strip())
        arr.append(arr_item)

    result = maxMin(k, arr)

    fptr.write(str(result) + '\n')

    fptr.close()
