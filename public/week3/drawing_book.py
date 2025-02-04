#!/bin/python3

import os

def pageCount(n, p):
    ftb = p / 2 if p % 2 == 0 else (p - 1) / 2
    btf = (n - p) / 2 if p % 2 == 0 else (n - p + 1) /2
    return int(min(ftb, btf))

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    p = int(input().strip())

    result = pageCount(n, p)

    fptr.write(str(result) + '\n')

    fptr.close()
