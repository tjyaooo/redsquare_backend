#!/bin/python3

# import math
# import os
# import random
# import re
# import sys


def f(n):
    outp = ''
    for i in range(1,n+1):
        if (i%3 == 0 and i%5 == 0):
            outp += 'fizzbuzz'
        elif (i%3 == 0 and i%5 != 0):
            outp += 'fizz'
        elif (i%3 != 0 and i%5 == 0):
            outp += 'buzz'
        else:
            outp += str(i)
        outp += '\n'
    print(outp)



f(15)
