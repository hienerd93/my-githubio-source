#!/bin/python3

import os
import re

def minimumNumber(n, password):
    checkDigit = 0 if re.search(r'(?=.*\d)', password) else 1
    checkLowwer = 0 if re.search(r'(?=.*[a-z])', password) else 1
    checkUpper = 0 if re.search(r'(?=.*[A-Z])', password) else 1
    checkSymbol = 0 if re.search(r'(?=.*\W)', password) else 1
    
    total = checkDigit + checkLowwer + checkUpper + checkSymbol
    
    return total if len(password) + total >= 6 else 6 - len(password) 

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    n = int(input().strip())

    password = input()

    answer = minimumNumber(n, password)

    fptr.write(str(answer) + '\n')

    fptr.close()
