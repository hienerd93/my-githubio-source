#!/bin/python3

import os

def separateNumbers(s):
    res = 'NO'
    for index in range(1, len(s) // 2 + 1):
        first = int(s[0:index])
        count = first
        tmp = s[0:index]
        while len(tmp) < len(s) and tmp in s:
            count += 1
            tmp += str(count)
        if tmp == s:
            res = 'YES ' + str(first)
            break;
    print(res)

if __name__ == '__main__':
    q = int(input().strip())

    for q_itr in range(q):
        s = input()

        separateNumbers(s)
