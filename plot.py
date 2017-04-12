#!/usr/bin/python3.5

lines = list(tuple(open('data.txt', 'r')))
lines = filter(lambda x: x!='\n', lines)
x = [int(_.rstrip('\n'))/1000000 for _ in list(lines)]

import matplotlib.pyplot as plt
plt.plot(x)
plt.ylabel('Time in microseconds')
plt.show()


