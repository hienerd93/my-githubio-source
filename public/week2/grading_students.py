#!/bin/python3

import os

def gradingStudents(grades):
    res = []
    for grade in grades:
        grade_round = (grade + 2) // 5 * 5
        tmp = grade_round if grade <= grade_round and grade_round >= 40 else grade
        res.append(tmp)
    return res

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    grades_count = int(input().strip())

    grades = []

    for _ in range(grades_count):
        grades_item = int(input().strip())
        grades.append(grades_item)

    result = gradingStudents(grades)

    fptr.write('\n'.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
