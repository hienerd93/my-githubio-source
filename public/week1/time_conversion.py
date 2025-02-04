#!/bin/python3

import os

def timeConversion(s):
    isAm = s[8:10] == 'AM'
    hour = s[0:2]
    if hour == '12' and isAm:
        hour = '00'
    if hour != '12':
        hour = hour if isAm else int(hour) + 12
    return str(hour) + s[2:8]

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    s = input()

    result = timeConversion(s)

    fptr.write(result + '\n')

    fptr.close()
