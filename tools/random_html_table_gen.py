import random

for i in range(20):
    nums = []
    print '<tr>'
    for j in range(20):
        nums.append(random.randint(1, 100))
    nums = map(lambda x: '<td>' + str(x) + '</td>', nums);
    print ''.join(map(lambda x: str(x), nums))
    print '</tr>'