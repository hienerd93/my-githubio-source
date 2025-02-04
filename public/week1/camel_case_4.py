#!/bin/python3

import re
import sys

def camel_case_conversion(lines):
    res = []
    for line in lines:
        line = line.strip()
        if line[0] == 'C':
            words = line[4:].split(' ')
            firstWord = words[0].capitalize() if line[2] == 'C' else words[0].lower()
            temp = firstWord + ''.join(word.capitalize() for word in words[1:])
            if line[2] == 'M':
                temp = temp + "()"
            res.append(temp)
        else:
            words = re.findall(r'[A-Z][a-z]+|^[a-z]+', line[4:])
            temp = ' '.join(word.lower() for word in words)
            res.append(temp)
    return res

if __name__ == '__main__':
    lines = sys.stdin.read().strip().split('\n')
    result = camel_case_conversion(lines)

    print('\n'.join(result))
