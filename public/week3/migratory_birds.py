#!/bin/python3

import os

def migratoryBirds(arr):
    unique_arr = list(set(arr))
    unique_amounts = [0] * len(unique_arr)
    for i in arr:
        index = unique_arr.index(i)
        unique_amounts[index] += 1
    max_amount = max(unique_amounts)

    return unique_arr[unique_amounts.index(max_amount)]

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    arr_count = int(input().strip())

    arr = list(map(int, input().rstrip().split()))

    result = migratoryBirds(arr)

    fptr.write(str(result) + '\n')

    fptr.close()
