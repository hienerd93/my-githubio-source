#!/bin/python3

import os

def marsExploration(s):
    len_s = len(s)
    expected = (len_s // 3) * 'SOS'
    diff = 0
    for index in range(len_s):
        if s[index] != expected[index]:
            diff += 1
    return diff

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    result = marsExploration(s)

    fptr.write(str(result) + '\n')

    fptr.close()
