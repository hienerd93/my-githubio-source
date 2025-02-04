#!/bin/python3

import os

def twoArrays(k, A, B):
    len_arr = len(A)
    avg = (sum(A) + sum(B)) / len_arr
    balance = max(A) + min(B) >= k and max(B) + min(A) >= k
    return 'YES' if avg >= k and balance else 'NO'

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    q = int(input().strip())

    for q_itr in range(q):
        first_multiple_input = input().rstrip().split()

        n = int(first_multiple_input[0])

        k = int(first_multiple_input[1])

        A = list(map(int, input().rstrip().split()))

        B = list(map(int, input().rstrip().split()))

        result = twoArrays(k, A, B)

        fptr.write(result + '\n')

    fptr.close()
