#!/bin/python3

import os

def countingValleys(steps, path):
    high = 0
    valey_count = 0
    in_valey = False
    for step in path:
        if step == 'D':
            high -= 1
        else:
            high += 1
        if high < 0 and not in_valey:
            valey_count += 1
            in_valey = True
        if high == 0 and in_valey:
            in_valey = False
    return valey_count

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    steps = int(input().strip())

    path = input()

    result = countingValleys(steps, path)

    fptr.write(str(result) + '\n')

    fptr.close()
