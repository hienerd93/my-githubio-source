#!/bin/python3

import os

def missingNumbers(arr, brr):
    # Write your code here
    count_dict_arr = {}
    count_dict_brr = {}
    for num in arr:
        if num in count_dict_arr:
            count_dict_arr[num] += 1
        else:
            count_dict_arr[num] = 1
    for num in brr:
        if num in count_dict_brr:
            count_dict_brr[num] += 1
        else:
            count_dict_brr[num] = 1
    result = []
    for num in list(set(brr)):
        if num not in count_dict_arr or count_dict_brr[num] != count_dict_arr[num]:
            result.append(num)
    return result
    
if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    arr = list(map(int, input().rstrip().split()))

    m = int(input().strip())

    brr = list(map(int, input().rstrip().split()))

    result = missingNumbers(arr, brr)

    fptr.write(' '.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
