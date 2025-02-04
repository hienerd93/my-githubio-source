#!/bin/python3

import os

def caesarCipher(s, k):
    original = 'abcdefghijklmnopqrstuvwxyz'
    k = k % 26
    cipher = original[k:] + original[0:k]
    res = ''
    for t in s:
        if t.isalpha():
            tmp = cipher[original.index(t.lower())]
            res += (tmp if t.islower() else tmp.upper())
        else:
            res += t
    return res

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    s = input()

    k = int(input().strip())

    result = caesarCipher(s, k)

    fptr.write(result + '\n')

    fptr.close()
