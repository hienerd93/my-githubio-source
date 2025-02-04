#!/bin/python3

import os

def kangaroo(x1, v1, x2, v2):
    if x1 == x2 and v1 == v2:
        return 'YES'
    elif x2 == x1 and v1 != v1 or v1 == v2 and x1 != x2:
        return 'NO'
    else:
        return 'YES' if (x2 - x1) / (v1 - v2) > 0 and abs(x2 - x1) % abs(v2 - v1) == 0 else 'NO'

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    first_multiple_input = input().rstrip().split()

    x1 = int(first_multiple_input[0])

    v1 = int(first_multiple_input[1])

    x2 = int(first_multiple_input[2])

    v2 = int(first_multiple_input[3])

    result = kangaroo(x1, v1, x2, v2)

    fptr.write(result + '\n')

    fptr.close()
