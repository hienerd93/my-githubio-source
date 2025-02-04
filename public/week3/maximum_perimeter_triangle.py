#!/bin/python3

import os

def maximumPerimeterTriangle(sticks):
    def is_triangle(a):
        return a[0] + a[1] > a[2] and a[2] + a[0] > a[1] and a[1] + a[2] > a[0]
    side_triangle = [-1]
    sticks.sort()
    for index in reversed(range(2, len(sticks))):
        if is_triangle(sticks[index-2:index+1]):
            side_triangle = sticks[index-2:index+1]
            break
    return side_triangle

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    sticks = list(map(int, input().rstrip().split()))

    result = maximumPerimeterTriangle(sticks)

    fptr.write(' '.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
