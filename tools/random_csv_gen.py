import random

for i in range(100):
    nums = []
    for j in range(100):
        nums.append(random.randint(1, 100))
    print ','.join(map(lambda x: str(x), nums))